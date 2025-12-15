import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phoneNumber: z.string().min(1, "Número de telefone é obrigatório"),
  sex: z.enum(["male", "female"] as const, {
    message: "Selecione o sexo",
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
