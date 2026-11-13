/**
 * Returns the Monday 00:00:00.000 and Sunday 23:59:59.999 for any given date.
 * Weeks strictly start on Monday and end on Sunday according to specifications.
 */
export const getWeekRange = (dateInput = new Date()) => {
  const d = new Date(dateInput);
  const day = d.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
  
  // Calculate difference to get Monday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    weekStart: monday,
    weekEnd: sunday,
    weekLabel: `${monday.toLocaleString("default", { month: "short", day: "numeric" })} - ${sunday.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" })}`
  };
};

