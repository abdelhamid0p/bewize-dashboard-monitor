import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/molecules/dialog";
// Or update the path above to the correct relative or alias path where your Dialog components are actually located.
import { Button } from "@/shared/components/atoms/button";
import { Label } from "@/shared/components/atoms/label/label";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import type { CreateDiscountRequest } from "../../create-discount/model/discount.types";

interface CreateDiscountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateDiscountRequest) => void;
  loading?: boolean;
}

export const CreateDiscountDialog: React.FC<CreateDiscountDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  loading,
}) => {
  const { register, handleSubmit, reset } = useForm<CreateDiscountRequest>();

  const handleClose = () => {
    onOpenChange(false);
    reset();
  };

  const submitForm = (data: CreateDiscountRequest) => {
    // Transforme les dates en LocalDateTime (ajoute T00:00:00 si besoin)
    const toLocalDateTime = (date: string) =>
      date.includes("T") ? date : `${date}T00:00:00`;
    const payload = {
      ...data,
      startDate: toLocalDateTime(data.startDate),
      endDate: toLocalDateTime(data.endDate),
    };
    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Créer une réduction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <div>
            <Label required>Code</Label>
            <Input
              {...register("code", { required: true })}
              placeholder="e.g. SUMMER2025"
            />
          </div>
          <div>
            <Label required>Pourcentage</Label>
            <Input
              type="number"
              min={0}
              max={100}
              {...register("percentage", { required: true })}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label required>Date de début</Label>
              <Input
                type="date"
                {...register("startDate", { required: true })}
              />
            </div>
            <div className="flex-1">
              <Label required>Date de fin</Label>
              <Input type="date" {...register("endDate", { required: true })} />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
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
