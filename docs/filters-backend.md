# Filtres – Backend

### Flux global

```
[GET /feature?filter1=...&filter2=...] → Controller → Service → Repository → Génère la requête SQL/JPA avec les filtres → Retourne les données filtrées
```

### Fichiers clés

| Fichier                | Rôle                                                        | Quand le modifier ?                                      |
| ---------------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| FeatureController.java | Récupère les paramètres de filtre depuis la requête         | Pour ajouter ou modifier la gestion des filtres côté API |
| FeatureService.java    | Applique la logique métier sur les filtres                  | Pour ajouter des règles ou transformer les filtres       |
| FeatureRepository.java | Construit la requête filtrée (JPA Criteria, QueryDSL, etc.) | Pour ajouter de nouveaux filtres ou optimiser la requête |
| Feature.java           | Entité JPA, structure des champs filtrables                 | Pour ajouter un champ filtrable                          |

### Comment modifier les cas courants

| Je veux...                           | Où modifier                             | Comment                                                          |
| ------------------------------------ | --------------------------------------- | ---------------------------------------------------------------- |
| Ajouter un filtre                    | Controller, Service, Repository, Entité | Ajouter le paramètre, le transmettre, et l’intégrer à la requête |
| Changer la logique de filtrage       | Service, Repository                     | Modifier la logique métier ou la requête                         |
| Optimiser la performance des filtres | Repository                              | Utiliser des indexes, optimiser la requête SQL/JPA               |
