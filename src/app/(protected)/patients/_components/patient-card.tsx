"use client";
import { Dialog } from "@radix-ui/react-dialog";
import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import { AddPatientForm } from "./add-patient-form";
import { DeletePatient } from "./delete-patient";

export const PatientCard = ({
  patient,
}: {
  patient: typeof patientsTable.$inferSelect;
}) => {
  const [open, setOpen] = useState(false);

  const abbreviationName = patient?.name
    .split(" ")
    .map((word, index) => {
      if (index > 1) return;
      return word[0].toLocaleUpperCase();
    })
    .join("");

  return (
    <Card className="relative">
      <CardHeader className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback>{abbreviationName}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-sm">
          <p className="font-semibold">{patient?.name}</p>
          <p className="text-muted-foreground flex items-center gap-2">
            <User size={16} color="var(--primary)" />
            {patient?.sex === "male" ? "Masculino" : "Feminino"}
          </p>
        </div>
        <div className="absolute top-2 right-2">
          <DeletePatient id={patient?.id as string} />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-6">
        <Badge variant="outline">
          <Mail size={16} />
          <p>{patient.email}</p>
        </Badge>
        <Badge variant="outline">
          <Phone size={16} />
          <p>{patient.phoneNumber}</p>
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <DialogContent>
            <AddPatientForm
              patient={patient}
              onSuccess={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
