Le projet que vous avez cloné demande esbuild en version ^0.25.0, mais la version récente de Vite installée (v8.3.5) exige une version plus récente de esbuild (^0.27.0 ou ^0.28.0). npm bloque l'installation pour éviter de casser votre application.
Option 1 : Forcer l'installation (Solution la plus rapide)
npm install --legacy-peer-deps
ou
npm install --legacy-peer-deps
Option 2 : Mettre à jour les dépendances obsolètes (Recommandé)
Le projet utilise probablement une version d'esbuild trop ancienne dans son fichier package.json. Vous pouvez mettre à jour esbuild pour qu'il corresponde aux exigences de Vite :
npm install esbuild@latest --save-dev
