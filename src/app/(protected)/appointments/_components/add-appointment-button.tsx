"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable, patientsTable } from "@/db/schema";

import { UpsertAppointmentForm } from "./upsert-appointment-form";

interface AddAppointmentButtonProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

export function AddAppointmentButton({
  patients,
  doctors,
}: AddAppointmentButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={24} color="#FFFF" />
          Novo agendamento
        </Button>
      </DialogTrigger>
      <UpsertAppointmentForm
        patients={patients}
        doctors={doctors}
        onSuccess={() => setOpen(false)}
      />
    </Dialog>
  );
}
