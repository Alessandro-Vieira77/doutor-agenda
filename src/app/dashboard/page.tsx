"use server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    <div>
      <h1>Dashboard</h1>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <ButtonSignOut />
    </div>
  );
}
