# Backend – Créer un code promo (create-discount)

### Flux global

```
[POST /discounts] → Contrôleur Discount → Service → Repository → Sauvegarde en base → Retourne le code promo créé
```

### Fichiers clés

| Fichier                 | Rôle                                                                   | Quand le modifier ?                                                         |
| ----------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| DiscountController.java | Gère la route POST `/discounts`, reçoit la requête, appelle le service | Pour changer la logique d’entrée ou ajouter des validations côté contrôleur |
| DiscountService.java    | Contient la logique métier : validation, création, gestion des erreurs | Pour modifier la logique métier ou ajouter des règles                       |
| DiscountRepository.java | Accès à la base de données (CRUD)                                      | Pour changer la structure de stockage ou les requêtes                       |
| Discount.java           | Entité JPA représentant un code promo                                  | Pour ajouter des champs ou changer le mapping                               |

### Comment modifier les cas courants

| Je veux...                       | Où modifier                                                  | Comment                                                                        |
| -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Ajouter un champ au code promo   | Discount.java, DiscountController.java, DiscountService.java | Ajouter le champ dans l’entité, l’inclure dans la requête et la logique métier |
| Changer la validation            | DiscountService.java                                         | Modifier ou ajouter des règles dans le service                                 |
| Changer la structure de la table | Discount.java                                                | Adapter l’entité JPA et faire une migration si besoin                          |
| Modifier la route ou l’URL       | DiscountController.java                                      | Changer l’annotation @RequestMapping ou @PostMapping                           |
| Gérer les erreurs personnalisées | DiscountService.java ou DiscountController.java              | Lever des exceptions personnalisées et gérer la réponse                        |
