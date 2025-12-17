import { useAction } from "next-safe-action/hooks";

import { deleteAppointment } from "@/actions/delete-appointment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteAppointmentProps {
  id: string;
  openDelete?: boolean;
  setOpenDelete?: (open: boolean) => void;
}

export function DeleteAppointment({
  id,
  openDelete,
  setOpenDelete,
}: DeleteAppointmentProps) {
  const deleteAppointmentAction = useAction(deleteAppointment);

  return (
    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Você tem certeza que deseja deletar este agendamento?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteAppointmentAction.execute({ id })}
          >
            {deleteAppointmentAction.isPending ? "Deletando..." : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
