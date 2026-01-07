import { Calendar, CircleDollarSign, Stethoscope, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StartsCardProps {
  totalRevenue: number;
  totalAppointments: number;
  totalPatients: number;
  totalDoctors: number;
}

export const StartsCard = ({
  totalRevenue,
  totalAppointments,
  totalPatients,
  totalDoctors,
}: StartsCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value / 100);
  };

  const stats = [
    {
      title: "Faturamento",
      value: formatCurrency(totalRevenue),
      icon: CircleDollarSign,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Agendamentos",
      value: totalAppointments,
      icon: Calendar,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Pacientes",
      value: totalPatients,
      icon: Users,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Médicos",
      value: totalDoctors,
      icon: Stethoscope,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className={`rounded-full p-2 ${stat.iconBg} mr-2`}>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
            <CardTitle className="text-muted-foreground text-sm font-medium">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
