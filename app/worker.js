export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("Cloudflare Worker with D1 + R2 🚀");
    }

    if (url.pathname === "/time") {
      return new Response(new Date().toISOString());
    }

    if (url.pathname === "/db") {
      const { results } = await env.DB.prepare(
        "SELECT datetime('now') as time"
      ).all();

      return Response.json(results);
    }

    app.get('/favicon.ico', (req, res) => res.status(204));

    return new Response("Not found", { status: 404 });
  }
};

