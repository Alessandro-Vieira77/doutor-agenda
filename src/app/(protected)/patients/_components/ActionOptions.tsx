"use client";
import { EditIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

import { AddPatientForm } from "./add-patient-form";

export const ActionOptions = ({
  patient,
}: {
  patient: typeof patientsTable.$inferSelect;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MoreVerticalIcon size={20} color="black" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <EditIcon size={20} color="var(--primary)" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2Icon size={20} color="var(--destructive)" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <AddPatientForm patient={patient} onSuccess={() => setOpen(false)} />
      </Dialog>
    </>
  );
};
