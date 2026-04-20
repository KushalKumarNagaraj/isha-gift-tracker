import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const { password, gifts } = body;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!Array.isArray(gifts)) {
    return new Response("Invalid gifts data", { status: 400 });
  }

  const store = getStore("gifts");
  await store.set("list", JSON.stringify(gifts), { metadata: { updatedAt: new Date().toISOString() } });

  return Response.json({ ok: true });
};

export const config = { path: "/api/update-gifts" };
