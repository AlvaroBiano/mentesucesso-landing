// open-next.config.ts - Cloudflare adapter config
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  incrementalCache: undefined,
});
