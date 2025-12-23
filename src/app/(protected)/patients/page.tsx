import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  ReusableContainer,
  ReusableContainerContent,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { DataTable } from "@/components/ui/data-table";
import { auth } from "@/lib/auth";

import { AddPatientButton } from "./_components/add-patient-button";

export default async function Patients() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  if (!session.user.plan) {
    redirect("/new-subscription");
  }

  return (
    <ReusableContainer>
      <ReusableContainerNav name="Pacientes" />
      <ReusableContainerHeader
        title="Pacientes"
        description="Gerencie os pacientes da sua clínica."
        button={<AddPatientButton />}
      />
      <ReusableContainerContent>
        <DataTable />
      </ReusableContainerContent>
    </ReusableContainer>
  );
}
