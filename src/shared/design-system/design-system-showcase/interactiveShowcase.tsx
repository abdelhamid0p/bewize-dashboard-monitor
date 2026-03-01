import { useState } from "react";
import { Button } from "@/shared/components/atoms/button";
import { Icon } from "@/shared/components/atoms/icon";
import {
  ICONS,
  type IconName,
} from "@/shared/components/atoms/icon/iconName.ts";
import { Link } from "react-router-dom";

const InteractiveShowcase = () => {
  const [selectedVariant, setSelectedVariant] = useState<
    "default" | "secondary"
  >("default");
  const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(
    ICONS.upload,
  );
  const [iconPosition, setIconPosition] = useState<"left" | "right">("left");
  const [buttonText, setButtonText] = useState("Primary button");

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-8 py-6">
        <Link
          to="/static_showcase"
          className="px-4 py-2 text-sm rounded-lg bg-primary-100 text-primary-700"
        >
          Static ShowCase
        </Link>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Design System Showcase
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Visualisation interactive des composants
        </p>
      </header>

      <div className="p-8">
        {/* Interactive Playground */}
        <section className="mb-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-neutral-200 px-8 py-4 bg-neutral-50">
              <h2 className="text-lg font-semibold text-neutral-900">
                Button Playground
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Preview */}
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-neutral-700 mb-4">
                  Aperçu
                </h3>
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-12 border border-neutral-200">
                  <Button
                    variant={selectedVariant}
                    icon={selectedIcon}
                    iconPosition={iconPosition}
                  >
                    {buttonText}
                  </Button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col space-y-6">
                <h3 className="text-sm font-medium text-neutral-700">
                  Contrôles
                </h3>

                {/* Text Input */}
                <div>
                  <label className="block text-sm text-neutral-600 mb-2">
                    Texte
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Variant Select */}
                <div>
                  <label className="block text-sm text-neutral-600 mb-2">
                    Variant
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedVariant("default")}
                      className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                        selectedVariant === "default"
                          ? "bg-primary-500 text-white border-primary-500"
                          : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      Primary
                    </button>
                    <button
                      onClick={() => setSelectedVariant("secondary")}
                      className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                        selectedVariant === "secondary"
                          ? "bg-primary-500 text-white border-primary-500"
                          : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      Secondary
                    </button>
                  </div>
                </div>

                {/* Icon Select */}
                <div>
                  <label className="block text-sm text-neutral-600 mb-2">
                    Icône
                  </label>
                  <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border border-neutral-200 rounded-lg">
                    <button
                      onClick={() => setSelectedIcon(undefined)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selectedIcon === undefined
                          ? "bg-primary-100 border-primary-500"
                          : "bg-white border-neutral-200 hover:bg-neutral-50"
                      }`}
                    >
                      <span className="text-xs">None</span>
                    </button>
                    {Object.entries(ICONS).map(([key, iconName]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedIcon(iconName)}
                        className={`p-3 rounded-lg border transition-colors ${
                          selectedIcon === iconName
                            ? "bg-primary-100 border-primary-500"
                            : "bg-white border-neutral-200 hover:bg-neutral-50"
                        }`}
                        title={key}
                      >
                        <Icon name={iconName} size={20} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon Position */}
                {selectedIcon && (
                  <div>
                    <label className="block text-sm text-neutral-600 mb-2">
                      Position de l'icône
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIconPosition("left")}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          iconPosition === "left"
                            ? "bg-primary-500 text-white border-primary-500"
                            : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                        }`}
                      >
                        Gauche
                      </button>
                      <button
                        onClick={() => setIconPosition("right")}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          iconPosition === "right"
                            ? "bg-primary-500 text-white border-primary-500"
                            : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                        }`}
                      >
                        Droite
                      </button>
                    </div>
                  </div>
                )}

                {/* Code Preview */}
                <div>
                  <label className="block text-sm text-neutral-600 mb-2">
                    Code
                  </label>
                  <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg text-xs overflow-x-auto">
                    {`<Button
  variant="${selectedVariant}"${selectedIcon ? `\n  icon={ICONS.${Object.entries(ICONS).find(([, v]) => v === selectedIcon)?.[0]}}` : ""}${selectedIcon ? `\n  iconPosition="${iconPosition}"` : ""}
>
  ${buttonText}
</Button>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Variants Overview */}
        <section className="mb-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">
              Toutes les variantes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Primary */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-700">
                  Primary Button
                </h3>
                <div className="space-y-3 p-6 bg-neutral-50 rounded-xl">
                  <Button variant="default">Sans icône</Button>
                  <Button variant="default" icon={ICONS.upload}>
                    Avec icône gauche
                  </Button>
                  <Button
                    variant="default"
                    icon={ICONS.chevronDown}
                    iconPosition="right"
                  >
                    Avec icône droite
                  </Button>
                  <Button variant="default" disabled>
                    Désactivé
                  </Button>
                </div>
              </div>

              {/* Secondary */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-700">
                  Secondary Button
                </h3>
                <div className="space-y-3 p-6 bg-neutral-50 rounded-xl">
                  <Button variant="secondary">Sans icône</Button>
                  <Button variant="secondary" icon={ICONS.users}>
                    Avec icône gauche
                  </Button>
                  <Button
                    variant="secondary"
                    icon={ICONS.chevronDown}
                    iconPosition="right"
                  >
                    Avec icône droite
                  </Button>
                  <Button variant="secondary" disabled>
                    Désactivé
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Icon Library */}
        <section className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">
              Bibliothèque d'icônes
            </h2>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {Object.entries(ICONS).map(([key, iconName]) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-neutral-50 transition-colors group cursor-pointer"
                  title={iconName}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-lg group-hover:bg-primary-100 transition-colors">
                    <Icon name={iconName} size={20} />
                  </div>
                  <span className="text-xs text-neutral-600 text-center truncate w-full">
                    {key}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InteractiveShowcase;
