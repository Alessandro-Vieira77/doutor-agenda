import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface reusableContainerNavTypes {
  name: string;
}

interface reusableContainerHeaderTypes {
  title: string;
  description: string;
  button?: ReactNode;
  ButtonOrder?: ReactNode;
  ButtonFilter?: ReactNode;
}

export const ReusableContainer = ({ children }: { children: ReactNode }) => {
  return <div className="w-full space-y-6 px-6 py-2">{children}</div>;
};

export const ReusableContainerNav = ({ name }: reusableContainerNavTypes) => {
  return (
    <div className="flex w-full items-center gap-1">
      <Link
        className="text-muted-foreground text-xs font-semibold"
        href={"/dashboard"}
      >
        Menu Principal
      </Link>
      <ChevronRight size={12} color="var(--primary)" />
      <p className="text-primary text-xs font-semibold">{name}</p>
    </div>
  );
};

export const ReusableContainerHeader = ({
  title,
  description,
  button,
  ButtonOrder,
  ButtonFilter,
}: reusableContainerHeaderTypes) => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 xl:flex-row">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {ButtonOrder}
        {ButtonFilter}
        {button}
      </div>
    </div>
  );
};

export const ReusableContainerContent = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className="w-full">{children}</div>;
};
