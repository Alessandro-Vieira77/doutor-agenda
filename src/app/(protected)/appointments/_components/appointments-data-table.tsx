import { ColumnsTable } from "@/app/(protected)/appointments/_components/table-columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AppointmentsWithPatientAndDoctor } from "./table-columns";

export async function AppointmentsDataTable({
  appointments,
}: {
  appointments: AppointmentsWithPatientAndDoctor[];
}) {
  const columns = await ColumnsTable({ appointments });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Paciente</TableHead>
          <TableHead className="w-[150px]">Médico</TableHead>
          <TableHead className="w-[150px]">Especialidade</TableHead>
          <TableHead className="w-[100px]">Data</TableHead>
          <TableHead className="w-[100px]">Horário</TableHead>
          <TableHead className="w-[100px] text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {columns?.length > 0 ? (
          columns.map((column) => (
            <TableRow key={column.id}>
              <TableCell>{column.patient}</TableCell>
              <TableCell>{column.doctor}</TableCell>
              <TableCell>{column.specialty}</TableCell>
              <TableCell>{column.date}</TableCell>
              <TableCell>{column.time}</TableCell>
              <TableCell className="text-right">{column.cell()}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center font-semibold">
              Nenhum agendamento encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
