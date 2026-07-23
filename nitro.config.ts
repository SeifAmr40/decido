import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  cloudflare: {
    nodeCompat: true,
  },
});
