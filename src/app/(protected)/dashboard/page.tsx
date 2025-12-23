"use server";

import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { Calendar } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  ReusableContainer,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboard } from "@/data/get-dashboard";
import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AppointmentsDataTable } from "../appointments/_components/appointments-data-table";
import AppointmentsChart from "./_components/appointments-charts";
import { DatePicker } from "./_components/date-picker";
import { StartsCard } from "./_components/starts-card";
import TopDoctors from "./_components/top-doctors";
import TopSpecialties from "./_components/top-especialties";

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
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  if (!session.user.plan) {
    redirect("/new-subscription");
  }

  const clinic = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinic.length === 0) {
    return redirect("/clinic-form");
  }
  const { from, to } = await searchParams;

  if (!from || !to) {
    redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
    );
  }

  const {
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    topDoctors,
    topSpecialties,
    todayAppointments,
    dailyAppointmentsData,
  } = await getDashboard({
    from,
    to,
    session: {
      user: {
        clinic: {
          id: session.user.clinic.id,
        },
      },
    },
  });

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
      <div className="grid grid-cols-[2.25fr_1fr] gap-4">
        <AppointmentsChart dailyAppointmentsData={dailyAppointmentsData} />
        <TopDoctors doctors={topDoctors} />
      </div>
      <div className="grid grid-cols-[2.25fr_1fr] gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Calendar className="text-muted-foreground" />
              <CardTitle className="text-base">Agendamentos de hoje</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <AppointmentsDataTable appointments={todayAppointments} />
          </CardContent>
        </Card>
        <TopSpecialties topSpecialties={topSpecialties} />
      </div>
    </ReusableContainer>
  );
}
