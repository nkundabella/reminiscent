const fs = require("fs");
const path = require("path");

function loadDotEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) continue;
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;

    const key = m[1];
    let value = m[2] ?? "";

    value = value.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadDotEnvLocal();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;

  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID (from .env.local)");
  }

  const { createClient } = require("next-sanity");
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-03-08",
    useCdn: false,
    token,
  });

  const postCount = await client.fetch('count(*[_type=="post"])');
  const posts = await client.fetch(
    '*[_type=="post"]|order(_createdAt desc){_id,_createdAt,_updatedAt,title,slug,publishedAt,mainImage,polaroidCaption,tags,body}'
  );

  const outPath = path.join(process.cwd(), "sanity-posts-backup.json");
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        projectId,
        dataset,
        exportedAt: new Date().toISOString(),
        postCount,
        exportedPosts: posts.length,
        posts,
      },
      null,
      2
    )
  );

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      { projectId, dataset, postCount, exportedPosts: posts.length, outPath },
      null,
      2
    )
  );
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err?.stack || err?.message || String(err));
  process.exit(1);
});

