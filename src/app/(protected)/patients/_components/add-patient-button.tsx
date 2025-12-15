"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { AddPatientForm } from "./add-patient-form";

export function AddPatientButton() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size={24} color="#FFFF" />
          Adicionar Paciente
        </Button>
      </DialogTrigger>
      <AddPatientForm onSuccess={() => setOpen(false)} />
    </Dialog>
  );
}
