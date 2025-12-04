"use server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  ReusableContainer,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { ButtonSignOut } from "./components/buttonSignOut";

export default async function DashboardPage() {
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

  return (
    <ReusableContainer>
      <ReusableContainerNav name="Dashboard" />
      <ReusableContainerHeader
        title="Dashboard"
        description="Acesse uma visão geral detalhada das principais métricas e resultados dos pacientes."
      />
      <h1>Dashboard</h1>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <Image
        className="rounded-full"
        src={session?.user?.image as string}
        alt="image-profile"
        width={48}
        height={48}
      />
      <ButtonSignOut />
      <h2>ok</h2>
    </ReusableContainer>
  );
}
