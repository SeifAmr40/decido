import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { joinRoom, recordSwipe } from "@/lib/rooms.functions";
import { getGuestId } from "@/lib/guest";
import { CitrusMark } from "@/components/citrus-mark";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Heart, X, MapPin, Star, Users, PartyPopper, Share2, Sparkles, Send, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getRoomAISummary } from "@/lib/ai.functions";

export const Route = createFileRoute("/r/$roomId")({
  head: () => ({
    meta: [
      { title: "Room — Decido" },
      { name: "description", content: "Join the room and swipe on places together." },
    ],
  }),
  component: RoomPage,
});

type Place = {
  id: string;
  name: string;
  address: string | null;
  photo_url: string | null;
  rating: number | null;
  price_level: number | null;
  category: string | null;
  google_place_id: string;
  latitude: number | null;
  longitude: number | null;
};

function RoomPage() {
  const { roomId } = Route.useParams();
  const queryClient = useQueryClient();
  const joinFn = useServerFn(joinRoom);
  const swipeFn = useServerFn(recordSwipe);
  const callAI = useServerFn(getRoomAISummary);
  const [guestId, setGuestId] = useState<string>("");
  const [matchDialog, setMatchDialog] = useState<Place | null>(null);

  // AI assistant states
  const [aiResponse, setAiResponse] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiOpen, setAiOpen] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "ai"; text: string }>>([]);

  useEffect(() => {
    if (aiOpen && !aiResponse && !aiLoading) {
      handleGetAISummary();
    }
  }, [aiOpen]);

  async function handleGetAISummary() {
    setAiLoading(true);
    try {
      const res = await callAI({ data: { roomId } });
      setAiResponse(res.response);
      setChatHistory([{ sender: "ai", text: res.response }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load AI summary";
      toast.error(msg);
    } finally {
      setAiLoading(false);
    }
  }

  async function handleAskQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || aiLoading) return;
    const userQ = question.trim();
    setQuestion("");
    setChatHistory((prev) => [...prev, { sender: "user", text: userQ }]);
    setAiLoading(true);

    try {
      const res = await callAI({ data: { roomId, userQuestion: userQ } });
      setChatHistory((prev) => [...prev, { sender: "ai", text: res.response }]);
    } catch (err) {
      toast.error("AI question failed");
    } finally {
      setAiLoading(false);
    }
  }

  useEffect(() => {
    const id = getGuestId();
    setGuestId(id);
    joinFn({ data: { roomId, guestId: id } }).catch(() => {});
  }, [roomId, joinFn]);

  const roomQ = useQuery({
    queryKey: ["room", roomId],
    queryFn: async () => {
      const { data, error } = await supabase.from("rooms").select("*").eq("id", roomId).single();
      if (error) throw error;
      return data;
    },
  });

  const participantsQ = useQuery({
    queryKey: ["participants", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("participants")
        .select("user_id, joined_at")
        .eq("room_id", roomId);
      if (error) throw error;
      return data;
    },
  });

  const placesQ = useQuery({
    queryKey: ["places", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("places")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at");
      if (error) throw error;
      return data as Place[];
    },
  });

  const swipesQ = useQuery({
    queryKey: ["mySwipes", roomId, guestId],
    enabled: !!guestId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("swipes")
        .select("place_id")
        .eq("room_id", roomId)
        .eq("user_id", guestId);
      if (error) throw error;
      return new Set(data?.map((s) => s.place_id) ?? []);
    },
  });

  const matchesQ = useQuery({
    queryKey: ["matches", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("matches")
        .select("place_id, created_at, places(*)")
        .eq("room_id", roomId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel(`room:${roomId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "participants", filter: `room_id=eq.${roomId}` }, () => participantsQ.refetch())
      .on("postgres_changes", { event: "*", schema: "public", table: "places", filter: `room_id=eq.${roomId}` }, () => placesQ.refetch())
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "matches", filter: `room_id=eq.${roomId}` }, (payload) => {
        matchesQ.refetch();
        const placeId = (payload.new as { place_id?: string })?.place_id;
        const matched = placesQ.data?.find((p) => p.id === placeId);
        if (matched) {
          setMatchDialog(matched);
          confetti({ particleCount: 140, spread: 90, origin: { y: 0.3 } });
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const swiped = swipesQ.data ?? new Set<string>();
  const deck = useMemo(
    () => (placesQ.data ?? []).filter((p) => !swiped.has(p.id)),
    [placesQ.data, swiped],
  );

  async function handleSwipe(place: Place, direction: "left" | "right") {
    if (!guestId) return;
    // Optimistic update so cards fly away instantly
    queryClient.setQueryData<Set<string>>(
      ["mySwipes", roomId, guestId],
      (prev) => new Set([...(prev ?? []), place.id]),
    );
    try {
      await swipeFn({ data: { roomId, placeId: place.id, guestId, direction } });
    } catch {
      toast.error("Swipe failed");
      swipesQ.refetch();
    }
  }

  function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({ title: "Join my Decido room", url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied — send it to your people");
    }
  }

  function copyCode() {
    if (!roomQ.data?.code) return;
    navigator.clipboard.writeText(roomQ.data.code);
    toast.success("Code copied");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper pb-16">
      {/* Ambient blobs behind glass */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-sunset opacity-60 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-grove opacity-50 blur-3xl" />
      </div>

      <header className="glass sticky top-3 z-40 mx-auto mt-3 flex max-w-3xl items-center justify-between rounded-full px-4 py-2.5 md:mt-4">
        <Link to="/" className="focus:outline-none">
          <CitrusMark />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-muted transition hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4 text-primary animate-pulse" /> Ask AI
          </button>
          <button
            onClick={share}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-citrus transition hover:scale-[1.02]"
          >
            <Share2 className="h-4 w-4" /> Share link
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-6 md:pt-10">
        {roomQ.isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-3xl" />
            <Skeleton className="h-[420px] w-full rounded-3xl" />
          </div>
        ) : !roomQ.data ? (
          <p className="text-center text-muted-foreground">Room not found.</p>
        ) : (
          <div className="space-y-6">
            {/* Room header */}
            <div className="glass rounded-3xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-script text-xl text-accent">the room</p>
                  <h1 className="font-serif text-3xl">{roomQ.data.name || "Untitled"}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {participantsQ.data?.length ?? 0} in room
                    </span>
                    <button
                      onClick={copyCode}
                      className="inline-flex items-center gap-1.5 rounded-full bg-background/50 px-3 py-1 font-mono text-xs tracking-widest backdrop-blur hover:bg-accent hover:text-accent-foreground"
                    >
                      {roomQ.data.code} <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {(participantsQ.data?.length ?? 0) > 0 && (
                <div className="mt-4 flex -space-x-2">
                  {participantsQ.data!.map((p, i) => (
                    <div
                      key={p.user_id}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-sunset text-xs font-semibold text-citrus-cream"
                    >
                      {String.fromCharCode(65 + (i % 26))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Deck */}
            {(placesQ.data?.length ?? 0) === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <p className="font-script text-3xl text-accent">loading…</p>
                <h3 className="mt-1 font-serif text-2xl">Fetching places</h3>
              </div>
            ) : deck.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <p className="font-script text-3xl text-accent">all done</p>
                <h3 className="mt-1 font-serif text-2xl">You've swiped everything</h3>
                <p className="mt-2 text-muted-foreground">Waiting on the rest of the crew…</p>
              </div>
            ) : (
              <div className="relative mx-auto flex h-[520px] max-w-md items-center justify-center">
                <AnimatePresence>
                  {deck.slice(0, 3).reverse().map((place, i) => {
                    const stackDepth = deck.slice(0, 3).length - 1 - i;
                    const isTop = stackDepth === 0;
                    return (
                      <SwipeCard
                        key={place.id}
                        place={place}
                        isTop={isTop}
                        depth={stackDepth}
                        onSwipe={(dir) => handleSwipe(place, dir)}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Matches */}
            {matchesQ.data && matchesQ.data.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl">
                  <PartyPopper className="inline h-5 w-5 text-primary" /> Matches
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {matchesQ.data.map((m) => {
                    const place = m.places as Place | null;
                    return (
                      <div key={m.place_id} className="glass flex gap-3 rounded-2xl p-3">
                        {place?.photo_url ? (
                          <img src={place.photo_url} alt="" className="h-16 w-16 rounded-xl object-cover" />
                        ) : (
                          <div className="h-16 w-16 rounded-xl bg-sunset" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-serif text-lg">{place?.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{place?.address}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Dialog open={!!matchDialog} onOpenChange={(o) => !o && setMatchDialog(null)}>
        <DialogContent className="glass border-white/40">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl">It's a match! 🎉</DialogTitle>
          </DialogHeader>
          {matchDialog && (
            <div className="space-y-3">
              {matchDialog.photo_url && (
                <img src={matchDialog.photo_url} alt="" className="w-full rounded-2xl" />
              )}
              <p className="font-serif text-2xl">{matchDialog.name}</p>
              <p className="text-sm text-muted-foreground">{matchDialog.address}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Sheet open={aiOpen} onOpenChange={setAiOpen}>
        <SheetContent side="right" className="glass flex flex-col h-full w-[90%] sm:max-w-md border-l border-white/20 p-6">
          <SheetHeader className="pb-4 border-b border-white/10 shrink-0">
            <SheetTitle className="flex items-center gap-2 font-serif text-2xl text-primary">
              <Sparkles className="h-5 w-5 text-accent animate-pulse" /> Decido AI
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-xs">
              Your warm Egyptian guide to picking the perfect place.
            </SheetDescription>
          </SheetHeader>

          {/* Chat / summary display */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 min-h-0 select-text">
            {chatHistory.length === 0 && aiLoading && (
              <div className="flex flex-col items-center justify-center h-48 space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-script text-accent text-lg">Consulting Decido AI...</p>
              </div>
            )}

            {chatHistory.map((chat, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] rounded-2xl p-4 text-sm ${
                  chat.sender === "user"
                    ? "bg-primary text-primary-foreground ml-auto rounded-tr-none shadow-card"
                    : "glass text-foreground mr-auto rounded-tl-none border border-white/35 shadow-card"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {chat.text.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-2 last:mb-0">
                      {para.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {chatHistory.length > 0 && aiLoading && (
              <div className="flex items-center gap-2 glass max-w-[50%] mr-auto rounded-2xl rounded-tl-none p-4 border border-white/35">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-xs text-muted-foreground">Typing...</span>
              </div>
            )}
          </div>

          {/* Input box */}
          <form onSubmit={handleAskQuestion} className="pt-4 border-t border-white/10 shrink-0 flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about these places..."
              className="flex-1 glass bg-background/50 rounded-full px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary border border-white/20"
              disabled={aiLoading}
            />
            <button
              type="submit"
              disabled={aiLoading || !question.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-citrus transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SwipeCard({
  place,
  isTop,
  depth,
  onSwipe,
}: {
  place: Place;
  isTop: boolean;
  depth: number;
  onSwipe: (d: "left" | "right") => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 select-none"
      style={{ zIndex: 10 - depth }}
      initial={{ scale: 1 - depth * 0.05, y: depth * 8, opacity: 1 }}
      animate={{ scale: 1 - depth * 0.05, y: depth * 8, opacity: 1 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) onSwipe("right");
        else if (info.offset.x < -120) onSwipe("left");
      }}
      exit={{ x: 0, opacity: 0, transition: { duration: 0.2 } }}
      whileTap={{ cursor: "grabbing" }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-citrus">
        <div className="relative flex-1 bg-grove">
          {place.photo_url ? (
            <img
              src={place.photo_url}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-sunset">
              <p className="font-script text-6xl text-citrus-cream">
                {place.name.slice(0, 1)}
              </p>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-citrus-cream">
            <p className="font-script text-xl">place</p>
            <h3 className="font-serif text-3xl leading-tight text-balance">{place.name}</h3>
            <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-citrus-cream/90">
              {place.rating != null && (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-citrus-amber text-citrus-amber" />
                  {place.rating.toFixed(1)}
                </span>
              )}
              {place.price_level != null && <span>{"EGP".repeat(Math.max(1, place.price_level))}</span>}
              {place.address && (
                <span className="truncate">
                  <MapPin className="mr-1 inline h-3 w-3" />
                  {place.address}
                </span>
              )}
            </p>
          </div>
        </div>
        {isTop && (
          <div className="glass flex items-center justify-center gap-6 p-4">
            <button
              onClick={() => onSwipe("left")}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-background/60 shadow-card backdrop-blur transition hover:scale-110 hover:border-destructive hover:text-destructive"
              aria-label="Skip"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={() => onSwipe("right")}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-sunset text-citrus-cream shadow-citrus transition hover:scale-110"
              aria-label="Love"
            >
              <Heart className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
