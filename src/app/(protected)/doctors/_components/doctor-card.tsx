import { Dialog } from "@radix-ui/react-dialog";
import { Calendar1Icon, Clock, DollarSignIcon, ScanHeart } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { numberFormarCentsBR } from "@/helpers/currency";

import { getAvailabilityTime, numberToDay } from "../_helpers/availability";
import { UpsertDoctorForm } from "./upsert-doctor-form";

export const DoctorCard = async ({
  doctor,
}: {
  doctor: typeof doctorsTable.$inferSelect;
}) => {
  const abbreviationName = doctor?.name
    .split(" ")
    .map((word, index) => {
      if (index > 1) return;
      return word[0].toLocaleUpperCase();
    })
    .join("");

  const availability = getAvailabilityTime(doctor);
  const fromDay = numberToDay(doctor.availableFromWeekDay);
  const toDay = numberToDay(doctor.availableToWeekDay);
  const price = numberFormarCentsBR(doctor.appointmentPriceInCents);

  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback>{abbreviationName}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-sm">
          <p>Dr. {doctor?.name}</p>
          <p className="text-muted-foreground flex items-center gap-2">
            <ScanHeart size={26} color="var(--primary)" />
            {doctor?.specialty}
          </p>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-5">
        <Badge variant="outline">
          <Calendar1Icon size={16} />
          <p>
            {fromDay} a {toDay}
          </p>
        </Badge>
        <Badge variant="outline">
          <Clock size={16} />
          <p className="">
            {" "}
            {availability.from.format("HH:mm")} as{" "}
            {availability.to.format("HH:mm")}
          </p>
        </Badge>
        <Badge variant="outline">
          <DollarSignIcon size={16} />
          <p> {price}</p>
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <DialogContent>
            <UpsertDoctorForm />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
