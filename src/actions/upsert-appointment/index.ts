"use server";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { upsertAppointmentSchema } from "./schema";

export const upsertAppointment = actionClient
  .schema(upsertAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user?.clinic) {
      throw new Error("Unauthorized");
    }

    // Combina a data com o horário selecionado
    const [hours, minutes] = parsedInput.time.split(":");
    const appointmentDate = dayjs(parsedInput.date)
      .set("hour", parseInt(hours))
      .set("minute", parseInt(minutes))
      .set("second", 0)
      .toDate();

    await db
      .insert(appointmentsTable)
      .values({
        id: parsedInput.id,
        patientId: parsedInput.patientId,
        doctorId: parsedInput.doctorId,
        clinicId: session.user.clinic.id,
        date: appointmentDate,
      })
      .onConflictDoUpdate({
        target: [appointmentsTable.id],
        set: {
          patientId: parsedInput.patientId,
          doctorId: parsedInput.doctorId,
          date: appointmentDate,
        },
      });

    revalidatePath("/appointments");
  });
