import { Pencil, Trash2 } from "lucide-react";
import { ActionIconButton } from "@/shared/components/atoms/action-icon-button";

interface PromoCodeActionsCellProps {
  promoCodeId: string;
  onEdit?: (promoCodeId: string) => void;
  onDelete?: (promoCodeId: string) => void;
}

export const PromoCodeActionsCell = ({
  promoCodeId,
  onEdit,
  onDelete,
}: PromoCodeActionsCellProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ActionIconButton
        icon={<Pencil className="size-5" />}
        ariaLabel="Edit promo code"
        className="text-blue-500 rounded-full"
        onClick={() => onEdit?.(promoCodeId)}
      />
      <ActionIconButton
        icon={<Trash2 className="size-5" />}
        ariaLabel="Delete promo code"
        className="text-red-500 rounded-full"
        onClick={() => onDelete?.(promoCodeId)}
      />
    </div>
  );
};
