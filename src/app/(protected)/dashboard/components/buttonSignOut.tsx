"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function ButtonSignOut() {
  const router = useRouter();
  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  }

  return <Button onClick={handleSignOut}>Logout</Button>;
}
