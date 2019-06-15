# Connected Flowers

Projet de première année Ynov Toulouse.
Connected Flowers fournit aussi un objet connecté qui permet de capter l’humidité du sol, la luminosité et la température atmosphérique. 

### Prerequisites

Modifier le fichier user-config.json
Le mot de passe doit contenir au moins 6 caractères

```
{
  "email": "root@gmail.com",
  "password": "root31",
  "id": ""
}
```

Vous devrez connecter l'Arduino avec le Raspberry pi via le cable et connecter le raspberry pi
à votre réseau Internet.

## Deployment

Nous vous livrerons un produit fonctionelle, il suffira uniquement d'éditer le fichier de configuration de l'utilisateur

## Built With

* [Node Serialport](https://github.com/akaJes/node-serialport) - Récupération des données depuis l'arduino
* [Nodemailer](https://github.com/nodemailer/nodemailer) - Envoie de mail en cas de condition critique
* [MJML 4](https://github.com/mjmlio/mjml) - Génération d'un template email
* [fs.c](https://github.com/jwerle/fs.c) - Lecture et écriture dans un fichier
* [Firebase Admin Node.js SDK](https://github.com/firebase/firebase-admin-node) - CRUD base de données Firebase

## Authors

* **Jérémy Escobar** - [JEscobar31](https://github.com/jescobar31)
* **Raphaël Vasseur** - [RVASSEUR31](https://github.com/rvasseur31)
