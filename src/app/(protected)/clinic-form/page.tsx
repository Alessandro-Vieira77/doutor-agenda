import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";

import { FormClinic } from "./components/form-clinic";

export default async function ClinicFormPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  if (!session.user.plan) {
    redirect("/new-subscription");
  }

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
