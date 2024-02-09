import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {
  getNamedayForName,
  getNamedayToday,
  getNamedaysForDate,
  getNamedaysForMonth,
  listNamedays,
} from "./services/namedayService";

const app = new Elysia().use(swagger());

app.get("/", () => listNamedays());

app.get("/names", ({ query: { name } }) => getNamedayForName(name), {
  query: t.Object({
    name: t.String(),
  }),
});

app.get("/today", () => getNamedayToday());

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

app.onError(({ code }) => {
  if (code === "NOT_FOUND") return "Route not found :(";
  else {
    return "An unexpected error occured";
  }
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
