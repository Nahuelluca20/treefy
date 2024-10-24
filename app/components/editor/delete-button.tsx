import { DialogTrigger } from "react-aria-components";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { AlertDialog } from "../ui/AlertDialog";
import { useFetcher } from "@remix-run/react";
import { Trash2 } from "lucide-react";
export default function DeleteButton({ actionType }: { actionType: string }) {
  const fetcher = useFetcher();

  return (
    <div>
      <DialogTrigger>
        <Button
          variant="icon"
          name="intent"
          className="p-2 rounded-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
          aria-label="Delete note"
        >
          <Trash2 className="h-5 w-5" />
        </Button>

        <Modal>
          <AlertDialog
            actionLabel="Delete"
            title="Delete note"
            variant="destructive"
            buttonAction={
              <fetcher.Form method="post" action={actionType}>
                <Button
                  variant="destructive"
                  type="submit"
                  name="intent"
                  value="delete"
                  aria-label="Delete note"
                >
                  Delete
                </Button>
              </fetcher.Form>
            }
          >
            Are you sure you want to delete this Note? All content will be
            permanently destroyed.
          </AlertDialog>
        </Modal>
      </DialogTrigger>
    </div>
  );
}
