"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FormClinic } from "./components/form-clinic";

export default function ClinicFormPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Dialog open={true}>
        <DialogTrigger asChild>
          <Button variant="outline">Criar clínica</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar clínica</DialogTitle>
            <DialogDescription>
              Crie sua clínica para começar a usar o sistema.
            </DialogDescription>
          </DialogHeader>

          <FormClinic />
        </DialogContent>
      </Dialog>
    </div>
  );
}
