import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  ReusableContainer,
  ReusableContainerContent,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddDoctorButton } from "./_components/add-doctor-button";
import { DoctorCard } from "./_components/doctor-card";

export default async function Doctors() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.plan) {
    redirect("/new-subscription");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session?.user?.clinic.id as string),
  });

  return (
    <ReusableContainer>
      <ReusableContainerNav name="Doctors" />
      <ReusableContainerHeader
        title="Médicos"
        description="Acesse uma visão geral detalhada das principais métricas e resultados dos pacientes."
        button={<AddDoctorButton />}
      />
      <ReusableContainerContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {doctors?.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </ReusableContainerContent>
    </ReusableContainer>
  );
}
