# Services - Architecture de l'API

Ce dossier contient les services partagés de l'application, principalement la configuration de base pour RTK Query.

## Structure

```
shared/
├── services/
│   ├── baseApi.ts          # Configuration de base RTK Query
│   └── README.md           # Ce fichier
└── storage/
    └── authStorage.ts      # Gestion du stockage du token JWT
```

## Configuration de base (baseApi.ts)

Le fichier `baseApi.ts` configure RTK Query avec :

- **Base URL** : Définie via `VITE_API_BASE_URL` dans `.env`
- **Auth Headers** : Ajoute automatiquement le token JWT à chaque requête
- **Tag Types** : Types de cache pour l'invalidation automatique
- **Options par défaut** : Refetch automatique et gestion du cache

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_BASE_URL=http://localhost:8083
```

## Utilisation

### 1. Créer un nouveau service API

Créez un fichier dans votre feature, par exemple `features/orders/infrastructure/ordersApi.ts` :

```typescript
import { baseApi } from "@/shared/services/baseApi";
import type { YourRequestType, YourResponseType } from "../domain/types";

export const myFeatureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query<YourResponseType, YourRequestType>({
      query: (params) => ({
        url: "/your-endpoint",
        method: "GET",
        params,
      }),
      providesTags: ["YourTagType"],
    }),

    createData: builder.mutation<YourResponseType, YourRequestType>({
      query: (data) => ({
        url: "/your-endpoint",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["YourTagType"],
    }),
  }),
});

export const { useGetDataQuery, useCreateDataMutation } = myFeatureApi;
```

### 2. N'oubliez pas d'ajouter votre tag type

Dans [baseApi.ts](baseApi.ts), ajoutez votre nouveau tag type :

```typescript
tagTypes: ['User', 'Auth', 'Order', 'YourNewTagType'],
```

### 3. Utiliser dans un composant

```typescript
import { useGetDataQuery } from '@/features/your-feature/infrastructure/yourApi';

function MyComponent() {
  const { data, isLoading, error } = useGetDataQuery({ id: 1 });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur</div>;

  return <div>{data.name}</div>;
}
```

## Avantages de RTK Query

✅ **Cache automatique** : Pas besoin de gérer manuellement l'état de chargement  
✅ **Refetch intelligent** : Mise à jour automatique lors de reconnexion ou focus  
✅ **Invalidation de cache** : Mise à jour automatique des données liées  
✅ **TypeScript** : Typage complet des requêtes et réponses  
✅ **DevTools** : Intégration avec Redux DevTools pour le debugging

## Migration depuis fetch/axios

Pour migrer un appel API existant :

**Avant (fetch vanilla)** :

```typescript
export class HttpRepository implements Repository {
  async getData(params: Params): Promise<Response> {
    const response = await fetch(`${API_URL}/endpoint?${params}`);
    return response.json();
  }
}
```

**Après (RTK Query)** :

```typescript
export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query<Response, Params>({
      query: (params) => ({ url: "/endpoint", params }),
    }),
  }),
});
```

## Ressources

- [Documentation RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Guide des mutations](https://redux-toolkit.js.org/rtk-query/usage/mutations)
- [Cache et invalidation](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching)
