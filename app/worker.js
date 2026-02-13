export default {
  async fetch(request, env, ctx) {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();
    const url = new URL(request.url);

    console.log(JSON.stringify({
      level: "info",
      requestId,
      message: "Request received",
      method: request.method,
      path: url.pathname,
      time: new Date().toISOString()
    }));

    try {

      // Healthcheck
      if (url.pathname === "/health") {
        return Response.json({
          status: "ok",
          time: new Date().toISOString()
        });
      }

      if (url.pathname === "/") {
        return new Response("Cloudflare Worker with D1 🚀");
      }

      if (url.pathname === "/time") {
        return new Response(new Date().toISOString());
      }

      // Read from D1
      if (url.pathname === "/db") {
        console.log(JSON.stringify({
          level: "info",
          requestId,
          message: "Running D1 query"
        }));

        const stmt = env.DB.prepare("SELECT datetime('now') as time");
        const { results } = await stmt.all();

        return Response.json(results);
      }

      // Save in KV
      if (url.pathname === "/kv/set") {
        await env.KV.put("hello", "world");

        console.log(JSON.stringify({
          level: "info",
          requestId,
          message: "Saved value in KV"
        }));

        return new Response("Saved in KV");
      }

      // Read from KV
      if (url.pathname === "/kv/get") {
        const value = await env.KV.get("hello");

        console.log(JSON.stringify({
          level: "info",
          requestId,
          message: "Read value from KV",
          value
        }));

        return new Response(`KV value: ${value}`);
      }

      return new Response("Not found", { status: 404 });

    } catch (error) {

      console.error(JSON.stringify({
        level: "error",
        requestId,
        message: error.message,
        stack: error.stack,
        path: url.pathname,
        time: new Date().toISOString()
      }));

      return new Response("Internal Server Error", { status: 500 });

    } finally {
      const duration = Date.now() - startTime;

      console.log(JSON.stringify({
        level: "info",
        requestId,
        message: "Request finished",
        duration_ms: duration,
        path: url.pathname
      }));
    }
  }
};
