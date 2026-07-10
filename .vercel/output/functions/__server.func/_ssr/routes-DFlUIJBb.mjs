import { a as __toESM } from "../_runtime.mjs";
import { g as useRouter, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as getGuestId, n as createRoom, s as useServerFn, t as CitrusMark } from "./guest-CcfAo-Lu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { i as Sparkles, l as MapPin, n as Users, s as Search, u as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DFlUIJBb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	const router = useRouter();
	const create = useServerFn(createRoom);
	const [query, setQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function handleCreate(e) {
		e?.preventDefault();
		if (!query.trim() || loading) return;
		setLoading(true);
		try {
			const guestId = getGuestId();
			const coords = await new Promise((resolve) => {
				if (!navigator.geolocation) {
					resolve({
						latitude: 30.0444,
						longitude: 31.2357
					});
					return;
				}
				navigator.geolocation.getCurrentPosition((pos) => {
					resolve({
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude
					});
				}, (err) => {
					console.warn("Geolocation failed or denied, using Cairo fallback:", err);
					resolve({
						latitude: 30.0444,
						longitude: 31.2357
					});
				}, {
					timeout: 3500,
					enableHighAccuracy: false
				});
			});
			const r = await create({ data: {
				query: query.trim(),
				hostGuestId: guestId,
				latitude: coords.latitude,
				longitude: coords.longitude
			} });
			toast.success(`Room ready · ${r.inserted} places`);
			router.navigate({
				to: "/r/$roomId",
				params: { roomId: r.roomId }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not create room");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 -z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -left-20 h-96 w-96 rounded-full bg-sunset opacity-70 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 -right-24 h-[28rem] w-[28rem] rounded-full bg-grove opacity-60 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sunset opacity-40 blur-3xl" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitrusMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#how",
					className: "glass hidden rounded-full px-5 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground sm:inline-block",
					children: "How it works"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative mx-auto max-w-4xl px-6 pt-6 pb-16 md:pt-16 md:pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-script text-3xl text-accent",
								children: "where to?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-2 font-serif text-5xl leading-[1.02] text-foreground md:text-7xl text-balance",
								children: [
									"Type a place.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary italic",
										children: "Swipe"
									}),
									" with your people."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-6 max-w-xl text-lg text-muted-foreground",
								children: "No sign-in. No apps. Search Google Maps for a spot or vibe, share the link, and decide together in seconds."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .4,
							ease: "easeOut"
						},
						onSubmit: handleCreate,
						className: "glass mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-full p-2 shadow-citrus",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 items-center gap-3 px-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "e.g. cozy cafes in Zamalek",
								className: "w-full bg-transparent py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none",
								autoFocus: true,
								"aria-label": "Search Google Maps for a place"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading || query.trim().length < 2,
							className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-citrus transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Cooking…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Create room"] })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-xs text-muted-foreground",
						children: "Powered by Google Maps — we'll pull real places matching your search."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap justify-center gap-2",
						children: [
							"koshary in Downtown",
							"cafes in Zamalek",
							"sushi in Maadi",
							"rooftop bars in Cairo"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setQuery(s),
							className: "glass rounded-full px-3.5 py-1.5 text-xs text-foreground/70 hover:text-foreground",
							children: s
						}, s))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "how",
				className: "mx-auto max-w-6xl px-6 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: [
						{
							icon: Search,
							title: "Search a place",
							body: "Type a neighborhood, cuisine, or vibe. We pull real spots from Google Maps."
						},
						{
							icon: Users,
							title: "Share the link",
							body: "Send the room link to friends. No sign-up, no accounts, no friction."
						},
						{
							icon: MapPin,
							title: "Swipe & match",
							body: "Left to skip, right to love. When everyone matches — you have a plan."
						}
					].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-3xl p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-sunset text-citrus-cream shadow-citrus",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-serif text-2xl",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted-foreground",
								children: step.body
							})
						]
					}, i))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border/40 py-8 text-center text-sm text-muted-foreground",
				children: [
					"Made with ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "♥"
					}),
					" · Decido, 2026 ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "underline-offset-2 hover:underline",
						children: "decido.app"
					})
				]
			})
		]
	});
}
//#endregion
export { Landing as component };
