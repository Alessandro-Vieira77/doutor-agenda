import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  ReusableContainer,
  ReusableContainerHeader,
  ReusableContainerNav,
} from "@/components/reusables-containers";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  return (
    <ReusableContainer>
      <ReusableContainerNav name="Assinatura" />
      <ReusableContainerHeader
        title="Assinatura"
        description="Gerencie a sua assinatura."
      />
      <SubscriptionPlan
        className="max-w-[350px]"
        active={session.user.plan === "essential"}
        userEmail={session.user.email}
      />
    </ReusableContainer>
  );
};
export default SubscriptionPage;
