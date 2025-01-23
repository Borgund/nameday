import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const namedays = sqliteTable("namedays", {
  name: text("name").primaryKey(),
  month: integer("month").notNull(),
  day: integer("day").notNull(),
});
