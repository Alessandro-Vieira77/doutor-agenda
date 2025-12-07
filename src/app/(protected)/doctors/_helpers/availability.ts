import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import weekDay from "dayjs/plugin/weekday";

import { doctorsTable } from "@/db/schema";

dayjs.extend(weekDay);
dayjs.extend(utc);
dayjs.locale("pt-br");
export const getAvailabilityTime = (
  doctor: typeof doctorsTable.$inferSelect,
) => {
  const from = dayjs()
    .utc()
    .day(doctor.availableFromWeekDay)
    .set("hour", Number(doctor.availableFromTime.split(":")[0]))
    .set("minute", Number(doctor.availableFromTime.split(":")[1]))
    .set("second", Number(doctor.availableFromTime.split(":")[2] || 0))
    .local();

  const to = dayjs()
    .utc()
    .day(doctor.availableToWeekDay)
    .set("hour", Number(doctor.availableToTime.split(":")[0]))
    .set("minute", Number(doctor.availableToTime.split(":")[1]))
    .set("second", Number(doctor.availableToTime.split(":")[2] || 0))
    .local();

  return {
    from,
    to,
  };
};

export const numberToDay = (number: number) => {
  return dayjs().weekday(number).format("dddd");
};
