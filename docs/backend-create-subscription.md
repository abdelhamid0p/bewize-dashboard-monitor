# Backend – Créer un abonnement (create-subscription)

### Flux global

```
[POST /subscriptions/manual] → SubscriptionController → SubscriptionService → SubscriptionRepository → Sauvegarde en base → Retourne l’abonnement créé
```

### Fichiers clés

| Fichier                     | Rôle                                                                              | Quand le modifier ?                                                         |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| SubscriptionController.java | Gère la route POST `/subscriptions/manual`, reçoit la requête, appelle le service | Pour changer la logique d’entrée ou ajouter des validations côté contrôleur |
| SubscriptionService.java    | Contient la logique métier : validation, création, gestion des erreurs            | Pour modifier la logique métier ou ajouter des règles                       |
| SubscriptionRepository.java | Accès à la base de données (CRUD)                                                 | Pour changer la structure de stockage ou les requêtes                       |
| Subscription.java           | Entité JPA représentant un abonnement                                             | Pour ajouter des champs ou changer le mapping                               |

### Comment modifier les cas courants

| Je veux...                       | Où modifier                                                              | Comment                                                                        |
| -------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Ajouter un champ à l’abonnement  | Subscription.java, SubscriptionController.java, SubscriptionService.java | Ajouter le champ dans l’entité, l’inclure dans la requête et la logique métier |
| Changer la validation            | SubscriptionService.java                                                 | Modifier ou ajouter des règles dans le service                                 |
| Changer la structure de la table | Subscription.java                                                        | Adapter l’entité JPA et faire une migration si besoin                          |
| Modifier la route ou l’URL       | SubscriptionController.java                                              | Changer l’annotation @RequestMapping ou @PostMapping                           |
| Gérer les erreurs personnalisées | SubscriptionService.java ou SubscriptionController.java                  | Lever des exceptions personnalisées et gérer la réponse                        |
