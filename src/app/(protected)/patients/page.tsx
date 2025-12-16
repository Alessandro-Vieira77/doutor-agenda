import {
  ReusableContainer,
  ReusableContainerContent,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { DataTable } from "@/components/ui/data-table";

import { AddPatientButton } from "./_components/add-patient-button";

export default async function Patients() {
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
