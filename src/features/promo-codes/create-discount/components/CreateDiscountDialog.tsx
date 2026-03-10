import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/molecules/dialog";
import { Button } from "@/shared/components/atoms/button";
import { FormField } from "@/shared/components/molecules/form-field/Form_Field";
import { useCreateDiscountForm } from "../hooks/useCreateDiscountForm";
import type { CreateDiscountRequest } from "../model/discount.types";

interface CreateDiscountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateDiscountRequest) => void;
  loading?: boolean;
}

/**
 * CreateDiscountDialog - Feature component for creating a discount.
 * Uses shared atoms/molecules for UI (FormField, Button, Dialog).
 * Delegates form state to useCreateDiscountForm hook (SRP).
 */
export const CreateDiscountDialog: React.FC<CreateDiscountDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  loading,
}) => {
  const { form, transformPayload, resetForm } = useCreateDiscountForm();
  const { register, handleSubmit } = form;

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  const submitForm = (data: CreateDiscountRequest) => {
    onSubmit(transformPayload(data));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une réduction</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="space-y-4 sm:space-y-5 md:space-y-6"
        >
          <div className="w-full sm:w-1/2">
            <FormField
              label="Code"
              id="discount-code"
              placeholder="e.g. SUMMER2025"
              {...register("code", { required: true })}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <FormField
              label="Pourcentage"
              id="discount-percentage"
              type="number"
              min={0}
              max={100}
              placeholder="0"
              {...register("percentage", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
            <div className="flex-1">
              <FormField
                label="Date de début"
                id="discount-start-date"
                type="date"
                {...register("startDate", { required: true })}
              />
            </div>

            <div className="flex-1">
              <FormField
                label="Date de fin"
                id="discount-end-date"
                type="date"
                {...register("endDate", { required: true })}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2 sm:gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" variant="default" disabled={loading}>
              Créer la réduction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
