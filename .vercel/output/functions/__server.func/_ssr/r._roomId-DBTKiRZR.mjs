import { a as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as joinRoom, i as getGuestId, o as recordSwipe, r as createSsrRpc, s as useServerFn, t as CitrusMark } from "./guest-CcfAo-Lu.mjs";
import { t as Route } from "./r._roomId-tSBkLge-.mjs";
import { t as supabase } from "./client-C6ZaJElq.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { a as Share2, c as PartyPopper, d as Heart, f as Copy, i as Sparkles, l as MapPin, n as Users, o as Send, r as Star, t as X, u as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/r._roomId-DBTKiRZR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Sheet = Dialog$1;
var SheetPortal = DialogPortal$1;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay$1.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent$1.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle$1.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription$1.displayName;
var getRoomAISummary = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	roomId: stringType().uuid(),
	userQuestion: stringType().optional()
}).parse(d)).handler(createSsrRpc("122d040bac1c74688a0d91756bd1d719a28a77614a2519f1893e61132d412e2f"));
function RoomPage() {
	const { roomId } = Route.useParams();
	const queryClient = useQueryClient();
	const joinFn = useServerFn(joinRoom);
	const swipeFn = useServerFn(recordSwipe);
	const callAI = useServerFn(getRoomAISummary);
	const [guestId, setGuestId] = (0, import_react.useState)("");
	const [matchDialog, setMatchDialog] = (0, import_react.useState)(null);
	const [aiResponse, setAiResponse] = (0, import_react.useState)("");
	const [aiLoading, setAiLoading] = (0, import_react.useState)(false);
	const [aiOpen, setAiOpen] = (0, import_react.useState)(false);
	const [question, setQuestion] = (0, import_react.useState)("");
	const [chatHistory, setChatHistory] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (aiOpen && !aiResponse && !aiLoading) handleGetAISummary();
	}, [aiOpen]);
	async function handleGetAISummary() {
		setAiLoading(true);
		try {
			const res = await callAI({ data: { roomId } });
			setAiResponse(res.response);
			setChatHistory([{
				sender: "ai",
				text: res.response
			}]);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to load AI summary";
			toast.error(msg);
		} finally {
			setAiLoading(false);
		}
	}
	async function handleAskQuestion(e) {
		e.preventDefault();
		if (!question.trim() || aiLoading) return;
		const userQ = question.trim();
		setQuestion("");
		setChatHistory((prev) => [...prev, {
			sender: "user",
			text: userQ
		}]);
		setAiLoading(true);
		try {
			const res = await callAI({ data: {
				roomId,
				userQuestion: userQ
			} });
			setChatHistory((prev) => [...prev, {
				sender: "ai",
				text: res.response
			}]);
		} catch (err) {
			toast.error("AI question failed");
		} finally {
			setAiLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		const id = getGuestId();
		setGuestId(id);
		joinFn({ data: {
			roomId,
			guestId: id
		} }).catch(() => {});
	}, [roomId, joinFn]);
	const roomQ = useQuery({
		queryKey: ["room", roomId],
		queryFn: async () => {
			const { data, error } = await supabase.from("rooms").select("*").eq("id", roomId).single();
			if (error) throw error;
			return data;
		}
	});
	const participantsQ = useQuery({
		queryKey: ["participants", roomId],
		queryFn: async () => {
			const { data, error } = await supabase.from("participants").select("user_id, joined_at").eq("room_id", roomId);
			if (error) throw error;
			return data;
		}
	});
	const placesQ = useQuery({
		queryKey: ["places", roomId],
		queryFn: async () => {
			const { data, error } = await supabase.from("places").select("*").eq("room_id", roomId).order("created_at");
			if (error) throw error;
			return data;
		}
	});
	const swipesQ = useQuery({
		queryKey: [
			"mySwipes",
			roomId,
			guestId
		],
		enabled: !!guestId,
		queryFn: async () => {
			const { data, error } = await supabase.from("swipes").select("place_id").eq("room_id", roomId).eq("user_id", guestId);
			if (error) throw error;
			return new Set(data?.map((s) => s.place_id) ?? []);
		}
	});
	const matchesQ = useQuery({
		queryKey: ["matches", roomId],
		queryFn: async () => {
			const { data, error } = await supabase.from("matches").select("place_id, created_at, places(*)").eq("room_id", roomId).order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel(`room:${roomId}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "participants",
			filter: `room_id=eq.${roomId}`
		}, () => participantsQ.refetch()).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "places",
			filter: `room_id=eq.${roomId}`
		}, () => placesQ.refetch()).on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "matches",
			filter: `room_id=eq.${roomId}`
		}, (payload) => {
			matchesQ.refetch();
			const placeId = payload.new?.place_id;
			const matched = placesQ.data?.find((p) => p.id === placeId);
			if (matched) {
				setMatchDialog(matched);
				confetti_module_default({
					particleCount: 140,
					spread: 90,
					origin: { y: .3 }
				});
			}
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [roomId]);
	const swiped = swipesQ.data ?? /* @__PURE__ */ new Set();
	const deck = (0, import_react.useMemo)(() => (placesQ.data ?? []).filter((p) => !swiped.has(p.id)), [placesQ.data, swiped]);
	async function handleSwipe(place, direction) {
		if (!guestId) return;
		queryClient.setQueryData([
			"mySwipes",
			roomId,
			guestId
		], (prev) => /* @__PURE__ */ new Set([...prev ?? [], place.id]));
		try {
			await swipeFn({ data: {
				roomId,
				placeId: place.id,
				guestId,
				direction
			} });
		} catch {
			toast.error("Swipe failed");
			swipesQ.refetch();
		}
	}
	function share() {
		const url = typeof window !== "undefined" ? window.location.href : "";
		if (navigator.share) navigator.share({
			title: "Join my Decido room",
			url
		}).catch(() => {});
		else {
			navigator.clipboard.writeText(url);
			toast.success("Link copied — send it to your people");
		}
	}
	function copyCode() {
		if (!roomQ.data?.code) return;
		navigator.clipboard.writeText(roomQ.data.code);
		toast.success("Code copied");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-paper pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 -z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-sunset opacity-60 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 h-80 w-80 rounded-full bg-grove opacity-50 blur-3xl" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "glass sticky top-3 z-40 mx-auto mt-3 flex max-w-3xl items-center justify-between rounded-full px-4 py-2.5 md:mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "focus:outline-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitrusMark, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setAiOpen(true),
						className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-muted transition hover:scale-[1.02]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary animate-pulse" }), " Ask AI"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: share,
						className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-citrus transition hover:scale-[1.02]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), " Share link"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-3xl px-4 pt-6 md:pt-10",
				children: roomQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 w-full rounded-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[420px] w-full rounded-3xl" })]
				}) : !roomQ.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-muted-foreground",
					children: "Room not found."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-start justify-between gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-script text-xl text-accent",
										children: "the room"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-serif text-3xl",
										children: roomQ.data.name || "Untitled"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }),
												" ",
												participantsQ.data?.length ?? 0,
												" in room"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: copyCode,
											className: "inline-flex items-center gap-1.5 rounded-full bg-background/50 px-3 py-1 font-mono text-xs tracking-widest backdrop-blur hover:bg-accent hover:text-accent-foreground",
											children: [
												roomQ.data.code,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" })
											]
										})]
									})
								] })
							}), (participantsQ.data?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex -space-x-2",
								children: participantsQ.data.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-sunset text-xs font-semibold text-citrus-cream",
									children: String.fromCharCode(65 + i % 26)
								}, p.user_id))
							})]
						}),
						(placesQ.data?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl p-12 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-script text-3xl text-accent",
								children: "loading…"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-serif text-2xl",
								children: "Fetching places"
							})]
						}) : deck.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-3xl p-12 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-script text-3xl text-accent",
									children: "all done"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-serif text-2xl",
									children: "You've swiped everything"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-muted-foreground",
									children: "Waiting on the rest of the crew…"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative mx-auto flex h-[520px] max-w-md items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: deck.slice(0, 3).reverse().map((place, i) => {
								const stackDepth = deck.slice(0, 3).length - 1 - i;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwipeCard, {
									place,
									isTop: stackDepth === 0,
									depth: stackDepth,
									onSwipe: (dir) => handleSwipe(place, dir)
								}, place.id);
							}) })
						}),
						matchesQ.data && matchesQ.data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-serif text-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPopper, { className: "inline h-5 w-5 text-primary" }), " Matches"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid gap-3 sm:grid-cols-2",
							children: matchesQ.data.map((m) => {
								const place = m.places;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass flex gap-3 rounded-2xl p-3",
									children: [place?.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: place.photo_url,
										alt: "",
										className: "h-16 w-16 rounded-xl object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 w-16 rounded-xl bg-sunset" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-serif text-lg",
											children: place?.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs text-muted-foreground",
											children: place?.address
										})]
									})]
								}, m.place_id);
							})
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!matchDialog,
				onOpenChange: (o) => !o && setMatchDialog(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "glass border-white/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-serif text-3xl",
						children: "It's a match! 🎉"
					}) }), matchDialog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							matchDialog.photo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: matchDialog.photo_url,
								alt: "",
								className: "w-full rounded-2xl"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-2xl",
								children: matchDialog.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: matchDialog.address
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: aiOpen,
				onOpenChange: setAiOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "right",
					className: "glass flex flex-col h-full w-[90%] sm:max-w-md border-l border-white/20 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
							className: "pb-4 border-b border-white/10 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
								className: "flex items-center gap-2 font-serif text-2xl text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-accent animate-pulse" }), " Decido AI"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
								className: "text-muted-foreground text-xs",
								children: "Your warm Egyptian guide to picking the perfect place."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto py-4 space-y-4 pr-1 min-h-0 select-text",
							children: [
								chatHistory.length === 0 && aiLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center h-48 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-script text-accent text-lg",
										children: "Consulting Decido AI..."
									})]
								}),
								chatHistory.map((chat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `flex flex-col max-w-[85%] rounded-2xl p-4 text-sm ${chat.sender === "user" ? "bg-primary text-primary-foreground ml-auto rounded-tr-none shadow-card" : "glass text-foreground mr-auto rounded-tl-none border border-white/35 shadow-card"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "whitespace-pre-wrap leading-relaxed",
										children: chat.text.split("\n\n").map((para, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-2 last:mb-0",
											children: para.split(/(\*\*.*?\*\*)/g).map((part, j) => {
												if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "font-bold",
													children: part.slice(2, -2)
												}, j);
												return part;
											})
										}, i))
									})
								}, idx)),
								chatHistory.length > 0 && aiLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 glass max-w-[50%] mr-auto rounded-2xl rounded-tl-none p-4 border border-white/35",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Typing..."
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleAskQuestion,
							className: "pt-4 border-t border-white/10 shrink-0 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: question,
								onChange: (e) => setQuestion(e.target.value),
								placeholder: "Ask about these places...",
								className: "flex-1 glass bg-background/50 rounded-full px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary border border-white/20",
								disabled: aiLoading
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: aiLoading || !question.trim(),
								className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-citrus transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
							})]
						})
					]
				})
			})
		]
	});
}
function SwipeCard({ place, isTop, depth, onSwipe }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "absolute inset-0 select-none",
		style: { zIndex: 10 - depth },
		initial: {
			scale: 1 - depth * .05,
			y: depth * 8,
			opacity: 1
		},
		animate: {
			scale: 1 - depth * .05,
			y: depth * 8,
			opacity: 1
		},
		drag: isTop ? "x" : false,
		dragConstraints: {
			left: 0,
			right: 0
		},
		onDragEnd: (_, info) => {
			if (info.offset.x > 120) onSwipe("right");
			else if (info.offset.x < -120) onSwipe("left");
		},
		exit: {
			x: 0,
			opacity: 0,
			transition: { duration: .2 }
		},
		whileTap: { cursor: "grabbing" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-citrus",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 bg-grove",
				children: [place.photo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: place.photo_url,
					alt: "",
					className: "h-full w-full object-cover",
					draggable: false
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center bg-sunset",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-6xl text-citrus-cream",
						children: place.name.slice(0, 1)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-citrus-cream",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-script text-xl",
							children: "place"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-3xl leading-tight text-balance",
							children: place.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex flex-wrap items-center gap-3 text-sm text-citrus-cream/90",
							children: [
								place.rating != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-citrus-amber text-citrus-amber" }), place.rating.toFixed(1)]
								}),
								place.price_level != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "EGP".repeat(Math.max(1, place.price_level)) }),
								place.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-1 inline h-3 w-3" }), place.address]
								})
							]
						})
					]
				})]
			}), isTop && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass flex items-center justify-center gap-6 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onSwipe("left"),
					className: "flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-background/60 shadow-card backdrop-blur transition hover:scale-110 hover:border-destructive hover:text-destructive",
					"aria-label": "Skip",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onSwipe("right"),
					className: "flex h-14 w-14 items-center justify-center rounded-full bg-sunset text-citrus-cream shadow-citrus transition hover:scale-110",
					"aria-label": "Love",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-6 w-6" })
				})]
			})]
		})
	});
}
//#endregion
export { RoomPage as component };
