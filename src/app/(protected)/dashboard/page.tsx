"use server";

import { and, count, eq, gte, lte, sum } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  ReusableContainer,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { db } from "@/db";
import {
  appointmentsTable,
  doctorsTable,
  patientsTable,
  usersToClinicsTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";

import { DatePicker } from "./_components/date-picker";
import { StartsCard } from "./_components/starts-card";

interface DashboardPageProps {
  searchParams: Promise<{ from: string; to: string }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const clinic = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinic.length === 0) {
    return redirect("/clinic-form");
  }
  const { from, to } = await searchParams;

  const fromDate =
    from && !isNaN(new Date(from).getTime())
      ? new Date(from)
      : new Date("1970-01-01");

  const toDate =
    to && !isNaN(new Date(to).getTime()) ? new Date(to) : new Date();

  const [[totalRevenue], [totalAppointments], [totalPatients], [totalDoctors]] =
    await Promise.all([
      db
        .select({
          total: sum(appointmentsTable.appointmentPriceInCents),
        })
        .from(appointmentsTable)
        .where(
          and(
            eq(appointmentsTable.clinicId, session.user.clinic.id),
            gte(appointmentsTable.date, fromDate),
            lte(appointmentsTable.date, toDate),
          ),
        ),
      db
        .select({
          total: count(),
        })
        .from(appointmentsTable)
        .where(
          and(
            eq(appointmentsTable.clinicId, session.user.clinic.id),
            gte(appointmentsTable.date, fromDate),
            lte(appointmentsTable.date, toDate),
          ),
        ),
      db
        .select({
          total: count(),
        })
        .from(patientsTable)
        .where(eq(patientsTable.clinicId, session.user.clinic.id)),
      db
        .select({
          total: count(),
        })
        .from(doctorsTable)
        .where(eq(doctorsTable.clinicId, session.user.clinic.id)),
    ]);

  return (
    <ReusableContainer>
      <ReusableContainerNav name="Dashboard" />
      <ReusableContainerHeader
        title="Dashboard"
        description="Acesse uma visão geral detalhada das principais métricas e resultados dos pacientes."
        button={<DatePicker />}
      />

      <StartsCard
        totalRevenue={Number(totalRevenue.total) || 0}
        totalAppointments={Number(totalAppointments.total)}
        totalPatients={Number(totalPatients.total)}
        totalDoctors={Number(totalDoctors.total)}
      />
    </ReusableContainer>
  );
}
