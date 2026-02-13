addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    return new Response("Cloudflare Worker with D1 🚀");
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

  if (url.pathname === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }

  return new Response("Not found", { status: 404 });
}


