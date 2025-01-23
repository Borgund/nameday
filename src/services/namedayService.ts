import { db, schema } from "~db";
import { eq, and, or, like, gte, lte } from "drizzle-orm";

const { namedays } = schema;

export const listNamedays = () => {
  const namesSorted = db.select().from(namedays).orderBy(namedays.name).all();
  return new Response(JSON.stringify(namesSorted, null, 2), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const listNamedaysByDate = () => {
  const result = db
    .select()
    .from(namedays)
    .orderBy(namedays.month, namedays.day)
    .all();
  return new Response(JSON.stringify(result, null, 2), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const getNamedayForName = (name: string) => {
  const result = db
    .select()
    .from(namedays)
    .where(like(namedays.name, name))
    .all();
  if (!result.length) {
    return new Response("Name not found", { status: 404 });
  }
  return new Response(JSON.stringify(result[0]), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const getNamedayToday = () => {
  const today = new Date();
  const result = _getNamedaysForDate(today.getMonth() + 1, today.getDate());
  if (!result.length) {
    return new Response("No names found for the given date", { status: 404 });
  }
  return new Response(JSON.stringify(result.flat()), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const getNamedaysForMonth = (month: number) => {
  if (!month) return new Response("Bad request", { status: 400 });
  const result = db
    .select()
    .from(namedays)
    .where(eq(namedays.month, month))
    .all();

  if (!result.length) {
    return new Response("No names found for given month", { status: 404 });
  }

  return new Response(JSON.stringify(result.flat()), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const getNamedaysForDate = (month: number, day: number) => {
  if (!(month && day)) return new Response("Bad request", { status: 400 });
  const result = _getNamedaysForDate(month, day);
  if (!result.length) {
    return new Response("No names found for given date", { status: 404 });
  }

  return new Response(JSON.stringify(result.flat()), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const getNamedaysForDateRange = (
  start: { day: number; month: number },
  end: { day: number; month: number }
) => {
  if (!(_validateRangeInput(start) && _validateRangeInput(end))) {
    return new Response("Invalid date format", { status: 400 });
  }
  const result = db
    .select()
    .from(namedays)
    .where(
      and(
        and(gte(namedays.month, start.month), gte(namedays.day, start.day)),
        and(lte(namedays.month, end.month), lte(namedays.day, end.day))
      )
    )
    .all();
  if (!result.length) {
    return new Response("No names found for given date range", { status: 404 });
  }
  return new Response(JSON.stringify(result.flat()), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

function _getNamedaysForDate(month: number, day: number) {
  return db
    .select()
    .from(namedays)
    .where(and(eq(namedays.month, month), eq(namedays.day, day)))
    .all();
}

function _validateBetween(number: number, start: number, end: number) {
  return number >= start && number <= end && _validateRange(start, end);
}

function _validateRange(start: number, end: number) {
  return start <= end;
}

function _validateRangeInput({ day, month }: { day: number; month: number }) {
  return _validateBetween(month, 1, 12) && _validateBetween(day, 1, 31);
}
