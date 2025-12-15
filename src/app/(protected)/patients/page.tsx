import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import {
  ReusableContainer,
  ReusableContainerContent,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddPatientButton } from "./_components/add-patient-button";
import { PatientCard } from "./_components/patient-card";

export default async function Patients() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session?.user?.clinic.id as string),
  });

  return (
    <ReusableContainer>
      <ReusableContainerNav name="Pacientes" />
      <ReusableContainerHeader
        title="Pacientes"
        description="Gerencie os pacientes da sua clínica."
        button={<AddPatientButton />}
      />
      <ReusableContainerContent>
        <div className="grid grid-cols-3 gap-4">
          {patients?.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </ReusableContainerContent>
    </ReusableContainer>
  );
}
