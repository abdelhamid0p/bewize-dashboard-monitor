# Contrat API Data Table (Backend <-> Front)

Ce document fige le mapping entre le front (tables) et les endpoints backend `/datatable/*`.

## Règles globales

- Tous les endpoints listent des données paginées: `PageResponse<T>`.
- Le front envoie `fields` (colonnes demandées) pour limiter les données renvoyées.
- Le champ technique `id` doit toujours etre present pour les actions UI (view/edit/delete), meme s'il n'est pas une colonne visible.
- Le tri/pagination utilisent les params standards Spring: `page`, `size`, `sort`.
- Les options de filtres sont fournies par le backend via `/filters`.

## 1) Students Data Table

### Endpoint data

- `GET /datatable/students`

#### Query params

- `page`, `size`, `sort`
- `fields` (multi valeur)
- `search`
- `gender`
- `cycle`
- `level`
- `type`
- `planType`

#### Fields supportes

- `id` (technique)
- `name`
- `phone`
- `subscriptionType`
- `planType`
- `deviceSystem`
- `gender`
- `signupDate`
- `level`

### Endpoint filtres

- `GET /datatable/students/filters`

#### Clés filtres attendues

- `gender`
- `deviceType`
- `level`
- `type`
- `planType`

## 2) Orders Data Table

### Endpoint data

- `GET /datatable/orders`

#### Query params

- `page`, `size`, `sort`
- `fields` (multi valeur)
- `status`
- `planType`
- `search`

#### Fields supportes

- `id`
- `student`
- `plan`
- `type`
- `paymentMethod`
- `status`
- `date`

### Endpoint filtres

- `GET /datatable/orders/filters`

#### Clés filtres attendues

- `status`
- `planType`

## 3) Promo Codes (Discounts) Data Table

### Endpoint data

- `GET /datatable/discounts`

#### Query params

- `page`, `size`, `sort`
- `fields` (multi valeur)
- `active`
- `code`
- `percentage`
- `search`
- `startDate` (ISO date: `YYYY-MM-DD`)
- `endDate` (ISO date: `YYYY-MM-DD`)

#### Fields supportes

- `id` (technique)
- `code`
- `startDate`
- `endDate`
- `percentage`
- `status`

### Endpoint filtres

- `GET /datatable/discounts/filters`

#### Clés filtres attendues

- `active`
- `code`
- `percentage`

## 4) Subscriptions Data Table

### Endpoint data

- `GET /datatable/subscriptions`

#### Query params

- `page`, `size`, `sort`
- `fields` (multi valeur)
- `orderId`
- `active`
- `status`
- `type`
- `planType`
- `search`
- `startDate` (ISO date: `YYYY-MM-DD`)
- `endDate` (ISO date: `YYYY-MM-DD`)

#### Fields supportes

- `id` (technique)
- `cne`
- `startDate`
- `endDate`
- `planType`
- `subscriptionType`
- `status`

### Endpoint filtres

- `GET /datatable/subscriptions/filters`

#### Clés filtres attendues

- `status`
- `type`
- `planType`

## Format de reponse des options de filtres

```json
{
  "status": [
    { "label": "Actif", "value": "ACTIVE" },
    { "label": "Inactif", "value": "INACTIVE" }
  ],
  "planType": [
    { "label": "Freemium", "value": "FREEMIUM" },
    { "label": "Premium", "value": "PREMIUM" }
  ]
}
```

## Notes d'implementation front

- Le front doit remplacer les `options` statiques quand `GET /filters` retourne des valeurs.
- Fallback autorise: si backend ne retourne pas une clé, garder les options statiques de la config.
- Les filtres de type date-range restent configures cote front (clé `fromKey`/`toKey`), seules les options select viennent du backend.
