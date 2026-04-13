# Créer un code promo (create-discount)

## 1. Description (Quoi ?)

Permet de créer un code de réduction utilisable lors de commandes. L’utilisateur configure le code, le pourcentage, la période de validité, etc. Accessible depuis la page des codes promo.

## 2. Flux global (Front & Backend)

### Frontend

- **Page concernée** : `src/features/promo-codes/pages/PromoCodesPage.tsx`
- **Ouverture du dialogue** : Bouton « Créer un code promo » → `CreateDiscountDialog`
- **Formulaire** : Saisie des infos (code, pourcentage, dates, etc.)
- **Soumission** : Appel à l’API via RTK Query (`useCreateDiscountMutation`)
- **Rafraîchissement** : Mise à jour de la liste via RTK Query

### Backend

- **Endpoint** : POST `/discounts` (voir backend Java)
- **Traitement** :
  - Validation des données reçues
  - Création du code promo en base
  - Retourne le code promo créé ou une erreur

## 3. Fichiers clés

### Frontend

- `src/features/promo-codes/create-discount/components/CreateDiscountDialog.tsx` : UI du formulaire
- `src/features/promo-codes/create-discount/hooks/useCreateDiscountForm.ts` : Logique du formulaire
- `src/features/promo-codes/create-discount/api/createDiscountApi.ts` : Appels API
- `src/features/promo-codes/pages/PromoCodesPage.tsx` : Intégration dans la page

### Backend

- Endpoint `/discounts` (voir code Java)

## 4. Comment modifier les cas courants

- **Ajouter un champ** : Modifier `CreateDiscountDialog.tsx` et le hook de formulaire
- **Changer la validation** : Adapter `useCreateDiscountForm.ts`
- **Modifier l’appel API** : Adapter `createDiscountApi.ts` côté front, et l’endpoint côté backend
- **Changer la logique de rafraîchissement** : Adapter la gestion RTK Query dans la page
