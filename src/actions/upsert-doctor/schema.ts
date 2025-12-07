import { z } from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres"),
    specialty: z.string().trim().min(1, "selecione uma espacialidade"),
    availableFromWeekDay: z.number().min(0).max(6),
    availableToWeekDay: z.number().min(0).max(6),
    availableFromTime: z.string().min(1, "Horário inicial é obrigatório"),
    availableToTime: z.string().min(1, "Horário final é obrigatório"),
    appointmentPriceInCents: z
      .number()
      .min(1, "Preço deve ser pelo menos 1 centavo"),
  })
  .refine((data) => data.availableFromTime < data.availableToTime, {
    message: "Horário final deve ser maior que o horário inicial",
    path: ["availableToTime"],
  });

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
