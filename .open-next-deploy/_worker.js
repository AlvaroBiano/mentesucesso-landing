// Cloudflare Pages _worker.js for OpenNext
// Generated worker that wraps the server-functions handler

import { handle as handler } from "./server-functions/default/index.mjs";

export default {
  async fetch(request, env, ctx) {
    return handler(request, env, ctx);
  }
};
