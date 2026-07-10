import { a as __toESM } from "../_runtime.mjs";
import { E as isRedirect, g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CIABkT_i.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guest-CcfAo-Lu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
function CitrusMark({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-2 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"aria-hidden": true,
			className: "relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-sunset shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-1 rounded-full bg-citrus-cream/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative font-serif text-citrus-cream leading-none",
				children: "c"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-script text-2xl leading-none text-primary",
			children: "Decido"
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createRoom = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	query: stringType().trim().min(2).max(120),
	hostGuestId: stringType().uuid(),
	hostName: stringType().trim().max(40).optional(),
	roomName: stringType().trim().max(60).optional(),
	latitude: numberType().optional(),
	longitude: numberType().optional()
}).parse(d)).handler(createSsrRpc("6a56a1959ab0c01348361c8afd3f81642ccaed0e6f7386bdeffc960904161e74"));
var joinRoom = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	roomId: stringType().uuid(),
	guestId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("b1eaa648fafcba7ac73372187e97f4cb3c08e5c04c0bd53ec434bee5327384db"));
var recordSwipe = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	roomId: stringType().uuid(),
	placeId: stringType().uuid(),
	guestId: stringType().uuid(),
	direction: enumType(["left", "right"])
}).parse(d)).handler(createSsrRpc("4a186a3a14597cbbb2d7b84bc66d37fc267d739412f0e686727029c920004865"));
var ID_KEY = "decido.guestId";
function uuid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0;
		return (c === "x" ? r : r & 3 | 8).toString(16);
	});
}
function getGuestId() {
	if (typeof window === "undefined") return "";
	let id = localStorage.getItem(ID_KEY);
	if (!id) {
		id = uuid();
		localStorage.setItem(ID_KEY, id);
	}
	return id;
}
//#endregion
export { joinRoom as a, getGuestId as i, createRoom as n, recordSwipe as o, createSsrRpc as r, useServerFn as s, CitrusMark as t };
