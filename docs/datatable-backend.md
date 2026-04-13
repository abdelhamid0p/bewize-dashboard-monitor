# DataTable – Backend (Architecture et Flux)

### Flux global

```
[GET /feature?page=1&size=20&sort=...&filters=...] → Controller → Service → Repository → Génère la requête paginée et filtrée → Retourne un objet paginé (Page<T>)
```

### Explication du flux

- Le contrôleur reçoit les paramètres de pagination, tri et filtres depuis la requête HTTP.
- Le service applique la logique métier (ex : droits d’accès, enrichissement des données).
- Le repository construit la requête (JPA, QueryDSL, SQL natif…) avec pagination et filtres.
- La base de données retourne les résultats paginés.
- Le contrôleur renvoie un objet de type `Page<T>` ou équivalent (total, page courante, données).

### Fichiers clés

| Fichier                | Rôle                                                         | Quand le modifier ?                                                  |
| ---------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------- |
| FeatureController.java | Gère la route GET, reçoit les paramètres, appelle le service | Pour changer la gestion des paramètres ou la structure de la réponse |
| FeatureService.java    | Logique métier, validation, transformation des résultats     | Pour enrichir ou filtrer les données avant retour                    |
| FeatureRepository.java | Génère la requête paginée et filtrée                         | Pour optimiser la requête ou ajouter des critères                    |
| Feature.java           | Entité JPA, structure des données                            | Pour ajouter des champs ou changer le mapping                        |

### Comment modifier les cas courants

| Je veux...                           | Où modifier                     | Comment                                                         |
| ------------------------------------ | ------------------------------- | --------------------------------------------------------------- |
| Changer la taille de page par défaut | Controller ou Service           | Modifier la valeur par défaut du paramètre `size`               |
| Ajouter un tri ou un filtre          | Controller, Service, Repository | Ajouter le paramètre, le transmettre et l’intégrer à la requête |
| Changer la structure de la réponse   | Controller                      | Adapter l’objet retourné (ex : ajouter des métadonnées)         |
