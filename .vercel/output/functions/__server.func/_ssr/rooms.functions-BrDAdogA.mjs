import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rooms.functions-BrDAdogA.js
var GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";
function code6() {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let out = "";
	for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * 32)];
	return out;
}
async function getAdmin() {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	return supabaseAdmin;
}
async function placesTextSearch(query, latitude, longitude) {
	const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
	const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
	if (!LOVABLE_API_KEY || !GOOGLE_MAPS_API_KEY) throw new Error("Google Maps connector not configured");
	const reqBody = {
		textQuery: query,
		maxResultCount: 20
	};
	if (latitude !== void 0 && longitude !== void 0) reqBody.locationBias = { circle: {
		center: {
			latitude,
			longitude
		},
		radius: 2e4
	} };
	const res = await fetch(`${GATEWAY_URL}/places/v1/places:searchText`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${LOVABLE_API_KEY}`,
			"X-Connection-Api-Key": GOOGLE_MAPS_API_KEY,
			"Content-Type": "application/json",
			"X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.priceLevel,places.photos,places.primaryType"
		},
		body: JSON.stringify(reqBody)
	});
	if (!res.ok) {
		const body = await res.text();
		console.error("Places API error", res.status, body);
		throw new Error(`Places search failed [${res.status}]: ${body.slice(0, 200)}`);
	}
	return await res.json();
}
var priceLevelMap = {
	PRICE_LEVEL_FREE: 0,
	PRICE_LEVEL_INEXPENSIVE: 1,
	PRICE_LEVEL_MODERATE: 2,
	PRICE_LEVEL_EXPENSIVE: 3,
	PRICE_LEVEL_VERY_EXPENSIVE: 4
};
var createRoom_createServerFn_handler = createServerRpc({
	id: "6a56a1959ab0c01348361c8afd3f81642ccaed0e6f7386bdeffc960904161e74",
	name: "createRoom",
	filename: "src/lib/rooms.functions.ts"
}, (opts) => createRoom.__executeServer(opts));
var createRoom = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	query: stringType().trim().min(2).max(120),
	hostGuestId: stringType().uuid(),
	hostName: stringType().trim().max(40).optional(),
	roomName: stringType().trim().max(60).optional(),
	latitude: numberType().optional(),
	longitude: numberType().optional()
}).parse(d)).handler(createRoom_createServerFn_handler, async ({ data }) => {
	const supabase = await getAdmin();
	const payload = await placesTextSearch(data.query, data.latitude, data.longitude);
	const first = payload.places?.[0];
	if (!payload.places || payload.places.length === 0) throw new Error("No places matched that search. Try something more specific.");
	const { data: room, error: roomErr } = await supabase.from("rooms").insert({
		code: code6(),
		host_id: data.hostGuestId,
		name: data.roomName || data.query.slice(0, 60),
		category: first?.primaryType ?? "restaurant",
		latitude: first?.location?.latitude ?? null,
		longitude: first?.location?.longitude ?? null,
		radius_meters: 2e3,
		status: "active"
	}).select().single();
	if (roomErr) throw roomErr;
	const rows = payload.places.map((p) => {
		const photoName = p.photos?.[0]?.name;
		const photoUrl = photoName ? `/api/public/place-photo/${photoName}?w=800` : null;
		return {
			room_id: room.id,
			google_place_id: p.id,
			name: p.displayName?.text ?? "Unknown",
			address: p.formattedAddress ?? null,
			latitude: p.location?.latitude ?? null,
			longitude: p.location?.longitude ?? null,
			rating: p.rating ?? null,
			price_level: p.priceLevel ? priceLevelMap[p.priceLevel] ?? null : null,
			photo_url: photoUrl,
			category: p.primaryType ?? null
		};
	});
	const { error: insErr } = await supabase.from("places").upsert(rows, {
		onConflict: "room_id,google_place_id",
		ignoreDuplicates: true
	});
	if (insErr) throw insErr;
	await supabase.from("participants").insert({
		room_id: room.id,
		user_id: data.hostGuestId
	});
	return {
		roomId: room.id,
		code: room.code,
		inserted: rows.length
	};
});
var joinRoom_createServerFn_handler = createServerRpc({
	id: "b1eaa648fafcba7ac73372187e97f4cb3c08e5c04c0bd53ec434bee5327384db",
	name: "joinRoom",
	filename: "src/lib/rooms.functions.ts"
}, (opts) => joinRoom.__executeServer(opts));
var joinRoom = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	roomId: stringType().uuid(),
	guestId: stringType().uuid()
}).parse(d)).handler(joinRoom_createServerFn_handler, async ({ data }) => {
	const { error } = await (await getAdmin()).from("participants").upsert({
		room_id: data.roomId,
		user_id: data.guestId
	}, {
		onConflict: "room_id,user_id",
		ignoreDuplicates: true
	});
	if (error && !error.message.includes("duplicate")) throw error;
	return { ok: true };
});
var recordSwipe_createServerFn_handler = createServerRpc({
	id: "4a186a3a14597cbbb2d7b84bc66d37fc267d739412f0e686727029c920004865",
	name: "recordSwipe",
	filename: "src/lib/rooms.functions.ts"
}, (opts) => recordSwipe.__executeServer(opts));
var recordSwipe = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	roomId: stringType().uuid(),
	placeId: stringType().uuid(),
	guestId: stringType().uuid(),
	direction: enumType(["left", "right"])
}).parse(d)).handler(recordSwipe_createServerFn_handler, async ({ data }) => {
	const { error } = await (await getAdmin()).from("swipes").insert({
		room_id: data.roomId,
		place_id: data.placeId,
		user_id: data.guestId,
		direction: data.direction
	});
	if (error && !error.message.includes("duplicate")) throw error;
	return { ok: true };
});
//#endregion
export { createRoom_createServerFn_handler, joinRoom_createServerFn_handler, recordSwipe_createServerFn_handler };
