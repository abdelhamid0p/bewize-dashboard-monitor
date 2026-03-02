import { Button } from '../../components/atoms/button';
import { Icon } from '../../components/atoms/icon';
import { ICONS } from '../../components/atoms/icon/iconName.ts';
import { Select } from "../../components/atoms/select"
import { SelectItem } from "../../components/ui/select"
import {Link} from 'react-router-dom';

const  StaticDesignSystemShowcase  = () => {
    return (
        <div className="min-h-screen bg-neutral-100 p-8">
            {/* SECTION BUTTONS */}
            <section className="mb-16 max-w-4xl">
                <Link
                    to="/dynamic_showcase"
                    className="px-4 py-2 text-sm rounded-lg bg-primary-100 text-primary-700"
                >
                    Dynamic ShowCase
                </Link>


                {/* Primary Buttons */}
                <div className="mb-12 bg-white rounded-2xl p-8 shadow-sm">
                    <h2 className="text-lg font-medium mb-6 text-neutral-700">Primary Button</h2>

                    <div className="space-y-6">
                        {/* Default state */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">Default</p>
                            <Button variant="default" >
                                Primary button
                            </Button>
                        </div>

                        {/* With icon left */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">With Icon (Left)</p>
                            <Button
                                variant="default"
                                icon={ICONS.upload}
                                iconPosition="left"
                            >
                                Primary button
                            </Button>
                        </div>

                        {/* With icon right */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">With Icon (Right)</p>
                            <Button
                                variant="default"
                                icon={ICONS.chevronDown}
                                iconPosition="right"
                            >
                                Primary button
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Secondary Buttons */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <h2 className="text-lg font-medium mb-6 text-neutral-700">Secondary Button</h2>

                    <div className="space-y-6">
                        {/* Default state */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">Default</p>
                            <Button variant="secondary">
                                Secondary button
                            </Button>
                        </div>

                        {/* With icon */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">With Icon</p>
                            <Button
                                variant="secondary"
                                icon={ICONS.users}
                                iconPosition="left"
                            >
                                Secondary button
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION FILTER STATES */}
            <section className="mb-16 max-w-4xl">
                <h1 className="text-3xl font-semibold mb-8 text-neutral-900">Filter States</h1>

                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <p className="text-sm text-neutral-600 mb-6 max-w-xl">
                        Filters use color to indicate their state. When a filter is active,
                        it is displayed in purple to highlight that it is applied. When a
                        filter is inactive, it appears in gray, indicating that it is not selected.
                        This visual distinction improves clarity, usability, and overall user experience.
                    </p>

                    <div className="space-y-6">
                        {/* Active state */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">Active State</p>
                            <div className="flex gap-3">
                                <Button
                                    variant="default"
                                    className="w-auto px-6"
                                    icon={ICONS.chevronDown}
                                    iconPosition="right"
                                >
                                    File
                                </Button>
                                <Button
                                    variant="default"
                                    className="w-auto px-6"
                                    icon={ICONS.chevronDown}
                                    iconPosition="right"
                                >
                                    Type d'abonnement
                                </Button>
                            </div>
                        </div>

                        {/* Inactive state */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">Inactive State</p>
                            <div className="flex gap-3">
                                <Button
                                    variant="secondary"
                                    className="w-auto px-6 border-neutral-300 text-neutral-500 hover:bg-neutral-50"
                                    icon={ICONS.chevronDown}
                                    iconPosition="right"
                                >
                                    File
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-auto px-6 border-neutral-300 text-neutral-500 hover:bg-neutral-50"
                                    icon={ICONS.chevronDown}
                                    iconPosition="right"
                                >
                                    Type d'abonnement
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION ICONS */}
            <section className="mb-16 max-w-4xl">
                <h1 className="text-3xl font-semibold mb-8 text-neutral-900">Icons</h1>

                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
                        {Object.entries(ICONS).map(([key, iconName]) => (
                            <div
                                key={key}
                                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors"
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-neutral-100 rounded-lg">
                                    <Icon name={iconName} size={24} color="#1a1a1a" />
                                </div>
                                <span className="text-xs text-neutral-600 text-center">
                  {key}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION ACTION BUTTONS (comme dans l'image 2) */}
            <section className="mb-16 max-w-4xl">
                <h1 className="text-3xl font-semibold mb-8 text-neutral-900">Action Buttons</h1>

                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="space-y-6">
                        {/* Row 1 */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">Primary Actions</p>
                            <div className="flex gap-3 flex-wrap">
                                <Button
                                    variant="default"
                                    className="w-auto px-6"
                                    icon={ICONS.upload}
                                    iconPosition="left"
                                >
                                    Exporter
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-auto px-6"
                                    icon={ICONS.pen}
                                    iconPosition="left"
                                >
                                    Exporter
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-auto px-6"
                                >
                                    Annuler
                                </Button>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">Subscription Actions</p>
                            <div className="flex gap-3 flex-wrap">
                                <Button
                                    variant="secondary"
                                    className="w-auto px-6"
                                >
                                    Créer un abonnement
                                </Button>
                                <Button
                                    variant="default"
                                    className="w-auto px-6"
                                >
                                    Créer un abonnement
                                </Button>
                            </div>
                        </div>

                        {/* Row 3 - Date picker */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">Date Selection</p>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg">
                                    <Icon name={ICONS.calendarPlus} size={16} />
                                    <span className="text-sm text-neutral-700">Du Jan 01, 2025 - Feb 01, 2025</span>
                                </div>
                                <Button
                                    variant="default"
                                    className="w-auto px-6"
                                    icon={ICONS.chevronDown}
                                    iconPosition="right"
                                >
                                    File
                                </Button>
                            </div>
                        </div>

                        {/* Row 4 - Dropdown */}
                        <div>
                            <p className="text-sm text-neutral-500 mb-3">Dropdown Filter</p>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="secondary"
                                    className="w-auto px-6 border-neutral-300 text-neutral-500"
                                    icon={ICONS.chevronDown}
                                    iconPosition="right">
                                    Type d'abonnement
                                </Button>
                                <div className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg">
                                    <Icon name={ICONS.calendarPlus} size={16} />
                                    <span className="text-sm text-neutral-700">Date</span>
                                </div>

                                <div className="flex gap-6 p-10">


                                    <Select label="File" variant="compact"  >
                                        <SelectItem value="import">Import</SelectItem>
                                        <SelectItem value="export">Export</SelectItem>
                                    </Select>

                                    <Select label="Type d'abonnement" variant="default" >
                                        <SelectItem value="import">Import</SelectItem>
                                        <SelectItem value="export">Export</SelectItem>
                                    </Select>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default StaticDesignSystemShowcase ;