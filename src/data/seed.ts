import { db, schema } from "./db";
import { namedaysSeed } from "./seeddata";

console.log(`🌱 Start seeding database.`);
if (db.select().from(schema.namedays).all().length === 0) {
  console.time(`🌱 Seeding database`);
  db.insert(schema.namedays).values(namedaysSeed).all();
  console.timeEnd(`🌱 Seeding database`);
} else {
  console.log(`🌱 Database already seeded. 🏁`);
}
