"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { ptBR } from "date-fns/locale";
import dayjs from "dayjs";
import { ChevronDownIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { getAvailableTimes } from "@/actions/get-available-times";
import { upsertAppointment } from "@/actions/upsert-appointment";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doctorsTable, patientsTable } from "@/db/schema";

const appointmentSchema = z.object({
  patientId: z.string().uuid("Selecione um paciente"),
  doctorId: z.string().uuid("Selecione um médico"),
  appointmentPriceInCents: z
    .number()
    .min(1, "Preço deve ser pelo menos 1 centavo"),
  date: z.date({ message: "Selecione uma data" }),
  time: z.string().min(1, "Selecione um horário"),
});

interface UpsertAppointmentFormProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
  onSuccess?: () => void;
}

export function UpsertAppointmentForm({
  patients,
  doctors,
  onSuccess,
}: UpsertAppointmentFormProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    shouldUnregister: true,
    defaultValues: {
      patientId: "",
      doctorId: "",
      appointmentPriceInCents: 0,
      time: "",
    },
  });

  const upsertAppointmentAction = useAction(upsertAppointment, {
    onSuccess: () => {
      toast.success("Agendamento criado com sucesso!");
      onSuccess?.();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao criar agendamento");
    },
  });

  const selectedDoctorId = form.watch("doctorId");
  const selectedPatientId = form.watch("patientId");
  const selectedDate = form.watch("date");

  const { data: availableTimes } = useQuery({
    queryKey: ["available-times", selectedDoctorId, selectedDate],
    queryFn: () =>
      getAvailableTimes({
        doctorId: selectedDoctorId,
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
      }),
  });

  // Atualiza o preço quando o médico é selecionado
  const handleDoctorChange = (doctorId: string) => {
    form.setValue("doctorId", doctorId);
    const doctor = doctors.find((d) => d.id === doctorId);
    if (doctor) {
      form.setValue(
        "appointmentPriceInCents",
        Number(doctor.appointmentPriceInCents) / 100,
      );
    }
  };

  const onSubmit = (data: z.infer<typeof appointmentSchema>) => {
    upsertAppointmentAction.execute({
      ...data,
      appointmentPriceInCents: data.appointmentPriceInCents * 100,
    });
  };

  const isDateAndTimeEnabled = !!selectedPatientId && !!selectedDoctorId;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Agendamento</DialogTitle>
        <DialogDescription>
          Preencha os dados para criar um novo agendamento
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paciente</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doctorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Médico</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={handleDoctorChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um médico" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appointmentPriceInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da consulta</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    onValueChange={(value) => field.onChange(value.floatValue)}
                    decimalScale={2}
                    prefix="R$"
                    decimalSeparator=","
                    thousandSeparator="."
                    allowNegative={false}
                    allowLeadingZeros={false}
                    customInput={Input}
                    disabled={!selectedDoctorId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date" className="px-1">
                    Data
                  </Label>
                  <Popover
                    open={datePickerOpen}
                    onOpenChange={setDatePickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                        disabled={!isDateAndTimeEnabled}
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Selecione uma data"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setDatePickerOpen(false);
                        }}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!isDateAndTimeEnabled || !selectedDate}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes?.data?.map((time) => (
                        <SelectItem
                          key={time.time}
                          value={time.time}
                          disabled={!time.isAvailable}
                        >
                          {time.label} {!time.isAvailable && "(Indisponível)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button disabled={upsertAppointmentAction.isPending} type="submit">
              Criar agendamento
              {upsertAppointmentAction.isPending && "..."}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
