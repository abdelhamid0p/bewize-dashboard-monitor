import { Eye } from "lucide-react";
import { ActionIconButton } from "@/shared/components/atoms/action-icon-button";

interface PromoCodeViewCellProps {
  promoCodeId: string;
  onView?: (promoCodeId: string) => void;
}

export const PromoCodeViewCell = ({
  promoCodeId,
  onView,
}: PromoCodeViewCellProps) => {
  return (
    <ActionIconButton
      icon={<Eye className="size-6" />}
      ariaLabel="View promo code"
      className="text-blue-100 rounded-full"
      onClick={() => onView?.(promoCodeId)}
    />
  );
};
