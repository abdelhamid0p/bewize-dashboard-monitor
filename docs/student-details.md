# Détails étudiant (student-details)

## 1. Description (Quoi ?)

Affiche la fiche détaillée d’un étudiant : infos personnelles, commandes, abonnements, etc. Permet de visualiser l’historique et l’état de l’étudiant. Accessible depuis la liste des étudiants.

## 2. Flux global (Front & Backend)

### Frontend

- **Page concernée** : `src/features/students/student-details/pages/StudentDetailsPage.tsx`
- **Chargement** : Récupération de l’ID étudiant via l’URL
- **Appel API** : `useStudentDetails` (hook) → `useGetStudentDetailsQuery` (RTK Query)
- **Affichage** :
  - `StudentInfoCard` : infos principales
  - `StudentDetailsFields` : détails complémentaires
  - `OrdersTable` : commandes
  - `SubscriptionsTable` : abonnements

### Backend

- **Endpoint** : GET `/students/{studentId}` (voir backend Java)
- **Traitement** :
  - Recherche de l’étudiant et de ses données associées
  - Retourne toutes les infos nécessaires à l’affichage

## 3. Fichiers clés

### Frontend

- `src/features/students/student-details/pages/StudentDetailsPage.tsx` : Page principale
- `src/features/students/student-details/components/StudentInfoCard.tsx` : Infos principales
- `src/features/students/student-details/components/OrdersTable.tsx` : Commandes
- `src/features/students/student-details/components/SubscriptionsTable.tsx` : Abonnements
- `src/features/students/student-details/api/studentDetailsApi.ts` : Appel API

### Backend

- Endpoint `/students/{studentId}` (voir code Java)

## 4. Comment modifier les cas courants

- **Ajouter une info affichée** : Modifier les composants concernés (ex : `StudentInfoCard.tsx`)
- **Changer la structure des données** : Adapter le mapping dans le front et la réponse backend
- **Ajouter une section (ex : nouveaux tableaux)** : Créer un composant et l’intégrer dans `StudentDetailsPage.tsx`
