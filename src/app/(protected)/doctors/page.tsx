import {
  ReusableContainer,
  ReusableContainerContent,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";

import { AddDoctorButton } from "./_components/add-doctor-button";

export default function Doctors() {
  return (
    <ReusableContainer>
      <ReusableContainerNav name="Doctors" />
      <ReusableContainerHeader
        title="Médicos"
        description="Acesse uma visão geral detalhada das principais métricas e resultados dos pacientes."
        button={<AddDoctorButton />}
      />
      <ReusableContainerContent>
        <h1>Doctors</h1>
      </ReusableContainerContent>
    </ReusableContainer>
  );
}
