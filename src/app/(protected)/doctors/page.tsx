import { Plus } from "lucide-react";

import {
  ReusableContainer,
  ReusableContainerContent,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { Button } from "@/components/ui/button";

export default function Doctors() {
  return (
    <ReusableContainer>
      <ReusableContainerNav name="Doctors" />
      <ReusableContainerHeader
        title="Médicos"
        description="Acesse uma visão geral detalhada das principais métricas e resultados dos pacientes."
        button={
          <Button className="flex items-center gap-2 self-end">
            {" "}
            <Plus size={20} /> Adicionar Médicos
          </Button>
        }
      />
      <ReusableContainerContent>
        <h1>Doctors</h1>
      </ReusableContainerContent>
    </ReusableContainer>
  );
}
