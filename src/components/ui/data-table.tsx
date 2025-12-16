import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./data-table";
export { columns } from "../../app/(protected)/patients/_components/table-colums";

export function DataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
          <TableHead className="w-[100px]">Email</TableHead>
          <TableHead className="w-[100px]">Telefone</TableHead>
          <TableHead className="w-[100px]">Sexo</TableHead>
          <TableHead className="w-[100px] text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {columns?.map((column) => (
          <TableRow key={column.name as string}>
            <TableCell>{column.name}</TableCell>
            <TableCell>{column.email}</TableCell>
            <TableCell>{column.phoneNumber}</TableCell>
            <TableCell>{column.sex()}</TableCell>
            <TableCell className="text-right">{column.cell()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
