import * as React from "react";
import { UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/molecules/dialog";
import { Button } from "@/shared/components/atoms/button";
import { FormField } from "@/shared/components/molecules/form-field/Form_Field";
import { useGetStudentsQuery } from "@/features/students/api/studentsApi";
import { useCreateSubscriptionForm } from "../hooks/useCreateSubscriptionForm";
import {
  PLAN_DURATION_OPTIONS,
  type CreateManualSubscriptionRequest,
} from "../model/subscription.types";

interface CreateSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateManualSubscriptionRequest) => void;
  loading?: boolean;
  errorMessage?: string | null;
}

export const CreateSubscriptionDialog: React.FC<
  CreateSubscriptionDialogProps
> = ({ open, onOpenChange, onSubmit, loading = false, errorMessage }) => {
  const { form, transformPayload, resetForm } = useCreateSubscriptionForm();
  const { register, handleSubmit, watch } = form;

  const { data: studentsData, isLoading: studentsLoading } =
    useGetStudentsQuery(
      {
        page: 0,
        size: 1000,
        sort: ["firstName,asc"],
      },
      {
        skip: !open,
      },
    );

  const students = studentsData?.data ?? [];
  const selectedStudentId = watch("studentId");

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  const submitForm = (data: CreateManualSubscriptionRequest) => {
    onSubmit(transformPayload(data));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Creer un abonnement</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="space-y-4 sm:space-y-5 md:space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="subscription-student"
              className="text-sm sm:text-base font-medium text-neutral-700"
            >
              Etudiant
            </label>
            <div className="rounded-[20px] border border-neutral-300 px-2 py-2 max-h-23 overflow-y-auto">
              <select
                id="subscription-student"
                className="w-full bg-transparent text-sm outline-none"
                {...register("studentId", { required: true })}
              >
                <option value="">Selectionner un etudiant</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {`${student.firstName} ${student.lastName} (${student.cne})`}
                  </option>
                ))}
              </select>

              {selectedStudentId && (
                <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                  <UserRound className="h-3.5 w-3.5 text-primary-500" />
                  <span>L abonnement actif sera remplace si necessaire.</span>
                </div>
              )}
            </div>
            {studentsLoading && (
              <p className="text-xs text-neutral-500">
                Chargement des etudiants...
              </p>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="subscription-plan-type"
              className="block mb-1 text-sm sm:text-base font-medium text-neutral-700"
            >
              Duree du plan
            </label>
            <select
              id="subscription-plan-type"
              className="w-full rounded-3xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-primary-500"
              {...register("planType", { required: true })}
            >
              {PLAN_DURATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <FormField
              label="Date de debut"
              id="subscription-start-date"
              type="date"
              {...register("startDate", { required: true })}
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <DialogFooter className="flex justify-end gap-2 sm:gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={loading || studentsLoading}
            >
              {loading ? "Creation..." : "Creer un abonnement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
