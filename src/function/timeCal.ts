import dayjs from "dayjs";

export const time = (created_at: string) => {
  const now = dayjs().format("YYYY-MM-DD HH:mm");
  const created = dayjs(created_at).format("YYYY-MM-DD HH:mm");
  const time = dayjs(created_at).format("YYYY/MM/DD HH:mm");

  const ft = dayjs(now);
  const tt = dayjs(created);
  const minDiff = ft.diff(tt, "minutes", true);
  console.log(minDiff);
  if (minDiff < 1) return "방금";
  else if (minDiff < 60) return minDiff + "분 전";
  else {
    if (now.slice(0, 4) === created.slice(0, 4)) return time.slice(5);
    else return time.slice(2);
  }
};
