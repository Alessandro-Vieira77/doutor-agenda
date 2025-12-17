"use client";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

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
import { appointmentsTable } from "@/db/schema";

import { DeleteAppointment } from "./delete-appointment";

export const ActionOptions = ({
  appointment,
}: {
  appointment: typeof appointmentsTable.$inferSelect & {
    patientName: string;
    doctorName: string;
  };
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MoreVerticalIcon size={20} color="black" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>{appointment.patientName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setOpenDelete(true);
              }}
            >
              <Trash2Icon size={20} color="var(--destructive)" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAppointment
        id={appointment.id}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
      />
    </>
  );
};
