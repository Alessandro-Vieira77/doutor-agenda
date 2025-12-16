"use client";
import { EditIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
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

export const ActionOptions = ({
  patient,
}: {
  patient: typeof patientsTable.$inferSelect;
}) => {
  return (
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
          <DropdownMenuItem>
            <EditIcon size={20} color="var(--primary)" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2Icon size={20} color="var(--destructive)" /> Excluir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
