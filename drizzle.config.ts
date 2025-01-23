import { defineConfig } from "drizzle-kit";

export default defineConfig({
  verbose: true,
  dialect: "sqlite",
  out: "./drizzle",
  schema: "./src/data/schema.ts",
  dbCredentials: {
    url: "db.sqlite",
  },
  migrations: {
    table: "namedays",
    schema: "./src/data/schema.ts",
  },
});
