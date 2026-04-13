# Backend – Détails étudiant (student-details)

### Flux global

```
[GET /students/{studentId}] → StudentController → StudentService → StudentRepository → Récupère l’étudiant et ses données associées → Retourne les infos
```

### Fichiers clés

| Fichier                | Rôle                                                                                   | Quand le modifier ?                                                         |
| ---------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| StudentController.java | Gère la route GET `/students/{studentId}`, reçoit la requête, appelle le service       | Pour changer la logique d’entrée ou ajouter des validations côté contrôleur |
| StudentService.java    | Contient la logique métier : récupération, agrégation des données, gestion des erreurs | Pour modifier la logique métier ou enrichir les données retournées          |
| StudentRepository.java | Accès à la base de données (CRUD)                                                      | Pour changer la structure de stockage ou les requêtes                       |
| Student.java           | Entité JPA représentant un étudiant                                                    | Pour ajouter des champs ou changer le mapping                               |

### Comment modifier les cas courants

| Je veux...                            | Où modifier                                               | Comment                                                                        |
| ------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Ajouter une info à l’étudiant         | Student.java, StudentController.java, StudentService.java | Ajouter le champ dans l’entité, l’inclure dans la réponse et la logique métier |
| Changer la validation ou l’agrégation | StudentService.java                                       | Modifier la logique métier ou la composition des données                       |
| Changer la structure de la table      | Student.java                                              | Adapter l’entité JPA et faire une migration si besoin                          |
| Modifier la route ou l’URL            | StudentController.java                                    | Changer l’annotation @RequestMapping ou @GetMapping                            |
| Gérer les erreurs personnalisées      | StudentService.java ou StudentController.java             | Lever des exceptions personnalisées et gérer la réponse                        |
