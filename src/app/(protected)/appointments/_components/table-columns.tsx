"use server";

import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { ActionOptions } from "./ActionOptions";

export const ColumnsTable = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const appointments = await db.query.appointmentsTable.findMany({
    where: eq(appointmentsTable.clinicId, session?.user?.clinic.id as string),
    with: {
      patient: true,
      doctor: true,
    },
  });

  const columns = appointments?.map((appointment) => ({
    id: appointment.id,
    patient: appointment.patient.name,
    doctor: appointment.doctor.name,
    specialty: appointment.doctor.specialty,
    date: dayjs(appointment.date).format("DD/MM/YYYY"),
    time: dayjs(appointment.date).format("HH:mm"),
    cell: () => {
      return (
        <ActionOptions
          appointment={{
            ...appointment,
            patientName: appointment.patient.name,
            doctorName: appointment.doctor.name,
          }}
        />
      );
    },
  }));

  return columns;
};
