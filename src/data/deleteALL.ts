import * as schema from "./schema";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("db.sqlite");
const db = drizzle(sqlite);
db.delete(schema.namedays).all();