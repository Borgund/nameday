import names from "../data/names";
import namesSorted from "../data/namesAlphabetic";

export const listNamedays = () => {
  return new Response(JSON.stringify(namesSorted, null, 2), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const getNamedayForName = (name: string) => {
  const nameday = namesSorted.filter(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (!nameday.length) {
    return new Response("Name not found", { status: 404 });
  }
  return new Response(JSON.stringify(nameday[0]), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};

export const getNamedayToday = () => {
  const today = new Date();
  if (names) {
    const nameday = names.filter(
      (item) =>
        item.month === today.getMonth() + 1 && item.day === today.getDate()
    );

    if (!nameday.length) {
      return new Response("No names found for the given date", { status: 404 });
    }
    return new Response(JSON.stringify(nameday[0].names), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
};

export const getNamedaysForMonth = (month: number) => {
  if (!month) return new Response("Bad request", { status: 400 });
  if (names) {
    const nameday = names.filter((item) => item.month === month);

    if (!nameday.length) {
      return new Response("No names found for given month", { status: 404 });
    }
    return new Response(JSON.stringify(nameday.flat()), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
};

export const getNamedaysForDate = (month: number, day: number) => {
  if (!(month && day)) return new Response("Bad request", { status: 400 });
  if (names) {
    const nameday = names.filter(
      (item) => item.month === month && item.day === day
    );

    if (!nameday.length) {
      return new Response("No names found for given date", { status: 404 });
    }
    return new Response(JSON.stringify(nameday[0].names), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
};
