# Créer un abonnement (create-subscription)

## 1. Description (Quoi ?)

Permet d’ajouter manuellement un abonnement à un étudiant via une interface dédiée. L’utilisateur sélectionne un étudiant, configure le type et la durée de l’abonnement, puis valide la création. Cette fonctionnalité est accessible depuis la page des abonnements.

## 2. Flux global (Front & Backend)

### Frontend

- **Page concernée** : `src/features/subscriptions/pages/SubscriptionsPage.tsx`
- **Ouverture du dialogue** : Bouton « Créer un abonnement » → `CreateSubscriptionDialog`
- **Formulaire** : Saisie des infos (étudiant, type, durée, dates, etc.)
- **Soumission** : Appel à l’API via RTK Query (`useCreateManualSubscriptionMutation`)
- **Rafraîchissement** : Mise à jour de la liste via RTK Query

### Backend

- **Endpoint** : POST `/subscriptions/manual` (voir backend Java)
- **Traitement** :
  - Validation des données reçues
  - Création de l’abonnement en base
  - Retourne l’abonnement créé ou une erreur

## 3. Fichiers clés

### Frontend

- `src/features/subscriptions/create-subscription/components/CreateSubscriptionDialog.tsx` : UI du formulaire
- `src/features/subscriptions/create-subscription/hooks/useCreateSubscriptionForm.ts` : Logique du formulaire
- `src/features/subscriptions/create-subscription/api/createSubscriptionApi.ts` : Appels API
- `src/features/subscriptions/pages/SubscriptionsPage.tsx` : Intégration dans la page

### Backend

- Endpoint `/subscriptions/manual` (voir code Java)

## 4. Comment modifier les cas courants

- **Ajouter un champ au formulaire** : Modifier `CreateSubscriptionDialog.tsx` et le hook de formulaire
- **Changer la validation** : Adapter `useCreateSubscriptionForm.ts`
- **Modifier l’appel API** : Adapter `createSubscriptionApi.ts` côté front, et l’endpoint côté backend
- **Changer la logique de rafraîchissement** : Adapter la gestion RTK Query dans la page
