import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignInForm } from "./components/sign-in-form";
import { SignUpForm } from "./components/sign-up-form";

export default function AuthenticationPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
          </TabsList>
          <SignInForm />
          <SignUpForm />
        </Tabs>
      </div>
    </div>
  );
}
