import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-jsQSU7xc.js
async function getAdmin() {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	return supabaseAdmin;
}
var getRoomAISummary_createServerFn_handler = createServerRpc({
	id: "122d040bac1c74688a0d91756bd1d719a28a77614a2519f1893e61132d412e2f",
	name: "getRoomAISummary",
	filename: "src/lib/ai.functions.ts"
}, (opts) => getRoomAISummary.__executeServer(opts));
var getRoomAISummary = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	roomId: stringType().uuid(),
	userQuestion: stringType().optional()
}).parse(d)).handler(getRoomAISummary_createServerFn_handler, async ({ data }) => {
	const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
	if (!GEMINI_API_KEY) throw new Error("Gemini API key is not configured in the environment variables.");
	const supabase = await getAdmin();
	const { data: room, error: roomErr } = await supabase.from("rooms").select("*").eq("id", data.roomId).single();
	if (roomErr || !room) throw new Error("Room not found");
	const { data: places, error: placesErr } = await supabase.from("places").select("*").eq("room_id", data.roomId);
	if (placesErr || !places) throw new Error("Places not found");
	const { data: matches, error: matchesErr } = await supabase.from("matches").select("place_id").eq("room_id", data.roomId);
	const matchedPlaceIds = new Set(matches?.map((m) => m.place_id) ?? []);
	const matchedPlaces = places.filter((p) => matchedPlaceIds.has(p.id));
	const placesContext = places.map((p) => ({
		name: p.name,
		address: p.address,
		rating: p.rating,
		priceLevel: p.price_level,
		category: p.category,
		isMatch: matchedPlaceIds.has(p.id) ? "YES" : "NO"
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
	if (data.userQuestion) prompt += `\nUser's Question: "${data.userQuestion}"\n\nProvide a concise, helpful, and formatted response to this question based on the room's places. Support markdown.`;
	else prompt += `\n\nProvide a structured summary containing:
1. **The Vibe Check**: A short (1-2 sentence) summary of the overall vibe of this room's places.
2. **Current Matches**:
   - If there are matches, list them and suggest how to choose between them or combine them (e.g., "Eat dinner at X and then grab coffee at Y!").
   - If there are no matches yet, encourage swiping and suggest 2 promising candidates from the list based on their rating or price level to nudge the group.
3. **AI Pro-Tip**: A quick, fun tip or recommendation for this selection of places (e.g., a specific dish to try in Zamalek/Egypt or time of day to go).`;
	try {
		const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
		});
		if (!response.ok) {
			const errText = await response.text();
			console.error("Gemini API error status:", response.status, errText);
			throw new Error(`Gemini API request failed [${response.status}]: ${errText.slice(0, 150)}`);
		}
		return { response: (await response.json()).candidates?.[0]?.content?.parts?.[0]?.text ?? "Could not generate summary." };
	} catch (error) {
		console.error("Error in getRoomAISummary handler:", error);
		throw error;
	}
});
//#endregion
export { getRoomAISummary_createServerFn_handler };
