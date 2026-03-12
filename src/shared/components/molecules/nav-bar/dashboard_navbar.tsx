import { Button } from "@/shared/components/atoms/button";
import { Icon, ICONS } from "@/shared/components/atoms/icon";
import { Text } from "@/shared/components/atoms/text/text";
import { useExportContext } from "@/shared/context/ExportContext";
import type { NavbarConfig } from "@/features/navigation/constantes/navigation_items";

interface DashboardNavbarProps {
  config: NavbarConfig;
  userName?: string;
}

export const DashboardNavbar = ({ config, userName }: DashboardNavbarProps) => {
  const { triggerExport } = useExportContext();
  const title = userName ? `${config.title}, ${userName}` : config.title;

  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-gray-50">
      {/* Left - Title */}
      <Text variant="title">{title}</Text>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        {/* Date Picker - Only when configured */}
        {config.showDatePicker && (
          <div className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-white rounded-full">
            <Icon name={ICONS.calendarPlus} className="w-4 h-4 text-gray-500" />
            <span>Du Jan 01, 2025 - Feb 01, 2025</span>
          </div>
        )}

        {/* Export Button */}
        {config.showExportButton && (
          <Button
            variant="default"
            className="w-auto px-6 h-9"
            icon={ICONS.upload}
            iconPosition="left"
            onClick={triggerExport}
          >
            Exporter
          </Button>
        )}

        {/* Settings Button */}
        {config.showSettingsButton && (
          <Button
            variant="secondary"
            size="icon"
            className="w-9 h-9 border-gray-200 rounded-full"
          >
            <Icon name={ICONS.settings} className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
