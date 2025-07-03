# ProjetPytest


# Projet AWS Fullstack (React + Lambda + DynamoDB)

## 🔗 Démo en ligne
Front-end : [https://main.d2dibty63a8d69.amplifyapp.com](https://main.d2dibty63a8d69.amplifyapp.com/)  
Back-end (API) : [https://sils518b8k.execute-api.eu-west-1.amazonaws.com/prod/user](https://sils518b8k.execute-api.eu-west-1.amazonaws.com/prod/user)

## 🚀 Fonctionnalités
- Ajouter un utilisateur avec UUID
- Liste des utilisateurs
- Tests unitaires (backend avec Pytest + moto)
- 🚨🚨 ⚠️ Remarque : Il ne m’a pas été possible de faire fonctionner correctement les tests avec pytest à cause d’un problème persistant lié à l’importation de la bibliothèque moto. Malgré plusieurs tentatives de résolution (réinstallation, import, environnement virtuel), l’erreur persistait. Je suis donc désolé(e) de ne pas avoir pu finaliser cette partie correctement.

- Pipeline CI/CD GitHub Actions

## ⚙️ Technologies
- React
- AWS Lambda, API Gateway, DynamoDB
- GitHub Actions
- Amplify Hosting

## 📁 Structure
backend/
frontend/
.github/workflows/
