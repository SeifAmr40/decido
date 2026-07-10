//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CIABkT_i.js
var manifest = {
	"122d040bac1c74688a0d91756bd1d719a28a77614a2519f1893e61132d412e2f": {
		functionName: "getRoomAISummary_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-jsQSU7xc.mjs")
	},
	"4a186a3a14597cbbb2d7b84bc66d37fc267d739412f0e686727029c920004865": {
		functionName: "recordSwipe_createServerFn_handler",
		importer: () => import("./_ssr/rooms.functions-BrDAdogA.mjs")
	},
	"6a56a1959ab0c01348361c8afd3f81642ccaed0e6f7386bdeffc960904161e74": {
		functionName: "createRoom_createServerFn_handler",
		importer: () => import("./_ssr/rooms.functions-BrDAdogA.mjs")
	},
	"b1eaa648fafcba7ac73372187e97f4cb3c08e5c04c0bd53ec434bee5327384db": {
		functionName: "joinRoom_createServerFn_handler",
		importer: () => import("./_ssr/rooms.functions-BrDAdogA.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
