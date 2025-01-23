import * as schema from "./data/schema";
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {
  getNamedayForName,
  getNamedayToday,
  getNamedaysForDate,
  getNamedaysForDateRange,
  getNamedaysForMonth,
  listNamedays,
  listNamedaysByDate,
} from "./services/namedayService";
import { cors } from "@elysiajs/cors";
import { db } from "./data/db";

const app = new Elysia().use(swagger());
app.use(cors());

app.get("/", () => listNamedays());

app.get(
  "/names",
  ({ query: { name } }) => {
    if (!name) {
      return listNamedays();
    }
    return getNamedayForName(name);
  },
  {
    query: t.Object({
      name: t.Optional(t.String()),
    }),
  }
);

app.get("/today", () => getNamedayToday());

app.get("/dates", () => listNamedaysByDate());

app.get(
  "/dates",
  ({ query: { dayStart, dayEnd, monthStart, monthEnd } }) => {
    return getNamedaysForDateRange(
      { day: dayStart, month: monthStart },
      { day: dayEnd, month: monthEnd }
    );
  },
  {
    query: t.Object({
      dayStart: t.Number(),
      dayEnd: t.Number(),
      monthStart: t.Number(),
      monthEnd: t.Number(),
    }),
  }
);

app.get("/dates/:month", ({ params: { month } }) =>
  getNamedaysForMonth(parseInt(month))
),
  {
    params: t.Object({
      month: t.Integer(),
    }),
  };

app.get("/dates/:month/:day", ({ params: { month, day } }) =>
  getNamedaysForDate(parseInt(month), parseInt(day))
),
  {
    params: t.Object({
      month: t.Integer(),
      day: t.Integer(),
    }),
  };

app.get(
  "/health",
  () => new Response(`OK ${process.env.npm_package_version}`, { status: 200 })
);

app.onError((e) => {
  console.log(e);
  if (e.code === "NOT_FOUND") return "Route not found :(";
  else {
    return "An unexpected error occured";
  }
});

const data = db.select().from(schema.namedays).all();
console.log(`${data.length > 0 ? "✅" : "❌"} Data in database:`, data.length);

console.log(`📆 Starting Nameday™: v${process.env.npm_package_version}`);

app.onError(console.error);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
