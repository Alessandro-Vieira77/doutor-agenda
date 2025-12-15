"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { upsertPatient } from "@/actions/upsert-patient";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientsTable } from "@/db/schema";

const patientSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phoneNumber: z.string().min(1, "Número de telefone é obrigatório"),
  sex: z.enum(["male", "female"] as const, {
    message: "Selecione o sexo",
  }),
});

interface AddPatientFormProps {
  patient?: typeof patientsTable.$inferSelect;
  onSuccess?: () => void;
}

export function AddPatientForm({ patient, onSuccess }: AddPatientFormProps) {
  const form = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    shouldUnregister: true,
    defaultValues: {
      name: patient?.name || "",
      email: patient?.email || "",
      phoneNumber: patient?.phoneNumber || "",
      sex: patient?.sex || undefined,
    },
  });

  const upsertPatientAction = useAction(upsertPatient, {
    onSuccess: () => {
      toast.success("Paciente salvo com sucesso");
      onSuccess?.();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao salvar paciente");
    },
  });

  const onSubmit = (data: z.infer<typeof patientSchema>) => {
    upsertPatientAction.execute({
      ...data,
      id: patient?.id,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {patient ? `${patient?.name}` : "Adicionar Paciente"}
        </DialogTitle>
        <DialogDescription>
          {patient ? "Edite os dados do paciente" : "Adicione um novo paciente"}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite o nome do paciente" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Digite o email do paciente"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de telefone</FormLabel>
                <FormControl>
                  <PatternFormat
                    value={field.value}
                    onValueChange={(value) => field.onChange(value.value)}
                    format="(##) #####-####"
                    mask="_"
                    customInput={Input}
                    placeholder="(00) 00000-0000"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button disabled={upsertPatientAction.isPending} type="submit">
              {patient ? "Salvar" : "Adicionar"}
              {upsertPatientAction.isPending && "..."}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
