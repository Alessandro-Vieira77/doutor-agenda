"use server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availabreFromTime = parsedInput.availableFromTime;
    const availabreToTime = parsedInput.availableToTime;

    const availableFromTimeDayJs = dayjs()
      .set("hour", parseInt(availabreFromTime.split(":")[0]))
      .set("minute", parseInt(availabreFromTime.split(":")[1]))
      .set("second", parseInt(availabreFromTime.split(":")[2]))
      .utc();

    const availableToTimeDayJs = dayjs()
      .set("hour", parseInt(availabreToTime.split(":")[0]))
      .set("minute", parseInt(availabreToTime.split(":")[1]))
      .set("second", parseInt(availabreToTime.split(":")[2]))
      .utc();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user?.clinic) {
      throw new Error("Unauthorized");
    }

    await db
      .insert(doctorsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        clinicId: session?.user?.clinic?.id,
        availableFromTime: availableFromTimeDayJs.format("HH:mm:ss"),
        availableToTime: availableToTimeDayJs.format("HH:mm:ss"),
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          availableFromTime: availableFromTimeDayJs.format("HH:mm:ss"),
          availableToTime: availableToTimeDayJs.format("HH:mm:ss"),
        },
      });
    revalidatePath("/doctors");
  });
