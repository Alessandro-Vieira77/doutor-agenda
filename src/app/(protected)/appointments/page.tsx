import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import {
  ReusableContainer,
  ReusableContainerContent,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { db } from "@/db";
import { doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddAppointmentButton } from "./_components/add-appointment-button";
import { AppointmentsDataTable } from "./_components/appointments-data-table";

export default async function Appointments() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session?.user?.clinic.id as string),
  });

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session?.user?.clinic.id as string),
  });

  return (
    <ReusableContainer>
      <ReusableContainerNav name="Agendamentos" />
      <ReusableContainerHeader
        title="Agendamentos"
        description="Gerencie os agendamentos da sua clínica."
        button={<AddAppointmentButton patients={patients} doctors={doctors} />}
      />
      <ReusableContainerContent>
        <AppointmentsDataTable />
      </ReusableContainerContent>
    </ReusableContainer>
  );
}
