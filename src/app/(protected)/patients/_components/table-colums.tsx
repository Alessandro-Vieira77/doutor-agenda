"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { auth } from "@/lib/auth";

import { ActionOptions } from "./ActionOptions";

// const patients = await db.query.patientsTable.findMany({
//   where: eq(patientsTable.clinicId, session?.user?.clinic.id as string),
// });

export const ColumnsTable = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session?.user?.clinic.id as string),
  });

  const columns = patients?.map((patient) => ({
    id: patient.name,
    name: patient.name,
    email: patient.email,
    phoneNumber: formatPhoneNumber(patient.phoneNumber),
    sex: () => {
      const sex = patient.sex === "male" ? "Masculino" : "Feminino";
      return sex;
    },
    cell: () => {
      return <ActionOptions patient={patient} />;
    },
  }));

  return columns;
};
