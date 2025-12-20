"use client";

import "dayjs/locale/pt-br";

import { addMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import * as React from "react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
  const [open, setOpen] = React.useState(false);

  const [from, setFrom] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(new Date()),
  );

  const [to, setTo] = useQueryState(
    "to",
    parseAsIsoDate.withDefault(addMonths(new Date(), 1)),
  );

  const dateRange = {
    from,
    to,
  };

  const handleDateSelect = (dateRange: DateRange | undefined) => {
    if (dateRange?.from) {
      setFrom(dateRange.from, { shallow: false });
    }
    if (dateRange?.to) {
      setTo(dateRange.to, { shallow: false });
    }
  };

  const formattedDate = (date: Date | undefined) => {
    if (!date) return "";
    return dayjs(date).locale("pt-br").format("DD [de] MMM [de] YYYY");
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="min-w-48 justify-between font-normal"
          >
            {formattedDate(dateRange?.from)} - {formattedDate(dateRange?.to)}
            <CalendarDays />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
