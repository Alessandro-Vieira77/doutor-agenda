import { z } from "zod";

export const upsertAppointmentSchema = z.object({
  id: z.string().uuid().optional(),
  patientId: z.string().uuid({ message: "Selecione um paciente" }),
  doctorId: z.string().uuid({ message: "Selecione um médico" }),
  appointmentPriceInCents: z
    .number()
    .min(1, "Preço deve ser pelo menos 1 centavo"),
  date: z.date({ message: "Selecione uma data" }),
  time: z.string().min(1, "Selecione um horário"),
});

export type UpsertAppointmentSchema = z.infer<typeof upsertAppointmentSchema>;
