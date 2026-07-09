import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

async function getAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export const getRoomAISummary = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        roomId: z.string().uuid(),
        userQuestion: z.string().optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured in the environment variables.");
    }

    const supabase = await getAdmin();

    // 1. Fetch room details
    const { data: room, error: roomErr } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", data.roomId)
      .single();
    if (roomErr || !room) {
      throw new Error("Room not found");
    }

    // 2. Fetch all places in the room
    const { data: places, error: placesErr } = await supabase
      .from("places")
      .select("*")
      .eq("room_id", data.roomId);
    if (placesErr || !places) {
      throw new Error("Places not found");
    }

    // 3. Fetch matches in the room
    const { data: matches, error: matchesErr } = await supabase
      .from("matches")
      .select("place_id")
      .eq("room_id", data.roomId);

    const matchedPlaceIds = new Set(matches?.map((m) => m.place_id) ?? []);
    const matchedPlaces = places.filter((p) => matchedPlaceIds.has(p.id));

    // Construct the context for Gemini
    const placesContext = places.map((p) => ({
      name: p.name,
      address: p.address,
      rating: p.rating,
      priceLevel: p.price_level,
      category: p.category,
      isMatch: matchedPlaceIds.has(p.id) ? "YES" : "NO",
    }));

    let prompt = `You are "Decido AI", a friendly, fun Egyptian AI assistant for Decido, an app where friends swipe on places together to decide where to go.
Your task is to analyze the places in this room and help the friends decide. 
Use a friendly, helpful, slightly playful tone. You can throw in some light Egyptian warmth (like "Ya Shabab", "Ahlan", "Habibi", "ya gama3a").

Here is the context of the current room:
Room Name/Query: "${room.name}"
Places in the Room:
${JSON.stringify(placesContext, null, 2)}

Matches made so far (places everyone swiped right on):
${JSON.stringify(matchedPlaces.map((p) => p.name), null, 2)}
`;

    if (data.userQuestion) {
      prompt += `\nUser's Question: "${data.userQuestion}"\n\nProvide a concise, helpful, and formatted response to this question based on the room's places. Support markdown.`;
    } else {
      prompt += `\n\nProvide a structured summary containing:
1. **The Vibe Check**: A short (1-2 sentence) summary of the overall vibe of this room's places.
2. **Current Matches**:
   - If there are matches, list them and suggest how to choose between them or combine them (e.g., "Eat dinner at X and then grab coffee at Y!").
   - If there are no matches yet, encourage swiping and suggest 2 promising candidates from the list based on their rating or price level to nudge the group.
3. **AI Pro-Tip**: A quick, fun tip or recommendation for this selection of places (e.g., a specific dish to try in Zamalek/Egypt or time of day to go).`;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Gemini API error status:", response.status, errText);
        throw new Error(`Gemini API request failed [${response.status}]: ${errText.slice(0, 150)}`);
      }

      const resJson = await response.json();
      const replyText = resJson.candidates?.[0]?.content?.parts?.[0]?.text ?? "Could not generate summary.";
      return { response: replyText };
    } catch (error) {
      console.error("Error in getRoomAISummary handler:", error);
      throw error;
    }
  });
