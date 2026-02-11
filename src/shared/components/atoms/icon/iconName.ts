export const ICONS = {
    upload: 'Upload' as const,
    users: 'Users' as const,
    trash: 'Trash2' as const,
    fileText: 'FileText' as const,
    tag: 'Tags' as const, //pas comme figma (.)
    settings: 'Settings2' as const,
    pen: 'Pen' as const,
    calendarPlus: 'CalendarPlus' as const,
    focus: 'Focus' as const,//Comme figma ou non
    store: 'Store' as const,
    cloudLightning: 'CloudLightning' as const,
    chevronDown: 'ChevronDown' as const,
    shoppingCart: 'ShoppingCart' as const,
    layoutGrid: 'LayoutGrid' as const, //pas comme figma
    eye: 'Eye' as const,
};

export type IconName = typeof ICONS[keyof typeof ICONS];
