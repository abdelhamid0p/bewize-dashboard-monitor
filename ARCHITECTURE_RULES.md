# Architecture & Refactoring Rules

> Rules and patterns established during the create-discount & student-details refactoring.
> Follow these consistently across all features to maintain quality.

---

## 1. Atomic Design Hierarchy

| Layer         | Location                       | Business Logic? | Purpose                                                                                                    |
| ------------- | ------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------- |
| **Atoms**     | `shared/components/atoms/`     | ❌ Never        | Smallest UI units (Button, Input, Avatar, Badge, InfoField, Label, Text, Icon, StatusIndicator, PlanBadge) |
| **Molecules** | `shared/components/molecules/` | ❌ Never        | Compositions of atoms (FormField, Dialog, EmptyState, InfoFieldGrid)                                       |
| **Organisms** | `shared/components/organisms/` | ❌ Never        | Complex compositions (DataTable, SectionCard, ProfileCard, InfoSection, Pagination, Toolbar)               |
| **Templates** | `shared/components/templates/` | ❌ Never        | Page layouts (AuthLayout, DashboardLayout)                                                                 |
| **Features**  | `features/<name>/components/`  | ✅ Orchestrate  | Compose shared components + pass data from hooks                                                           |

### Key Rule

> **Shared components (atoms → organisms) are PURE presentational.** They receive data via props and render UI. All business logic, data fetching, transformations, and side effects go in feature hooks/services/mappers.

---

## 2. SOLID Principles Applied

### Single Responsibility (SRP)

- **One component = one purpose.** Don't mix data transformation, API calls, or business rules inside a UI component.
- **Example:** Date transformation (`toLocalDateTime`) moved from `CreateDiscountDialog` → `model/date.utils.ts`
- **Example:** Subscription extraction moved from `SubscriptionsTable` → `model/student-details.mapper.ts`

### Open/Closed (OCP)

- Shared components accept `className` prop for extension without modification.
- Use `renderCell` callbacks in DataTable for custom cell rendering per feature.

### Liskov Substitution (LSP)

- All atoms conform to standard HTML element interfaces (+ optional enhancement props).
- `FormField` extends InputProps, `Button` extends ButtonProps.

### Interface Segregation (ISP)

- Components only require the props they actually use.
- `EmptyState` needs just `title` + optional `description` — no unnecessary props.

### Dependency Inversion (DIP)

- Feature components depend on shared component abstractions (atoms/molecules), never on implementation details.
- Data layer (hooks/api) is separated from UI layer (components).

---

## 3. Feature Folder Structure

```
features/<feature-name>/
├── api/                    # RTK Query endpoints
│   └── <name>Api.ts
├── components/             # Feature-specific components (compose shared atoms/molecules)
│   ├── index.ts
│   └── <ComponentName>.tsx
├── hooks/                  # Business logic hooks
│   ├── index.ts
│   ├── use<Feature>.ts          # API wrapper hook
│   └── use<Feature>Form.ts      # Form state hook (if forms exist)
├── model/                  # Types, mappers, utilities
│   ├── <feature>.types.ts
│   ├── <feature>.mapper.ts      # Data transformations
│   └── <feature>.utils.ts       # Pure utility functions
├── pages/                  # Page components (composition only)
│   ├── index.ts
│   └── <Feature>Page.tsx
└── index.ts                # Public API barrel export
```

---

## 4. Component Creation Rules

### When to create a NEW shared component

- The UI pattern is used (or will be used) in **2+ features**
- It is **purely presentational** (no data fetching, no business logic)
- It follows the **atomic hierarchy** (atom → molecule → organism)

### Naming Conventions

| Type     | File name              | Export name    |
| -------- | ---------------------- | -------------- |
| Atom     | `snake_case.tsx`       | `PascalCase`   |
| Molecule | `snake_case.tsx`       | `PascalCase`   |
| Organism | `PascalCase.tsx`       | `PascalCase`   |
| Hook     | `useCamelCase.ts`      | `useCamelCase` |
| Types    | `kebab-case.types.ts`  | named exports  |
| Mapper   | `kebab-case.mapper.ts` | named exports  |
| Utility  | `kebab-case.utils.ts`  | named exports  |

### Every component folder must have:

- `index.ts` barrel export
- Single responsibility component file

---

## 5. Shared Components Catalog

### Atoms

| Component         | File                                          | Props (key)                         |
| ----------------- | --------------------------------------------- | ----------------------------------- |
| `Avatar`          | `atoms/avatar/avatar.tsx`                     | `initials`, `size`, `showStatusDot` |
| `Badge`           | `atoms/badge/badge.tsx`                       | `children`, `variant`               |
| `Button`          | `atoms/button/button.tsx`                     | `variant`, `icon`, `iconPosition`   |
| `InfoField`       | `atoms/info-field/info_field.tsx`             | `label`, `value`                    |
| `Input`           | `atoms/input/Input.tsx`                       | `error`, `helperText`               |
| `Label`           | `atoms/label/label.tsx`                       | `required`                          |
| `Text`            | `atoms/text/text.tsx`                         | `variant`, `as`                     |
| `Icon`            | `atoms/icon/lucidWrapper.tsx`                 | `name`, `variant`                   |
| `Image`           | `atoms/image/image.tsx`                       | `variant`                           |
| `StatusIndicator` | `atoms/status-indicator/status_indicator.tsx` | `label`, `dotColor`, `textColor`    |
| `PlanBadge`       | `atoms/plan-badge/plan_badge.tsx`             | `plan`                              |
| `PercentageBadge` | `atoms/percentage-badge/percentage_badge.tsx` | `percentage`                        |

### Molecules

| Component       | File                                            | Props (key)                        |
| --------------- | ----------------------------------------------- | ---------------------------------- |
| `FormField`     | `molecules/form-field/Form_Field.tsx`           | `label`, `id`, `required`, `error` |
| `Dialog`        | `molecules/dialog.tsx`                          | `open`, `onOpenChange`             |
| `EmptyState`    | `molecules/empty-state/empty_state.tsx`         | `title`, `description`             |
| `InfoFieldGrid` | `molecules/info-field-grid/info_field_grid.tsx` | `fields`, `columns`                |

### Organisms

| Component     | File                                      | Props (key)                          |
| ------------- | ----------------------------------------- | ------------------------------------ |
| `DataTable`   | `organisms/data-table/DataTable.tsx`      | `columns`, `data`, `renderCell`      |
| `Pagination`  | `organisms/data-table/Pagination.tsx`     | `pagination`, `onPageChange`         |
| `ProfileCard` | `organisms/profile-card/profile_card.tsx` | `icon`, `name`, `badges`, `metadata` |
| `InfoSection` | `organisms/info-section/info_section.tsx` | `title`, `fields`, `columns`         |
| `SectionCard` | `organisms/section-card/section_card.tsx` | `title`, `children`                  |

---

## 6. Anti-Patterns to Avoid

| ❌ Don't                                    | ✅ Do Instead                                   |
| ------------------------------------------- | ----------------------------------------------- |
| Put date/data transformation in components  | Create a mapper or utility in `model/`          |
| Use raw `<table>` in feature components     | Use `DataTable` organism                        |
| Hardcode colors/styles inline               | Use design tokens (CSS variables) or atom props |
| Mix form state + API calls in one hook      | Separate `useFeatureForm` from `useFeature`     |
| Create atoms with business logic            | Keep atoms purely presentational                |
| Duplicate UI patterns across features       | Extract to shared atoms/molecules               |
| Use `any` type in components                | Define proper types in `model/*.types.ts`       |
| Filter/transform data inside render methods | Use mappers in `model/*.mapper.ts`              |

---

## 7. Migration Checklist (for future features)

When building or refactoring a feature:

- [ ] Define types in `model/<feature>.types.ts`
- [ ] Create mapper if data transformation needed in `model/<feature>.mapper.ts`
- [ ] Create API layer in `api/<feature>Api.ts`
- [ ] Create hooks: `use<Feature>.ts` (API wrapper), `use<Feature>Form.ts` (if forms)
- [ ] Build feature components using ONLY shared atoms/molecules/organisms
- [ ] Page component only orchestrates: hook → components
- [ ] No business logic in any component — hooks and mappers only
- [ ] Add barrel exports (`index.ts`) at each level
