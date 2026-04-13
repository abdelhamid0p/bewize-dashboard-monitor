# Filtres – Frontend

### Flux global

```
[User modifie un filtre (UI DataTable)] → setFilter() → State local ou Redux → Appel API (RTK Query) avec les filtres → Rafraîchit la DataTable
```

### Fichiers clés

| Fichier                                 | Rôle                                                                | Quand le modifier ?                                                       |
| --------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| config/filters.ts                       | Définit la liste et la structure des filtres (label, type, options) | Pour ajouter, retirer ou modifier un filtre                               |
| hooks/use[Feature]Table.ts              | Gère l’état des filtres, la pagination, l’appel API                 | Pour changer la logique de gestion des filtres ou leur mapping vers l’API |
| pages/[Feature]Page.tsx                 | Intègre la DataTable, Toolbar, et gère les callbacks de filtre      | Pour modifier l’intégration ou le comportement global                     |
| shared/components/organisms/data-table/ | Composants DataTable et Toolbar (UI des filtres)                    | Pour changer l’apparence ou le comportement des filtres                   |

### Comment modifier les cas courants

| Je veux...                       | Où modifier                             | Comment                                                                   |
| -------------------------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| Ajouter un filtre                | config/filters.ts, use[Feature]Table.ts | Ajouter le filtre dans la config et gérer sa prise en compte dans le hook |
| Changer le type d’un filtre      | config/filters.ts                       | Modifier le champ `type` (ex: select, date-range, text)                   |
| Modifier le mapping filtre → API | use[Feature]Table.ts                    | Adapter la transformation des filtres avant l’appel API                   |
| Ajouter des options dynamiques   | config/filters.ts, use[Feature]Table.ts | Récupérer les options via une requête et les injecter dans la config      |
