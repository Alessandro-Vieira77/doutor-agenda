"use server";

import dayjs from "dayjs";

import { ActionOptions } from "./ActionOptions";

export interface AppointmentsWithPatientAndDoctor {
  id: string;
  date: Date;
  appointmentPriceInCents: number;
  createdAt: Date;
  updatedAt: Date | null;
  clinicId: string;
  patientId: string;
  doctorId: string;
  patient: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    clinicId: string;
    email: string;
    phoneNumber: string;
    sex: "male" | "female";
  };
  doctor: {
    id: string;
    name: string;
    appointmentPriceInCents: number;
    createdAt: Date;
    updatedAt: Date | null;
    clinicId: string;
    avatarImageUrl: string | null;
    availableFromWeekDay: number;
    availableToWeekDay: number;
    availableFromTime: string;
    availableToTime: string;
    specialty: string;
  };
}

export const ColumnsTable = async ({
  appointments,
}: {
  appointments: AppointmentsWithPatientAndDoctor[];
}) => {
  const columns = appointments?.map((appointment) => ({
    id: appointment.id,
    patient: appointment?.patient.name,
    doctor: appointment.doctor.name,
    specialty: appointment.doctor.specialty,
    date: dayjs(appointment.date).format("DD/MM/YYYY"),
    time: dayjs(appointment.date).format("HH:mm"),
    cell: () => {
      return (
        <ActionOptions
          appointment={{
            ...appointment,
            patientName: appointment.patient.name,
            doctorName: appointment.doctor.name,
          }}
        />
      );
    },
  }));

  return columns;
};
