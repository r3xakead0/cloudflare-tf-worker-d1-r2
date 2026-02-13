export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("Cloudflare Worker with D1 🚀");
    }

    if (url.pathname === "/time") {
      return new Response(new Date().toISOString());
    }

    // Read from D1
    if (url.pathname === "/db") {
      const { results } = await env.DB
        .prepare("SELECT datetime('now') as time")
        .all();

      return Response.json(results);
    }

    // Save in KV
    if (url.pathname === "/kv/set") {
      await env.KV.put("hello", "world");
      return new Response("Saved in KV");
    }

    // Read from KV
    if (url.pathname === "/kv/get") {
      const value = await env.KV.get("hello");
      return new Response(`KV value: ${value}`);
    }

    return new Response("Not found", { status: 404 });
  }
};
