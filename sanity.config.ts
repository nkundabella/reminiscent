import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schema";

export default defineConfig({
  name: "default",
  title: "Izzy's Creative Studio",

  projectId: (() => {
    const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!id) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
    return id;
  })(),
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [structureTool()],

  schema: schema,
});
