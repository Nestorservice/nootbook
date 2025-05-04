# 📓 Application de Notes

Bienvenue dans l'Application de Notes ! Il s'agit d'une application simple, intuitive et moderne construite avec **React**. Elle permet de gérer efficacement vos notes grâce à des fonctionnalités complètes comme l'ajout, l'affichage, la modification, la suppression et la consultation détaillée de chaque note.

---

## 🛠 Fonctionnalités

- **➕ Ajouter une note** : Créez facilement de nouvelles notes avec un titre et un contenu.
- **📋 Afficher toutes les notes** : Visualisez toutes vos notes directement sur la page d'accueil.
- **👁️ Voir une note en détail** : Cliquez sur une note pour consulter son contenu complet dans une page dédiée.
- **📝 Modifier une note** : Mettez à jour le contenu d'une note existante à tout moment.
- **🗑️ Supprimer une note** : Supprimez les notes dont vous n’avez plus besoin.
- **🕒 Date de création** : Chaque note affiche la date et l’heure de sa création.
- **🌐 Navigation entre les pages** : Utilisez React Router DOM pour naviguer facilement entre les pages (Accueil, Voir, Éditer).
- **💾 Sauvegarde locale (Local Storage)** : Vos notes sont enregistrées automatiquement dans le stockage local de votre navigateur, ce qui vous permet de les retrouver même après avoir fermé l’application.
- **📦 Architecture modulaire** : Utilisation du `Context API` pour une gestion centralisée et propre des données.

---

## 🔧 Installation

Pour commencer, clonez le dépôt et installez les dépendances nécessaires :

```bash
git clone https://github.com/Nestorservice/nootbook.git
cd Notes-app
npm install
🚀 Utilisation
Lancez le serveur de développement :

bash
Copy
Edit
npm start
Ouvrez votre navigateur et accédez à l’adresse suivante :

arduino
Copy
Edit
http://localhost:3000
🧠 Structure du Projet
Home.jsx : Page d'accueil affichant toutes les notes

AddNote.jsx : Composant pour ajouter une nouvelle note

EditNote.jsx : Composant pour modifier une note existante

ViewNote.jsx : Page pour afficher le détail complet d'une note (avec date)

NotesContext.jsx : Contexte global pour gérer toutes les notes

localStorage : Persistance des données dans le navigateur

🧩 Personnalisation
Tu peux personnaliser librement l’application selon tes besoins :

Ajouter une recherche par mot-clé

Filtrer ou trier les notes par date

Ajouter des catégories ou des tags

Améliorer le design avec des animations ou une interface responsive

📚 Documentation
Consulte l’article Medium pour un tutoriel détaillé incluant l’utilisation de hooks personnalisés et la personnalisation de l’interface.
