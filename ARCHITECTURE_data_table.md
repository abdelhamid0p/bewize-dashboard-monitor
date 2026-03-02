# Architecture des Tables - Guide Simple

## Vue d'ensemble

L'architecture suit un principe simple : **séparation complète entre UI et logique**.

```
┌─────────────────────────────────────────────────────────────┐
│                         FEATURE                              │
│  (students, promo-codes, subscriptions)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   pages/           → Assemblage des composants              │
│   hooks/           → TOUTE la logique (state, API, filters) │
│   config/          → Configuration (colonnes, filtres, etc) │
│   components/      → Composants spécifiques à la feature    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SHARED COMPONENTS                         │
│               (shared/components/data-table)                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   DataTable.tsx    → Tableau générique (UI pure)            │
│   Toolbar.tsx      → Barre de recherche + filtres           │
│   Pagination.tsx   → Navigation entre pages                 │
│   types.ts         → Types partagés                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Structure d'une Feature

Chaque feature (students, promo-codes, subscriptions) suit la même structure :

```
features/
└── students/
    ├── pages/
    │   └── StudentsPage.tsx      # Page principale
    ├── hooks/
    │   └── useStudentsTable.ts   # Hook avec TOUTE la logique
    ├── config/
    │   ├── columns.ts            # Définition des colonnes
    │   ├── filters.ts            # Configuration des filtres
    │   ├── renderers.tsx         # Rendu personnalisé des cellules
    │   ├── mapper.ts             # Transformation API → UI
    │   └── enums.ts              # Labels et constantes
    ├── components/
    │   └── students_actions_menu.tsx  # Menu d'actions
    ├── model/
    │   └── student.types.ts      # Types TypeScript
    └── api/
        └── studentsApi.ts        # Endpoints RTK Query
```

---

## Les 4 Fichiers Clés

### 1. `pages/StudentsPage.tsx` - L'Assembleur

La page ne fait qu'**assembler** les composants. Zéro logique ici.

```tsx
export const StudentsPage = () => {
  // 1. Récupère tout du hook
  const {
    data,
    loading,
    pagination,
    searchTerm,
    setSearchTerm,
    setFilter,
    goToPage,
  } = useStudentsTable({ pageSize: 10 });

  // 2. Assemble les composants
  return (
    <div>
      <Toolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={STUDENTS_FILTERS}
        onFilterChange={setFilter}
      />
      <DataTable
        columns={STUDENTS_COLUMNS}
        data={data}
        renderCell={renderStudentCell}
      />
      <Pagination pagination={pagination} onPageChange={goToPage} />
    </div>
  );
};
```

### 2. `hooks/useStudentsTable.ts` - Le Cerveau

Contient **TOUTE** la logique : état, appels API, filtres, pagination.

**Important** : Chaque changement de filtre ou de recherche déclenche automatiquement une nouvelle requête API via RTK Query.

```tsx
export function useStudentsTable({ pageSize = 10 }) {
  // État local
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  // Appel API - se déclenche automatiquement quand les params changent
  const {
    data: apiData,
    isLoading,
    error,
  } = useGetStudentsQuery({
    page,
    size: pageSize,
    search: searchTerm, // Recherche envoyée à l'API
    ...filters, // Filtres envoyés à l'API
  });

  // Transformation des données
  const data = useMemo(
    () => apiData?.map((student) => mapStudentToUI(student)) ?? [],
    [apiData],
  );

  // Retourne tout ce dont la page a besoin
  return {
    data,
    loading: isLoading,
    pagination: { page, size: pageSize, totalPages, totalElements },
    searchTerm,
    setSearchTerm,
    setFilter: (key, value) =>
      setFilters((prev) => ({ ...prev, [key]: value })),
    goToPage: setPage,
  };
}
```

### 3. `config/columns.ts` - Les Colonnes

Définit quelles colonnes afficher dans le tableau.

```typescript
export const STUDENTS_COLUMNS: Column[] = [
  { key: "name", label: "Nom" },
  { key: "email", label: "Email" },
  { key: "gender", label: "Genre" },
  { key: "level", label: "Niveau" },
  { key: "signupDate", label: "Date d'inscription" },
  { key: "actions", label: "" },
];
```

### 4. `config/renderers.tsx` - Le Rendu

Définit **comment** afficher chaque cellule (icônes, badges, etc.).

```tsx
export const renderStudentCell = (student: StudentUI, columnKey: string) => {
  switch (columnKey) {
    case "name":
      return (
        <div className="flex items-center gap-2">
          <img src={UserIcon} className="w-5 h-5" />
          <span>{student.name}</span>
        </div>
      );
    case "gender":
      return <StatusIndicator label={student.gender} dotColor="blue" />;
    case "actions":
      return <StudentsActionsMenu studentId={student.id} />;
    default:
      return <span>{student[columnKey]}</span>;
  }
};
```

---

## Composants Partagés

### `shared/components/data-table/`

Ces composants sont **purement UI** - ils ne savent rien de students, promo-codes, etc.

| Composant    | Rôle                                        |
| ------------ | ------------------------------------------- |
| `DataTable`  | Affiche un tableau avec colonnes et données |
| `Toolbar`    | Barre de recherche + filtres déroulants     |
| `Pagination` | Boutons de navigation entre pages           |

**Caractéristiques :**

- ✅ Réutilisables partout
- ✅ Props simples et typées
- ✅ Aucune connaissance métier

---

## Flux de Données

### Sélection d'un filtre

```
User Action (clic filtre "Genre" → "Fille")
        │
        ▼
    Toolbar.tsx
        │ appelle onFilterChange("gender", "FEMALE")
        ▼
    Page.tsx
        │ appelle setFilter("gender", "FEMALE")
        ▼
    useStudentsTable.ts
        │ met à jour l'état filters
        │ RTK Query détecte le changement → nouvel appel API
        ▼
    RTK Query (studentsApi.ts)
        │ GET /students?gender=FEMALE
        ▼
    Backend Response
        │
        ▼
    mapStudentToUI()
        │ transforme les données
        ▼
    DataTable reçoit les nouvelles données
        │
        ▼
    UI mise à jour
```

### Recherche

```
User Action (tape "Ahmed" dans la recherche)
        │
        ▼
    Toolbar.tsx
        │ appelle onSearchChange("Ahmed")
        ▼
    Page.tsx
        │ appelle setSearchTerm("Ahmed")
        ▼
    useStudentsTable.ts
        │ met à jour searchTerm
        │ RTK Query détecte le changement → nouvel appel API
        ▼
    RTK Query (studentsApi.ts)
        │ GET /students?search=Ahmed
        ▼
    Backend Response → mapStudentToUI() → UI mise à jour
```

---

## Ajouter une Nouvelle Feature

Pour créer une nouvelle table (ex: `orders`) :

1. **Créer la structure de dossiers**

```
features/orders/
├── pages/OrdersPage.tsx
├── hooks/useOrdersTable.ts
├── config/
│   ├── columns.ts
│   ├── filters.ts
│   ├── renderers.tsx
│   └── mapper.ts
└── api/ordersApi.ts
```

2. **Copier-coller** depuis une feature existante

3. **Adapter** les colonnes, filtres et renderers

4. **Créer** l'endpoint API dans `api/ordersApi.ts`

---

## Règles d'Or

| ❌ NE PAS FAIRE                 | ✅ FAIRE                         |
| ------------------------------- | -------------------------------- |
| Logique dans les composants UI  | Logique dans les hooks           |
| `useState` dans `DataTable.tsx` | `useState` dans `useXxxTable.ts` |
| Appels API dans les pages       | Appels API dans les hooks        |
| Styles inline complexes         | Classes Tailwind                 |
| Types `any`                     | Types stricts (StudentUI, etc.)  |

---

## Résumé

```
Page     = Assembleur (colle les pièces)
Hook     = Cerveau (gère tout)
Config   = Recette (colonnes, filtres, rendu)
Shared   = Outils réutilisables (UI pure)
```

Cette architecture permet :

- 🔄 **Réutilisation** : Les composants Data-Table servent partout
- 🧪 **Testabilité** : Logique isolée dans les hooks
- 📦 **Maintenabilité** : Chaque fichier a une seule responsabilité
- 🚀 **Rapidité** : Créer une nouvelle table en copiant une existante
