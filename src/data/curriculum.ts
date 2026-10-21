import { Level } from '../types';

export const CURRICULUM_LEVELS: Level[] = [
  // ==========================================
  // MONDE 1 : LES FONDAMENTAUX
  // ==========================================
  {
    id: 1,
    worldNumber: 1,
    title: 'Monde 1 : Les Fondamentaux du CSS',
    tagline: 'Anatomie d\'une règle, sélecteurs simples et cascade initiale',
    description: 'Comprenez comment le navigateur interprète le HTML et comment le CSS applique des règles précises à chaque balise.',
    iconName: 'Sparkles',
    isUnlockedByDefault: true,
    bossBattle: {
      title: 'Boss du Monde 1 : Le Badge d\'Alerte Stylisé',
      description: 'Créez un badge d\'alerte élégant en utilisant des sélecteurs de classe, une couleur de texte et un fond contrasté.',
      xpReward: 120,
      challengeTask: 'Stylisez le badge avec un fond sombre (#0f172a), un texte émeraude (#10b981), une bordure de 1px (#334155) et un padding de 12px.',
      starterHtml: '<div class="alert-badge">\n  <span>Système Opérationnel</span>\n</div>',
      starterCss: '.alert-badge {\n  /* Complétez le CSS ici */\n}',
      expectedCssRules: ['background', 'color', 'border', 'padding'],
      solutionCss: '.alert-badge {\n  background: #0f172a;\n  color: #10b981;\n  border: 1px solid #334155;\n  padding: 12px 20px;\n  border-radius: 8px;\n  font-weight: 600;\n}',
      hints: [
        'Utilisez background: #0f172a; pour le fond.',
        'Utilisez color: #10b981; pour la couleur du texte.',
        'Utilisez border: 1px solid #334155; pour la bordure.',
      ],
    },
    lessons: [
      {
        id: '1-1',
        levelId: 1,
        levelTitle: 'Monde 1 : Les Fondamentaux',
        title: 'Anatomie d\'une règle CSS',
        slug: 'anatomie-regle-css',
        shortDescription: 'Découvrez les trois piliers : Sélecteur, Propriété et Valeur.',
        readingTimeMinutes: 3,
        xpReward: 30,
        mode: 'find_property',
        conceptName: 'Anatomie d\'une règle CSS',
        problemContext: 'Une page web sans CSS est brute et illisible : du texte noir sur fond blanc aligné à gauche. Comment indiquer au navigateur quoi styliser ?',
        simpleDefinition: 'Une règle CSS se compose d\'un sélecteur (qui cible un élément HTML) et d\'un bloc de déclarations entre accolades contenant des paires propriété: valeur.',
        beginnerAnalogy: 'Imaginez que vous donnez un ordre à un peintre : "Toi le mur du salon (sélecteur), peins-toi (propriété) en bleu marine (valeur) !"',
        syntaxExample: `sélecteur {
  propriété: valeur;
}`,
        visualSchemaType: 'specificity',
        visualSchemaCaption: 'Chaque règle applique un style avec un niveau de priorité précis dans la cascade.',
        interactiveExercise: {
          instruction: 'Appliquez une couleur de texte bleu électrique (#2563eb) et une taille de police de 24px au titre h1.',
          starterHtml: '<h1 class="titre-principal">Bienvenue sur CSS Quest</h1>',
          starterCss: '.titre-principal {\n  /* Écrivez vos règles ici */\n}',
          expectedCssRules: ['color', 'font-size'],
          hints: [
            'Propriété pour la couleur : color: #2563eb;',
            'Propriété pour la taille de police : font-size: 24px;',
          ],
          solutionCss: '.titre-principal {\n  color: #2563eb;\n  font-size: 24px;\n  font-family: sans-serif;\n}',
          explanation: 'La propriété color définit la couleur du texte et font-size contrôle la hauteur des lettres.',
        },
        commonMistakes: [
          {
            mistake: 'Oublier le point-virgule (;) à la fin d\'une déclaration.',
            why: 'Le navigateur ne saura pas où s\'arrête la valeur et ignorera la règle suivante.',
            fix: 'Terminez toujours chaque ligne de propriété par un point-virgule.',
          },
          {
            mistake: 'Confondre le sélecteur de classe (.nom) et d\'identifiant (#nom).',
            why: 'Le point cible les classes réutilisables, le dièse cible les IDs uniques.',
            fix: 'Utilisez .ma-classe pour cibler class="ma-classe".',
          },
        ],
        detailedCorrection: 'Le sélecteur .titre-principal cible précisément notre balise h1 sans impacter les autres titres du site. La couleur et la taille sont appliquées avec succès.',
        keyTakeaways: [
          'Une règle CSS associe un sélecteur à un bloc de déclarations.',
          'Chaque déclaration s\'écrit sous la forme propriété: valeur;.',
          'Une classe commence toujours par un point (.) dans le code CSS.',
        ],
        miniQuiz: {
          question: 'Dans le code `p.intro { color: red; }`, que désigne `.intro` ?',
          options: [
            'Une balise HTML standard',
            'Un sélecteur de classe',
            'Une variable globale',
            'Une pseudo-classe d\'animation',
          ],
          correctIndex: 1,
          explanation: 'Le point (.) devant "intro" indique qu\'il s\'agit d\'une classe HTML (`class="intro"`).',
        },
        memoryFlashcard: {
          front: 'Quelle est la syntaxe minimale d\'une déclaration CSS valide ?',
          back: 'propriété: valeur;',
          keyRule: 'Ne jamais oublier le deux-points entre les deux et le point-virgule final.',
        },
        browserSupport: 'Universel (100% de support sur tous les navigateurs depuis 1996)',
      },
      {
        id: '1-2',
        levelId: 1,
        levelTitle: 'Monde 1 : Les Fondamentaux',
        title: 'Les Sélecteurs de Base & Groupement',
        slug: 'selecteurs-de-base',
        shortDescription: 'Cibler par balise, classe, identifiant et grouper les styles.',
        readingTimeMinutes: 4,
        xpReward: 35,
        mode: 'fix_css',
        conceptName: 'Sélecteurs CSS & Groupement',
        problemContext: 'Vous avez plusieurs boutons qui partagent la même apparence de base. Faut-il répéter le même code pour chacun ?',
        simpleDefinition: 'Vous pouvez combiner plusieurs sélecteurs séparés par des virgules pour leur attribuer les mêmes styles simultanément.',
        beginnerAnalogy: 'C\'est comme appeler plusieurs personnes en même temps : "Thomas, Julie et Sarah, venez ici !"',
        syntaxExample: `h1, h2, h3 {
  font-family: 'Outfit', sans-serif;
  color: #0f172a;
}`,
        visualSchemaType: 'specificity',
        visualSchemaCaption: 'Le groupement avec virgule évite la duplication de code sans modifier la spécificité.',
        interactiveExercise: {
          instruction: 'Corrigez le CSS ci-dessous pour grouper les sélecteurs .btn-primary et .btn-secondary afin qu\'ils aient tous deux un cursor: pointer et border-radius: 8px.',
          starterHtml: '<button class="btn-primary">Accepter</button>\n<button class="btn-secondary">Annuler</button>',
          starterCss: '.btn-primary {\n  cursor: pointer;\n}\n.btn-secondary {\n  /* Répétition inutile ! */\n}',
          expectedCssRules: ['cursor: pointer', 'border-radius: 8px'],
          hints: [
            'Utilisez la virgule : .btn-primary, .btn-secondary { ... }',
            'Ajoutez cursor: pointer; et border-radius: 8px; dans le bloc commun.',
          ],
          solutionCss: '.btn-primary, .btn-secondary {\n  cursor: pointer;\n  border-radius: 8px;\n  padding: 10px 18px;\n  font-weight: 500;\n}',
          explanation: 'La virgule permet de mutualiser les styles partagés et de respecter le principe DRY (Don\'t Repeat Yourself).',
        },
        commonMistakes: [
          {
            mistake: 'Oublier la virgule entre deux sélecteurs (ex: .btn-primary .btn-secondary).',
            why: 'Sans virgule, cela devient un sélecteur descendant (cherche .btn-secondary à l\'intérieur de .btn-primary).',
            fix: 'Ajoutez une virgule claire pour grouper deux éléments indépendants.',
          },
        ],
        detailedCorrection: 'En groupant `.btn-primary, .btn-secondary`, les deux boutons bénéficient du curseur pointeur et des coins arrondis en une seule règle élégante.',
        keyTakeaways: [
          'La virgule permet de styliser plusieurs éléments en même temps.',
          'Sans virgule, un espace exprime une descendance hiérarchique.',
          'Regrouper les styles communs rend votre code plus lisible et maintenable.',
        ],
        miniQuiz: {
          question: 'Que signifie le sélecteur `div p` (avec un espace simple) ?',
          options: [
            'Tous les div et tous les p du document',
            'Les paragraphes p situés à l\'intérieur d\'un conteneur div',
            'Un paragraphe qui a la classe div',
            'Une balise inconnue',
          ],
          correctIndex: 1,
          explanation: 'L\'espace simple est le combinateur descendant : il cible tous les `<p>` contenus dans un `<div>`.',
        },
        memoryFlashcard: {
          front: 'Quelle est la différence entre `.a, .b` et `.a .b` ?',
          back: 'La virgule groupe deux éléments distincts. L\'espace cible .b à l\'intérieur de .a.',
          keyRule: 'Virgule = "ET AUSSI", Espace = "À L\'INTÉRIEUR DE".',
        },
        browserSupport: 'Universel (100% de support)',
      },
    ],
  },

  // ==========================================
  // MONDE 2 : COULEURS, ARRIÈRE-PLANS & TYPOGRAPHIE
  // ==========================================
  {
    id: 2,
    worldNumber: 2,
    title: 'Monde 2 : Couleurs, Arrière-plans & Typo',
    tagline: 'Maîtriser HEX, RGB, HSL, le moderne OKLCH et la lisibilité du texte',
    description: 'Donnez vie à vos interfaces avec les palettes harmonieuses, les dégradés et une typographie équilibrée.',
    iconName: 'Palette',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '2-1',
        levelId: 2,
        levelTitle: 'Monde 2 : Couleurs & Typo',
        title: 'Formats de Couleur : de HEX au moderne OKLCH',
        slug: 'formats-couleur-css',
        shortDescription: 'Comprenez pourquoi OKLCH surpasse RGB et HSL pour les écrans modernes.',
        readingTimeMinutes: 4,
        xpReward: 35,
        mode: 'choose_value',
        conceptName: 'Modèles de Couleur CSS & OKLCH',
        problemContext: 'Les couleurs HSL classiques trompent l\'œil humain : à 50% de luminosité, le jaune paraît éclatant alors que le bleu semble sombre. Comment garantir une luminosité uniforme ?',
        simpleDefinition: 'OKLCH est le nouvel espace colorimétrique de CSS Color Module 4. Il sépare la clarté perçue (L), le chroma ou intensité (C) et la teinte (H) de façon mathématiquement fidèle à la vision humaine.',
        beginnerAnalogy: 'Imaginez un nuancier de peinture où chaque couleur est étalonnée avec un capteur qui mesure exactement ce que l\'œil humain ressent, sans fausse clarté.',
        syntaxExample: `/* OKLCH : clarté (0-100%), intensité (0-0.4), teinte (0-360) */
.badge {
  color: oklch(0.65 0.24 250);
  background-color: oklch(0.96 0.04 250);
}`,
        visualSchemaType: 'variables',
        visualSchemaCaption: 'Les variables de couleur permettent de basculer instantanément les thèmes.',
        interactiveExercise: {
          instruction: 'Appliquez un fond sombre avec un dégradé linéaire allant de #1e1b4b vers #312e81, et un texte blanc cassé #f8fafc.',
          starterHtml: '<div class="carte-hero">\n  <h3>Expérience Visuelle</h3>\n  <p>Couleurs riches et vibrantes.</p>\n</div>',
          starterCss: '.carte-hero {\n  /* Appliquez le gradient de fond et la couleur */\n}',
          expectedCssRules: ['background', 'color'],
          hints: [
            'Utilisez background: linear-gradient(135deg, #1e1b4b, #312e81);',
            'Définissez color: #f8fafc;',
          ],
          solutionCss: '.carte-hero {\n  background: linear-gradient(135deg, #1e1b4b, #312e81);\n  color: #f8fafc;\n  padding: 24px;\n  border-radius: 12px;\n}',
          explanation: 'linear-gradient crée un fondu progressif élégant entre deux teintes complémentaires.',
        },
        commonMistakes: [
          {
            mistake: 'Utiliser un contraste insuffisant entre le texte et le fond (ex: gris clair sur fond blanc).',
            why: 'Le texte devient illisible pour les personnes malvoyantes et échoue aux normes WCAG AA (ratio minimal de 4.5:1).',
            fix: 'Vérifiez toujours le contraste avec un outil ou préférez des teintes foncées sur fond clair.',
          },
        ],
        detailedCorrection: 'Le dégradé linéaire produit une profondeur visuelle remarquable tout en garantissant un contraste parfait avec le texte clair.',
        keyTakeaways: [
          'HEX et RGB sont les formats historiques les plus répandus.',
          'OKLCH est le standard moderne pour des palettes équilibrées et des contrastes perceptuels stables.',
          'Toujours respecter un ratio de contraste d\'au moins 4.5:1 pour le texte courant.',
        ],
        miniQuiz: {
          question: 'Que signifie le L dans le format de couleur `oklch(0.7 0.15 140)` ?',
          options: [
            'Largeur (Width)',
            'Luminosité ou clarté perçue (Lightness)',
            'Longueur d\'onde (Length)',
            'Linéarité (Linear)',
          ],
          correctIndex: 1,
          explanation: 'Le premier paramètre de oklch est Lightness (clarté), allant de 0 (noir absolu) à 1 ou 100% (blanc pur).',
        },
        memoryFlashcard: {
          front: 'Quelle fonction CSS moderne permet de créer un dégradé à 45 degrés ?',
          back: 'background: linear-gradient(45deg, couleur1, couleur2);',
          keyRule: 'Spécifier l\'angle (ex: 45deg, 135deg, to right) avant la liste des couleurs.',
        },
        browserSupport: 'OKLCH : Supporté sur Chrome, Safari, Firefox et Edge (Baseline 2023)',
      },
    ],
  },

  // ==========================================
  // MONDE 3 : BOX MODEL & DIMENSIONS
  // ==========================================
  {
    id: 3,
    worldNumber: 3,
    title: 'Monde 3 : Box Model & Dimensions',
    tagline: 'Content, padding, border, margin et le secret de box-sizing: border-box',
    description: 'Chaque élément HTML est une boîte. Maîtrisez les 4 couches du modèle de boîte pour éliminer les débordements imprévus.',
    iconName: 'Layers',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '3-1',
        levelId: 3,
        levelTitle: 'Monde 3 : Box Model',
        title: 'L\'Anatomie des 4 Couches du Box Model',
        slug: 'anatomie-box-model',
        shortDescription: 'Distinguer nettement padding intérieur et marge extérieure.',
        readingTimeMinutes: 5,
        xpReward: 40,
        mode: 'find_property',
        conceptName: 'Modèle de Boîte CSS',
        problemContext: 'Vous avez défini une largeur de 300px sur une carte. Vous ajoutez 20px de padding et une bordure de 2px. Soudain, votre carte fait 344px et casse votre mise en page ! Pourquoi ?',
        simpleDefinition: 'Par défaut (content-box), le padding et la bordure s\'ajoutent à la largeur déclarée. Avec box-sizing: border-box, la largeur inclut le padding et la bordure.',
        beginnerAnalogy: 'Imaginez un cadre de tableau de 50 cm. En border-box, la dimension extérieure du cadre est garantie à 50 cm, peu importe l\'épaisseur du bois !',
        syntaxExample: `*, *::before, *::after {
  box-sizing: border-box;
}

.carte {
  width: 300px;
  padding: 24px;
  border: 2px solid #cbd5e1;
  margin: 16px auto;
}`,
        visualSchemaType: 'box-model',
        visualSchemaCaption: 'Ajustez le padding et la marge pour voir comment les 4 couches interagissent.',
        interactiveExercise: {
          instruction: 'Configurez la boîte avec box-sizing: border-box, un padding de 20px, une bordure de 2px solid #3b82f6 et une marge de 16px.',
          starterHtml: '<div class="boite-modele">\n  <h4>Boîte Maîtrisée</h4>\n  <p>Aucun débordement indésirable.</p>\n</div>',
          starterCss: '.boite-modele {\n  width: 280px;\n  /* Complétez les propriétés du modèle de boîte */\n}',
          expectedCssRules: ['box-sizing: border-box', 'padding: 20px', 'border:', 'margin: 16px'],
          hints: [
            'Ajoutez box-sizing: border-box;',
            'Ajoutez padding: 20px;',
            'Ajoutez border: 2px solid #3b82f6;',
            'Ajoutez margin: 16px;',
          ],
          solutionCss: '.boite-modele {\n  box-sizing: border-box;\n  width: 280px;\n  padding: 20px;\n  border: 2px solid #3b82f6;\n  margin: 16px auto;\n  background: #0f172a;\n  color: white;\n  border-radius: 8px;\n}',
          explanation: 'Grâce à border-box, la boîte mesure exactement 280px de large, padding et bordure inclus.',
        },
        commonMistakes: [
          {
            mistake: 'Utiliser une marge pour créer de l\'espace à l\'intérieur de la boîte.',
            why: 'La marge (margin) repousse l\'extérieur de la boîte, tandis que le padding crée de l\'espace interne.',
            fix: 'Utilisez padding pour aérer le contenu interne de la boîte.',
          },
        ],
        detailedCorrection: 'En activant box-sizing: border-box, les calculs de taille deviennent prédictibles et stables.',
        keyTakeaways: [
          'Le Box Model se compose de : Content, Padding, Border et Margin.',
          'Margin est externe, Padding est interne.',
          'Toujours adopter box-sizing: border-box sur l\'ensemble des projets.',
        ],
        miniQuiz: {
          question: 'Si un élément a `width: 200px`, `padding: 20px` et `box-sizing: border-box`, quelle est sa largeur totale finale (hors marges) ?',
          options: [
            '240px',
            '200px',
            '180px',
            '220px',
          ],
          correctIndex: 1,
          explanation: 'Avec `border-box`, la largeur déclarée de 200px inclut le padding. L\'élément fait donc exactement 200px !',
        },
        memoryFlashcard: {
          front: 'Quelle est la directive universelle recommandée pour tous les projets CSS ?',
          back: '*, *::before, *::after { box-sizing: border-box; }',
          keyRule: 'À placer en tout premier dans votre fichier CSS de base.',
        },
        browserSupport: 'Universel (100% de support)',
      },
    ],
  },

  // ==========================================
  // MONDE 4 : FLEXBOX
  // ==========================================
  {
    id: 4,
    worldNumber: 4,
    title: 'Monde 4 : Flexbox (Disposition 1D)',
    tagline: 'Alignements unidirectionnels parfaits, axes principal et transversal',
    description: 'Le standard absolu pour aligner des boutons, des barres de navigation et distribuer l\'espace entre des éléments.',
    iconName: 'AlignCenter',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '4-1',
        levelId: 4,
        levelTitle: 'Monde 4 : Flexbox',
        title: 'Centrage et Distribution avec Flexbox',
        slug: 'centrage-flexbox',
        shortDescription: 'Centrer horizontalement et verticalement sans bidouillage.',
        readingTimeMinutes: 4,
        xpReward: 45,
        mode: 'reproduce_design',
        conceptName: 'Flexbox & Alignements',
        problemContext: 'Centrer un élément horizontalement ET verticalement dans un conteneur était autrefois le cauchemar des développeurs web. Comment faire en 3 lignes ?',
        simpleDefinition: 'En déclarant display: flex sur le parent, vous activez le modèle flexible. justify-content gère l\'axe principal (horizontal par défaut) et align-items gère l\'axe secondaire (vertical).',
        beginnerAnalogy: 'Imaginez une brochette : justify-content fait glisser les morceaux de viande le long de la tige, et align-items ajuste la hauteur de la tige dans le four !',
        syntaxExample: `.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}`,
        visualSchemaType: 'flexbox',
        visualSchemaCaption: 'Manipulez justify-content et align-items pour observer le déplacement des éléments.',
        interactiveExercise: {
          instruction: 'Transformez le conteneur en conteneur Flexbox, centrez les éléments sur l\'axe principal (center) et sur l\'axe secondaire (center), avec un espacement gap de 16px.',
          starterHtml: '<div class="navbar-actions">\n  <button class="btn">Profil</button>\n  <button class="btn">Paramètres</button>\n  <button class="btn">Déconnexion</button>\n</div>',
          starterCss: '.navbar-actions {\n  /* Activez Flexbox et centrez les éléments */\n}',
          expectedCssRules: ['display: flex', 'justify-content: center', 'align-items: center', 'gap: 16px'],
          hints: [
            'Déclarez display: flex;',
            'Ajoutez justify-content: center;',
            'Ajoutez align-items: center;',
            'Ajoutez gap: 16px;',
          ],
          solutionCss: '.navbar-actions {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  background: #0f172a;\n  border-radius: 8px;\n}',
          explanation: 'display: flex active Flexbox. justify-content: center et align-items: center assurent un centrage bidirectionnel parfait.',
        },
        commonMistakes: [
          {
            mistake: 'Appliquer justify-content ou align-items sur les enfants au lieu du parent.',
            why: 'Ces propriétés s\'appliquent TOUJOURS sur le conteneur flex parent, pas sur les éléments enfants.',
            fix: 'Définissez display: flex, justify-content et align-items sur la classe du conteneur parent.',
          },
        ],
        detailedCorrection: 'Les boutons sont désormais parfaitement alignés au centre avec un espacement régulier garanti par la propriété moderne gap.',
        keyTakeaways: [
          'display: flex s\'applique sur le conteneur parent.',
          'justify-content gère l\'axe principal (horizontal par défaut).',
          'align-items gère l\'axe secondaire (vertical par défaut).',
        ],
        miniQuiz: {
          question: 'Si vous appliquez `flex-direction: column;`, quel axe devient contrôlé par `justify-content` ?',
          options: [
            'L\'axe horizontal',
            'L\'axe vertical',
            'La diagonale',
            'Aucun axe',
          ],
          correctIndex: 1,
          explanation: 'Quand la direction passe en colonne, l\'axe principal tourne de 90 degrés et devient vertical !',
        },
        memoryFlashcard: {
          front: 'Quelle est la sainte trinité pour centrer un élément au milieu d\'un conteneur en CSS ?',
          back: 'display: flex; justify-content: center; align-items: center;',
          keyRule: 'Fonctionne à tous les coups, quelle que soit la taille du contenu.',
        },
        browserSupport: 'Universel (100% de support)',
      },
    ],
  },

  // ==========================================
  // MONDE 5 : CSS GRID
  // ==========================================
  {
    id: 5,
    worldNumber: 5,
    title: 'Monde 5 : CSS Grid (Disposition 2D)',
    tagline: 'L\'art des grilles bidimensionnelles, unités fr, minmax et auto-fit',
    description: 'Concevez des galeries d\'images, des tableaux de bord et des mises en page complexes en contrôlant simultanément colonnes et lignes.',
    iconName: 'LayoutGrid',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '5-1',
        levelId: 5,
        levelTitle: 'Monde 5 : CSS Grid',
        title: 'Colonnes Fréquentielles & auto-fit',
        slug: 'colonnes-css-grid',
        shortDescription: 'Créer une grille réactive sans media queries grâce à minmax et auto-fit.',
        readingTimeMinutes: 5,
        xpReward: 50,
        mode: 'reproduce_design',
        conceptName: 'CSS Grid & auto-fit',
        problemContext: 'Comment créer une galerie de cartes produits qui affiche 4 colonnes sur grand écran, 2 sur tablette et 1 sur mobile sans écrire une seule media query ?',
        simpleDefinition: 'La fonction repeat(auto-fit, minmax(250px, 1fr)) demande au navigateur de caser autant de colonnes d\'au moins 250px que possible, et d\'étirer le reste équitablement.',
        beginnerAnalogy: 'Imaginez une boîte d\'œufs magique qui crée ou supprime des alvéoles selon la taille du carton sans jamais écraser les œufs !',
        syntaxExample: `.grille-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}`,
        visualSchemaType: 'grid',
        visualSchemaCaption: 'Basculez entre les configurations de pistes pour voir l\'effet des fractions (fr).',
        interactiveExercise: {
          instruction: 'Déclarez display: grid avec 3 colonnes égales grâce à repeat(3, 1fr) et un gap de 16px.',
          starterHtml: '<div class="dashboard-grid">\n  <div class="stat-card">Stat A</div>\n  <div class="stat-card">Stat B</div>\n  <div class="stat-card">Stat C</div>\n</div>',
          starterCss: '.dashboard-grid {\n  /* Configurez la grille CSS 2D */\n}',
          expectedCssRules: ['display: grid', 'grid-template-columns: repeat(3, 1fr)', 'gap: 16px'],
          hints: [
            'Ajoutez display: grid;',
            'Ajoutez grid-template-columns: repeat(3, 1fr);',
            'Ajoutez gap: 16px;',
          ],
          solutionCss: '.dashboard-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}',
          explanation: 'L\'unité fr représente une fraction disponible de l\'espace libre. repeat(3, 1fr) crée 3 colonnes strictement équivalentes.',
        },
        commonMistakes: [
          {
            mistake: 'Confondre CSS Grid et Flexbox pour des galeries à deux dimensions.',
            why: 'Flexbox fonctionne sur un seul axe à la fois. Grid aligne rigoureusement sur les deux axes (colonnes et lignes).',
            fix: 'Utilisez Grid dès que vous avez besoin d\'un tableau ou d\'une matrice 2D.',
          },
        ],
        detailedCorrection: 'La grille divise l\'espace disponible en 3 colonnes équitables et applique un espacement régulier entre les cartes de métriques.',
        keyTakeaways: [
          'CSS Grid est le système de mise en page 2D natif du web.',
          'L\'unité fr évite tout calcul de pourcentage manuel.',
          'repeat(auto-fit, minmax(...)) crée des grilles réactives automatiques.',
        ],
        miniQuiz: {
          question: 'Que signifie `grid-column: span 2;` sur un élément enfant d\'une grille ?',
          options: [
            'L\'élément est dupliqué deux fois',
            'L\'élément s\'étend sur la largeur de 2 colonnes',
            'L\'élément attend 2 secondes avant d\'apparaître',
            'L\'élément est invisible',
          ],
          correctIndex: 1,
          explanation: '`span 2` fusionne l\'élément sur deux colonnes adjacentes.',
        },
        memoryFlashcard: {
          front: 'Quelle formule magique CSS Grid permet une grille réactive sans media queries ?',
          back: 'grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));',
          keyRule: 'S\'adapte de 1 à N colonnes selon la largeur de l\'écran.',
        },
        browserSupport: 'Universel (100% de support)',
      },
    ],
  },

  // ==========================================
  // MONDE 6 : POSITIONNEMENT ET SUPERPOSITION
  // ==========================================
  {
    id: 6,
    worldNumber: 6,
    title: 'Monde 6 : Positionnement & z-index',
    tagline: 'Static, relative, absolute, fixed, sticky et contextes d\'empilement',
    description: 'Apprenez à ancrer des éléments, superposer des calques et comprendre pourquoi un z-index ne fonctionne parfois pas.',
    iconName: 'Compass',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '6-1',
        levelId: 6,
        levelTitle: 'Monde 6 : Positionnement',
        title: 'Le Duo Inséparable : relative & absolute',
        slug: 'relative-et-absolute',
        shortDescription: 'Ancrer une pastille ou une icône précisément par rapport à sa carte mère.',
        readingTimeMinutes: 4,
        xpReward: 40,
        mode: 'find_property',
        conceptName: 'Positionnement CSS & z-index',
        problemContext: 'Vous voulez afficher une petite pastille de notification rouge "Nouveau" en haut à droite d\'une carte produit. Si vous mettez position: absolute sans précaution, elle s\'envole tout en haut de la page entière !',
        simpleDefinition: 'Un élément en position: absolute cherche le premier ancêtre qui a position: relative (ou absolute/fixed/sticky). Sans cela, il se positionne par rapport au viewport (la fenêtre du navigateur).',
        beginnerAnalogy: 'C\'est comme un autocollant : il a besoin d\'un support (le parent en position: relative) pour savoir sur quoi il doit se coller !',
        syntaxExample: `.carte-parent {
  position: relative;
}

.pastille-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}`,
        visualSchemaType: 'positioning',
        visualSchemaCaption: 'Faites défiler le conteneur pour observer les comportements de fixed et sticky.',
        interactiveExercise: {
          instruction: 'Placez la pastille badge en position absolute dans le coin supérieur droit (top: 12px, right: 12px) de la carte.',
          starterHtml: '<div class="carte-parent">\n  <span class="badge">Nouveau</span>\n  <h4>Casque Audio Pro</h4>\n</div>',
          starterCss: '.carte-parent {\n  position: relative;\n  padding: 24px;\n  background: #1e293b;\n  border-radius: 12px;\n}\n\n.badge {\n  /* Positionnez le badge en haut à droite */\n}',
          expectedCssRules: ['position: absolute', 'top: 12px', 'right: 12px'],
          hints: [
            'Définissez position: absolute;',
            'Définissez top: 12px;',
            'Définissez right: 12px;',
          ],
          solutionCss: '.carte-parent {\n  position: relative;\n  padding: 24px;\n  background: #1e293b;\n  border-radius: 12px;\n  color: white;\n}\n\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background: #ef4444;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 9999px;\n  font-size: 11px;\n  font-weight: bold;\n}',
          explanation: 'Puisque .carte-parent a position: relative, les coordonnées top: 12px et right: 12px sont mesurées depuis le bord intérieur de la carte.',
        },
        commonMistakes: [
          {
            mistake: 'Oublier position: relative sur le conteneur parent.',
            why: 'L\'enfant absolu s\'échappe et se colle au body de la page.',
            fix: 'Ajoutez toujours position: relative sur l\'élément qui sert de repère spatial.',
          },
        ],
        detailedCorrection: 'La pastille est maintenant parfaitement ancrée dans le coin de sa carte mère.',
        keyTakeaways: [
          'position: relative sert de repère de coordonnées pour les enfants absolus.',
          'position: fixed reste figé à l\'écran lors du scroll.',
          'position: sticky est un hybride : relatif puis collant à un seuil défini.',
        ],
        miniQuiz: {
          question: 'Pourquoi la propriété `z-index: 999;` peut-elle sembler inefficace sur un élément ?',
          options: [
            'Parce que le navigateur n\'a pas assez de mémoire',
            'Parce que l\'élément a position: static (valeur par défaut où z-index ne s\'applique pas)',
            'Parce que le z-index doit être un nombre négatif',
            'Parce que le CSS est désactivé',
          ],
          correctIndex: 1,
          explanation: '`z-index` n\'a aucun effet sur les éléments en `position: static`. Il nécessite `relative`, `absolute`, `fixed` ou `sticky` (ou être un enfant direct flex/grid).',
        },
        memoryFlashcard: {
          front: 'Quelle condition est obligatoire pour qu\'un z-index fonctionne sur une balise classique ?',
          back: 'L\'élément doit avoir une position autre que static (ex: relative, absolute).',
          keyRule: 'Pas de position = pas de z-index.',
        },
        browserSupport: 'Universel (100% de support)',
      },
    ],
  },

  // ==========================================
  // MONDE 7 : RESPONSIVE DESIGN
  // ==========================================
  {
    id: 7,
    worldNumber: 7,
    title: 'Monde 7 : Responsive Design Moderne',
    tagline: 'Media queries, fluidité, clamp() et approche mobile-first',
    description: 'Concevez des interfaces qui s\'adaptent harmonieusement à chaque smartphone, tablette et écran 4K.',
    iconName: 'Smartphone',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '7-1',
        levelId: 7,
        levelTitle: 'Monde 7 : Responsive Design',
        title: 'Mobile-First & clamp() fluide',
        slug: 'mobile-first-et-clamp',
        shortDescription: 'Écrire des règles CSS qui grandissent naturellement avec l\'écran.',
        readingTimeMinutes: 4,
        xpReward: 40,
        mode: 'choose_value',
        conceptName: 'Philosophie Mobile-First & Typo Fluide',
        problemContext: 'Historiquement, on écrivait du CSS desktop puis on ajoutait des dizaines de media queries max-width pour réduire les éléments sur mobile, créant un code lourd et fragile.',
        simpleDefinition: 'L\'approche mobile-first consiste à coder l\'interface pour petit écran en premier, puis à enrichir progressivement avec @media (min-width: ...). La fonction clamp(min, idéal, max) permet quant à elle une typographie fluide sans media query !',
        beginnerAnalogy: 'C\'est comme préparer un sac de randonnée : on prend d\'abord l\'essentiel compact (mobile), puis on ajoute du confort supplémentaire si on a plus de place dans le coffre (desktop) !',
        syntaxExample: `/* Base Mobile */
.titre {
  font-size: clamp(1.25rem, 4vw, 2.5rem);
}

/* Tablette et au-delà */
@media (min-width: 768px) {
  .grille {
    grid-template-columns: repeat(2, 1fr);
  }
}`,
        visualSchemaType: 'responsive',
        visualSchemaCaption: 'Déplacez le curseur de largeur pour observer le déclenchement des media queries.',
        interactiveExercise: {
          instruction: 'Appliquez une media query @media (min-width: 768px) pour que la classe .panneau passe en display: flex au lieu de la disposition verticale initiale.',
          starterHtml: '<div class="panneau">\n  <div class="col">Menu A</div>\n  <div class="col">Menu B</div>\n</div>',
          starterCss: '.panneau {\n  display: block;\n}\n\n/* Ajoutez la media query ici */',
          expectedCssRules: ['@media', 'min-width: 768px', 'display: flex'],
          hints: [
            'Écrivez @media (min-width: 768px) { ... }',
            'À l\'intérieur, ciblez .panneau et appliquez display: flex;',
          ],
          solutionCss: '.panneau {\n  display: block;\n  gap: 16px;\n}\n\n@media (min-width: 768px) {\n  .panneau {\n    display: flex;\n  }\n}',
          explanation: 'Sur mobile (< 768px), le panneau reste en bloc vertical. À partir de 768px, il bascule en rangée flexible horizontale.',
        },
        commonMistakes: [
          {
            mistake: 'Mélanger des media queries min-width et max-width sans cohérence.',
            why: 'Cela crée des zones mortes ou des collisions de spécificité difficiles à déboguer.',
            fix: 'Tenez-vous strictement à des media queries min-width pour respecter le flux Mobile-First.',
          },
        ],
        detailedCorrection: 'La règle mobile-first garantit un chargement ultra-rapide sur téléphone et une montée en gamme fluide sur grand écran.',
        keyTakeaways: [
          'Commencez toujours par les styles mobiles sans media query.',
          'Enrichissez ensuite avec @media (min-width: 768px) et plus.',
          'clamp(min, fluide, max) remplace avantageusement de multiples media queries.',
        ],
        miniQuiz: {
          question: 'Dans `font-size: clamp(16px, 2.5vw, 32px);`, que se passe-t-il si 2.5vw correspond à 10px ?',
          options: [
            'Le texte mesurera 10px',
            'Le texte mesurera 16px (la valeur minimale garantie)',
            'Le texte mesurera 32px',
            'Le texte disparaît',
          ],
          correctIndex: 1,
          explanation: 'La fonction clamp garantit que la valeur ne descendra jamais en dessous du minimum (ici 16px).',
        },
        memoryFlashcard: {
          front: 'Quelle est la syntaxe des 3 arguments de clamp() ?',
          back: 'clamp(valeur-minimale, valeur-idéale-fluide, valeur-maximale)',
          keyRule: 'Ex: clamp(1rem, 2.5vw, 2rem)',
        },
        browserSupport: 'Universel (100% de support)',
      },
    ],
  },

  // ==========================================
  // MONDE 8 : TRANSITIONS ET ANIMATIONS
  // ==========================================
  {
    id: 8,
    worldNumber: 8,
    title: 'Monde 8 : Transitions & Animations',
    tagline: 'Courbes de Bézier, keyframes et performances graphiques à 60 FPS',
    description: 'Animez vos interfaces avec élégance tout en préservant la fluidité graphique et l\'accessibilité.',
    iconName: 'Sparkles',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '8-1',
        levelId: 8,
        levelTitle: 'Monde 8 : Animations',
        title: 'Transitions Fluides & Propriétés Performantes',
        slug: 'transitions-performantes',
        shortDescription: 'Pourquoi animer transform et opacity plutôt que width ou top.',
        readingTimeMinutes: 4,
        xpReward: 40,
        mode: 'choose_value',
        conceptName: 'Transitions CSS & Performance 60 FPS',
        problemContext: 'Si vous animez la propriété width ou margin-left sur un survol, la page subit un recalcul de géométrie complet (layout reflow) qui fait saccader l\'affichage.',
        simpleDefinition: 'Pour des animations à 60 images par seconde sans lag, animez uniquement transform (scale, translate, rotate) et opacity. Ces propriétés sont gérées directement par la carte graphique (GPU).',
        beginnerAnalogy: 'Animer la largeur d\'un mur oblige à reconstruire la maison (Reflow). Animer un projecteur ou déplacer un objet avec une grue (GPU) ne touche pas aux fondations !',
        syntaxExample: `.bouton-interactif {
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
}

.bouton-interactif:hover {
  transform: translateY(-2px) scale(1.02);
}`,
        visualSchemaType: 'animations',
        visualSchemaCaption: 'Testez les différentes courbes d\'accélération et modifiez la durée en direct.',
        interactiveExercise: {
          instruction: 'Ajoutez une transition fluide de 200ms sur transform, et appliquez transform: scale(1.05) lors du survol :hover.',
          starterHtml: '<button class="card-btn">Découvrir l\'offre</button>',
          starterCss: '.card-btn {\n  /* Ajoutez la transition */\n}\n.card-btn:hover {\n  /* Ajoutez le transform */\n}',
          expectedCssRules: ['transition: transform 200ms', 'transform: scale(1.05)'],
          hints: [
            'Ajoutez transition: transform 200ms ease; dans .card-btn',
            'Ajoutez transform: scale(1.05); dans .card-btn:hover',
          ],
          solutionCss: '.card-btn {\n  transition: transform 200ms ease;\n  padding: 12px 24px;\n  background: #3b82f6;\n  color: white;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.card-btn:hover {\n  transform: scale(1.05);\n}',
          explanation: 'Le survol déclenche un grossissement subtil géré par le GPU sans aucun recalcul de layout.',
        },
        commonMistakes: [
          {
            mistake: 'Définir transition: all 1s;',
            why: 'Animer "all" force le navigateur à surveiller des dizaines de propriétés inutiles et peut causer des saccades.',
            fix: 'Nommez explicitement les propriétés animées (ex: transition: transform 200ms ease;).',
          },
        ],
        detailedCorrection: 'Le composant réagit immédiatement au pointeur avec un mouvement soigné et ultra-fluide.',
        keyTakeaways: [
          'Animer prioritairement transform et opacity.',
          'Éviter d\'animer width, height, top, margin qui déclenchent un reflow.',
          'Respecter prefers-reduced-motion pour les personnes sensibles aux vertiges.',
        ],
        miniQuiz: {
          question: 'Laquelle de ces propriétés CSS est la plus performante à animer ?',
          options: [
            'width',
            'margin-top',
            'transform',
            'padding',
          ],
          correctIndex: 2,
          explanation: '`transform` est pris en charge par le compositeur GPU et ne provoque ni reflow ni repaint de la page.',
        },
        memoryFlashcard: {
          front: 'Quelles sont les deux seules propriétés CSS recommandées pour des animations ultra-fluides ?',
          back: 'transform et opacity',
          keyRule: 'Prises en charge directement par le GPU.',
        },
        browserSupport: 'Universel (100% de support)',
      },
    ],
  },

  // ==========================================
  // MONDE 9 : VARIABLES CSS ET ARCHITECTURE
  // ==========================================
  {
    id: 9,
    worldNumber: 9,
    title: 'Monde 9 : Variables CSS & Thèmes',
    tagline: 'Custom Properties, thèmes clairs/sombres et conventions maintenables',
    description: 'Créez un véritable design system avec des variables CSS réactives et découvrez la puissance de var().',
    iconName: 'SlidersHorizontal',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '9-1',
        levelId: 9,
        levelTitle: 'Monde 9 : Variables CSS',
        title: 'Custom Properties : Déclarer et Consommer',
        slug: 'custom-properties-var',
        shortDescription: 'Définir des tokens réutilisables dans :root et basculer en mode sombre.',
        readingTimeMinutes: 4,
        xpReward: 40,
        mode: 'choose_value',
        conceptName: 'Variables CSS (Custom Properties)',
        problemContext: 'Dans un projet de 2000 lignes de CSS, vous devez changer la couleur principale de la marque. Devez-vous faire un rechercher/remplacer risqué de #2563eb sur 150 fichiers ?',
        simpleDefinition: 'Les variables CSS se déclarent avec deux tirets (--ma-variable) et se consomment avec la fonction var(--ma-variable). Elles obéissent à la cascade et changent dynamiquement en JavaScript ou en media query !',
        beginnerAnalogy: 'Imaginez une télécommande universelle : changer le canal sur la télécommande change l\'image sur tous les écrans connectés d\'un seul clic !',
        syntaxExample: `:root {
  --color-primary: #3b82f6;
  --radius-card: 12px;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
}

.card {
  border-radius: var(--radius-card);
  border-color: var(--color-primary);
}`,
        visualSchemaType: 'variables',
        visualSchemaCaption: 'Modifiez les curseurs pour voir comment un seul token transforme tout le composant.',
        interactiveExercise: {
          instruction: 'Déclarez la variable --accent-color: #10b981 dans :root, puis utilisez-la dans la classe .badge avec background-color: var(--accent-color).',
          starterHtml: '<span class="badge">Succès</span>',
          starterCss: ':root {\n  /* Déclarez la variable */\n}\n\n.badge {\n  /* Utilisez la variable */\n  color: white;\n  padding: 6px 12px;\n  border-radius: 6px;\n}',
          expectedCssRules: ['--accent-color: #10b981', 'var(--accent-color)'],
          hints: [
            'Dans :root, écrivez --accent-color: #10b981;',
            'Dans .badge, écrivez background-color: var(--accent-color);',
          ],
          solutionCss: ':root {\n  --accent-color: #10b981;\n}\n\n.badge {\n  background-color: var(--accent-color);\n  color: white;\n  padding: 6px 12px;\n  border-radius: 6px;\n}',
          explanation: 'La variable est déclarée au sommet du document (:root) et injectée dans le badge via la fonction var().',
        },
        commonMistakes: [
          {
            mistake: 'Oublier les deux tirets initiaux (ex: accent-color au lieu de --accent-color).',
            why: 'Sans les deux tirets, le navigateur considère qu\'il s\'agit d\'une propriété CSS inconnue et l\'ignore.',
            fix: 'Commencez toujours le nom de vos variables personnalisées par deux tirets : --nom.',
          },
        ],
        detailedCorrection: 'Le badge utilise désormais la couleur issue du token central, garantissant une cohérence globale sur tout le site.',
        keyTakeaways: [
          'Les custom properties commencent toujours par deux tirets (--nom).',
          'On les consomme avec la fonction var(--nom).',
          'Elles permettent d\'implémenter des thèmes sombres en redéfinissant simplement les variables.',
        ],
        miniQuiz: {
          question: 'Que permet de faire le second argument de var() comme dans `var(--text-color, black)` ?',
          options: [
            'Multiplier la couleur',
            'Définir une valeur de repli (fallback) si la variable n\'est pas définie',
            'Supprimer la variable',
            'Créer une animation',
          ],
          correctIndex: 1,
          explanation: 'Le second argument est la valeur de secours : si `--text-color` n\'existe pas, `black` sera utilisé.',
        },
        memoryFlashcard: {
          front: 'Où déclare-t-on habituellement les variables CSS globales d\'un projet ?',
          back: 'Dans le pseudo-sélecteur :root { ... }',
          keyRule: ':root correspond à la racine du document HTML avec une spécificité élevée.',
        },
        browserSupport: 'Universel (100% de support)',
      },
    ],
  },

  // ==========================================
  // MONDE 10 : SÉLECTEURS AVANCÉS, PSEUDO-CLASSES ET PSEUDO-ÉLÉMENTS
  // ==========================================
  {
    id: 10,
    worldNumber: 10,
    title: 'Monde 10 : Sélecteurs Avancés & :has()',
    tagline: 'Pseudo-classes, ::before/::after et le révolutionnaire sélecteur de parent :has()',
    description: 'Découvrez le "sélecteur de parent" :has(), les pseudo-éléments graphiques et la navigation au clavier accessible.',
    iconName: 'Award',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '10-1',
        levelId: 10,
        levelTitle: 'Monde 10 : Sélecteurs Avancés',
        title: 'Le Saint Graal : :has() et :focus-visible',
        slug: 'selecteur-has-et-focus',
        shortDescription: 'Cibler un parent en fonction de ses enfants avec :has().',
        readingTimeMinutes: 5,
        xpReward: 45,
        mode: 'find_property',
        conceptName: 'Pseudo-classe relationnelle :has()',
        problemContext: 'Pendant 25 ans, il était impossible en CSS de styliser une carte parent différemment si elle contenait une image ou une case cochée. Il fallait obligatoirement du JavaScript !',
        simpleDefinition: ':has() est la pseudo-classe relationnelle qui permet de cibler un élément s\'il contient un descendant correspondant au sélecteur passé en argument.',
        beginnerAnalogy: 'Imaginez une règle : "Tous les foyers qui possèdent un chien ont droit à un tapis d\'entrée spécial !" :has(chien) cible le foyer, pas le chien !',
        syntaxExample: `/* Stylise la carte si elle contient une image */
.card:has(img) {
  grid-template-columns: 200px 1fr;
}

/* Stylise le formulaire si un input est invalide */
form:has(input:invalid) {
  border-color: #ef4444;
}`,
        visualSchemaType: 'specificity',
        visualSchemaCaption: ':has() permet de styliser le conteneur parent en fonction de l\'état de ses enfants.',
        interactiveExercise: {
          instruction: 'Appliquez une bordure dorée (border: 2px solid #eab308) sur la carte .article uniquement si elle contient un badge .vip grâce à :has().',
          starterHtml: '<div class="article">\n  <span class="vip">Abonné VIP</span>\n  <h3>Article Exclusif</h3>\n</div>',
          starterCss: '.article {\n  padding: 16px;\n  background: #0f172a;\n  color: white;\n}\n\n/* Utilisez :has(.vip) */',
          expectedCssRules: ['.article:has(.vip)', 'border: 2px solid #eab308'],
          hints: [
            'Écrivez le sélecteur .article:has(.vip)',
            'Ajoutez border: 2px solid #eab308;',
          ],
          solutionCss: '.article {\n  padding: 16px;\n  background: #0f172a;\n  color: white;\n  border-radius: 8px;\n}\n\n.article:has(.vip) {\n  border: 2px solid #eab308;\n  box-shadow: 0 0 15px rgba(234, 179, 8, 0.2);\n}',
          explanation: ':has(.vip) vérifie la présence d\'un élément .vip à l\'intérieur de .article et applique le style au parent.',
        },
        commonMistakes: [
          {
            mistake: 'Croire que :has() cible l\'enfant.',
            why: 'C\'est l\'inverse : :has() cible le parent situé devant la parenthèse !',
            fix: 'A:has(B) sélectionne A, pourvu qu\'il contienne B.',
          },
        ],
        detailedCorrection: 'Grâce à :has(), le style s\'adapte dynamiquement au contenu présent sans nécessiter une classe supplémentaire manuelle ou un script JS.',
        keyTakeaways: [
          ':has() agit comme un sélecteur de parent.',
          ':focus-visible n\'affiche l\'anneau de focus qu\'aux utilisateurs naviguant au clavier.',
          '::before et ::after nécessitent toujours la propriété content: "";.',
        ],
        miniQuiz: {
          question: 'Que cible le sélecteur `li:has(> a.active)` ?',
          options: [
            'Le lien actif uniquement',
            'L\'élément de liste `<li>` dont l\'enfant direct est un lien actif',
            'Tous les liens du site',
            'Une erreur de syntaxe',
          ],
          correctIndex: 1,
          explanation: 'Ce sélecteur cible le `<li>` parent direct du lien portant la classe active.',
        },
        memoryFlashcard: {
          front: 'Quelle pseudo-classe permet de savoir si un parent contient un enfant spécifique ?',
          back: ':has()',
          keyRule: 'Exemple : .form-group:has(:focus)',
        },
        browserSupport: 'Support universel moderne (Baseline 2023 : Chrome, Safari, Firefox, Edge)',
      },
    ],
  },

  // ==========================================
  // MONDE 11 : FONCTIONS MODERNES ET UNITÉS
  // ==========================================
  {
    id: 11,
    worldNumber: 11,
    title: 'Monde 11 : Fonctions Modernes & Nouvelles Unités',
    tagline: 'calc(), min(), max(), clamp(), ch, rem, dvh, lvh, svh',
    description: 'En finir avec la barre d\'adresse mobile qui coupe vos pages grâce à dvh et calculer des géométries parfaites.',
    iconName: 'Sliders',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '11-1',
        levelId: 11,
        levelTitle: 'Monde 11 : Fonctions & Unités',
        title: 'Les Unités de Viewport Dynamiques : dvh, svh, lvh',
        slug: 'unites-dvh-svh',
        shortDescription: 'Résoudre définitivement le bug de 100vh sur mobile.',
        readingTimeMinutes: 4,
        xpReward: 40,
        mode: 'find_property',
        conceptName: 'Unités de Viewport Modernes',
        problemContext: 'Sur mobile (iOS Safari ou Chrome Android), définir height: 100vh fait déborder le bas de la page sous la barre de navigation du navigateur, masquant les boutons d\'action !',
        simpleDefinition: 'Les nouvelles unités résolvent ce problème : dvh (Dynamic Viewport Height) s\'adapte en temps réel lorsque la barre d\'adresse se rétracte ou s\'agrandit.',
        beginnerAnalogy: 'Imaginez un pantalon avec un élastique qui s\'ajuste instantanément quand vous vous asseyez ou vous levez !',
        syntaxExample: `.hero-fullscreen {
  min-height: 100dvh; /* S'adapte à la barre mobile */
  display: flex;
  flex-direction: column;
}`,
        visualSchemaType: 'responsive',
        visualSchemaCaption: '100dvh garantit que le bouton d\'action reste visible sur tous les écrans mobiles.',
        interactiveExercise: {
          instruction: 'Appliquez min-height: 100dvh et padding: max(16px, 2vw) sur la section .hero.',
          starterHtml: '<section class="hero">\n  <h1>Plein Écran Garanti</h1>\n  <button>Commencer</button>\n</section>',
          starterCss: '.hero {\n  /* Utilisez min-height avec dvh */\n}',
          expectedCssRules: ['min-height: 100dvh', 'padding: max('],
          hints: [
            'Définissez min-height: 100dvh;',
            'Définissez padding: max(16px, 2vw);',
          ],
          solutionCss: '.hero {\n  min-height: 100dvh;\n  padding: max(16px, 2vw);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background: #0f172a;\n  color: white;\n}',
          explanation: '100dvh prend exactement la hauteur disponible réelle à chaque instant sur smartphone.',
        },
        commonMistakes: [
          {
            mistake: 'Continuer à utiliser 100vh pour des écrans mobiles plein format.',
            why: '100vh ignore la hauteur de la barre d\'URL du navigateur mobile.',
            fix: 'Remplacez 100vh par 100dvh pour les sections hero.',
          },
        ],
        detailedCorrection: 'Votre section occupe désormais exactement la hauteur visible sans provoquer de barre de défilement parasite.',
        keyTakeaways: [
          'dvh = hauteur dynamique qui réagit au défilement mobile.',
          'svh = plus petite hauteur possible (barre d\'adresse visible).',
          'lvh = plus grande hauteur possible (barre d\'adresse masquée).',
        ],
        miniQuiz: {
          question: 'Que signifie l\'acronyme `dvh` en CSS ?',
          options: [
            'Double Viewport Height',
            'Dynamic Viewport Height',
            'Desktop Viewport Height',
            'Device Vector Height',
          ],
          correctIndex: 1,
          explanation: 'Dynamic Viewport Height s\'adapte aux barres d\'interface du navigateur mobile en temps réel.',
        },
        memoryFlashcard: {
          front: 'Quelle unité CSS remplace 100vh pour un plein écran mobile parfait ?',
          back: '100dvh',
          keyRule: 'Prend en compte la barre d\'adresse rétractable.',
        },
        browserSupport: 'Baseline 2023 (Supporté par tous les navigateurs modernes)',
      },
    ],
  },

  // ==========================================
  // MONDE 12 : CONTAINER QUERIES & NESTING NATIF
  // ==========================================
  {
    id: 12,
    worldNumber: 12,
    title: 'Monde 12 : Container Queries & Nesting',
    tagline: '@container, unités cqw/cqh et imbrication native & sans Sass',
    description: 'Le futur du CSS : les composants réagissent à la taille de leur propre conteneur, plus seulement à la fenêtre.',
    iconName: 'Boxes',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '12-1',
        levelId: 12,
        levelTitle: 'Monde 12 : Container Queries',
        title: 'Container Queries (@container) & Nesting',
        slug: 'container-queries-nesting',
        shortDescription: 'Des composants véritablement modulaires et autonomes.',
        readingTimeMinutes: 5,
        xpReward: 50,
        mode: 'reproduce_design',
        conceptName: 'Container Queries & Nesting Natif',
        problemContext: 'Une même carte produit peut être placée dans la colonne centrale (large) ou dans la barre latérale (étroite) sur un même écran d\'ordinateur. Une media query globale ne peut pas savoir où la carte est insérée !',
        simpleDefinition: 'Les Container Queries permettent à un élément d\'ajuster son style selon la largeur de son conteneur parent (container-type: inline-size) et non plus de l\'écran.',
        beginnerAnalogy: 'Imaginez un meuble qui change de forme selon la pièce où vous le déposez : s\'il entre dans un couloir étroit, ses étagères se replient verticalement automatiquement !',
        syntaxExample: `.carte-parent {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .carte-enfant {
    display: flex;
    gap: 16px;
  }
}`,
        visualSchemaType: 'responsive',
        visualSchemaCaption: 'Le composant s\'adapte à l\'espace alloué par son parent, quelle que soit la taille de l\'écran.',
        interactiveExercise: {
          instruction: 'Déclarez container-type: inline-size sur .wrapper, puis ajoutez @container (min-width: 350px) pour passer .item en flex.',
          starterHtml: '<div class="wrapper">\n  <div class="item">\n    <img src="photo.jpg" alt="Aperçu">\n    <div class="text">Contenu adaptable</div>\n  </div>\n</div>',
          starterCss: '.wrapper {\n  /* Déclarez le container */\n}\n\n/* Ajoutez @container */',
          expectedCssRules: ['container-type: inline-size', '@container', 'display: flex'],
          hints: [
            'Dans .wrapper, ajoutez container-type: inline-size;',
            'Écrivez @container (min-width: 350px) { .item { display: flex; } }',
          ],
          solutionCss: '.wrapper {\n  container-type: inline-size;\n}\n\n.item {\n  display: block;\n  padding: 12px;\n  background: #1e293b;\n  color: white;\n}\n\n@container (min-width: 350px) {\n  .item {\n    display: flex;\n    gap: 12px;\n  }\n}',
          explanation: 'Dès que le .wrapper dépasse 350px de largeur, la carte passe automatiquement en disposition horizontale flexible.',
        },
        commonMistakes: [
          {
            mistake: 'Oublier container-type: inline-size sur le parent.',
            why: 'Sans cela, le navigateur ne sait pas quel ancêtre sert de référence pour la requête @container.',
            fix: 'Définissez toujours container-type: inline-size sur le conteneur englobant.',
          },
        ],
        detailedCorrection: 'Le composant devient universellement réutilisable dans n\'importe quelle colonne de votre application sans conflit.',
        keyTakeaways: [
          'container-type: inline-size définit le conteneur de référence.',
          '@container remplace les media queries au niveau du composant.',
          'Le nesting CSS natif (&:hover, &.actif) est désormais standard dans tous les navigateurs.',
        ],
        miniQuiz: {
          question: 'Quelle est la différence fondamentale entre `@media` et `@container` ?',
          options: [
            '@media est payant, @container est gratuit',
            '@media regarde la fenêtre du navigateur, @container regarde le parent de l\'élément',
            '@container fonctionne uniquement avec du JavaScript',
            'Il n\'y a aucune différence',
          ],
          correctIndex: 1,
          explanation: '@media teste la taille du viewport global, tandis que @container teste la taille du conteneur parent.',
        },
        memoryFlashcard: {
          front: 'Quelle propriété transforme un élément HTML en référence pour @container ?',
          back: 'container-type: inline-size;',
          keyRule: 'Permet d\'écouter la largeur du parent.',
        },
        browserSupport: 'Baseline 2023 (Supporté par tous les navigateurs récents)',
      },
    ],
  },

  // ==========================================
  // MONDE 13 : ACCESSIBILITÉ, PERFORMANCES ET DÉBOGAGE
  // ==========================================
  {
    id: 13,
    worldNumber: 13,
    title: 'Monde 13 : Accessibilité & Débogage',
    tagline: 'prefers-reduced-motion, focus visible, devtools CSS et containment',
    description: 'Rendez vos interfaces utilisables par tous, optimisez le rendu et déjouez les pièges avec l\'inspecteur.',
    iconName: 'ShieldCheck',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '13-1',
        levelId: 13,
        levelTitle: 'Monde 13 : Accessibilité & Débogage',
        title: 'Respect du Mouvement & Focus Clavier',
        slug: 'accessibilite-motion-focus',
        shortDescription: 'Garantir une expérience inclusive et sans danger.',
        readingTimeMinutes: 4,
        xpReward: 40,
        mode: 'find_property',
        conceptName: 'Accessibilité CSS & prefers-reduced-motion',
        problemContext: 'Certains utilisateurs souffrent de troubles vestibulaires et peuvent avoir des nausées intenses lors d\'animations de défilement ou de rotation. Comment respecter leur réglage système ?',
        simpleDefinition: 'La media query @media (prefers-reduced-motion: reduce) permet de désactiver ou d\'adoucir les animations pour les personnes qui l\'ont demandé dans les paramètres de leur système d\'exploitation.',
        beginnerAnalogy: 'C\'est comme un panneau "Accès PMR" : on offre une rampe douce sans secousses pour que tout le monde voyage sereinement !',
        syntaxExample: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
        visualSchemaType: 'animations',
        visualSchemaCaption: 'L\'accessibilité garantit des transitions douces pour tous les publics.',
        interactiveExercise: {
          instruction: 'Ajoutez une règle focus-visible sur .btn-accessible pour afficher un anneau de contour clair (outline: 2px solid #3b82f6; outline-offset: 2px).',
          starterHtml: '<button class="btn-accessible">Valider le formulaire</button>',
          starterCss: '.btn-accessible {\n  padding: 10px 20px;\n  background: #0f172a;\n  color: white;\n  border: none;\n  border-radius: 6px;\n}\n\n/* Ajoutez :focus-visible */',
          expectedCssRules: [':focus-visible', 'outline: 2px solid', 'outline-offset: 2px'],
          hints: [
            'Écrivez le sélecteur .btn-accessible:focus-visible',
            'Ajoutez outline: 2px solid #3b82f6;',
            'Ajoutez outline-offset: 2px;',
          ],
          solutionCss: '.btn-accessible {\n  padding: 10px 20px;\n  background: #0f172a;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\n.btn-accessible:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}',
          explanation: ':focus-visible indique clairement aux personnes naviguant avec la touche Tab où se trouve le curseur sans afficher d\'anneau disgracieux au clic souris.',
        },
        commonMistakes: [
          {
            mistake: 'Supprimer le contour avec outline: none sans fournir d\'alternative visible.',
            why: 'Cela rend le site complètement inutilisable pour les personnes naviguant au clavier.',
            fix: 'Ne supprimez jamais un outline sans le remplacer par un style :focus-visible explicite.',
          },
        ],
        detailedCorrection: 'Le composant est maintenant 100% accessible au clavier tout en respectant les préférences utilisateurs.',
        keyTakeaways: [
          'prefers-reduced-motion est indispensable pour les personnes sensibles.',
          ':focus-visible cible uniquement la navigation clavier.',
          'Ne jamais supprimer le focus par défaut sans alternative.',
        ],
        miniQuiz: {
          question: 'Pourquoi préférer `:focus-visible` à `:focus` pour styliser l\'anneau de sélection ?',
          options: [
            'C\'est plus rapide à charger',
            ':focus-visible s\'active au clavier mais pas lors d\'un simple clic à la souris',
            ':focus est interdit par le W3C',
            'Il n\'y a aucune différence',
          ],
          correctIndex: 1,
          explanation: '`:focus-visible` évite l\'effet visuel parfois jugé indésirable au clic de souris tout en conservant une accessibilité clavier irréprochable.',
        },
        memoryFlashcard: {
          front: 'Quelle media query permet de détecter le souhait d\'animations réduites ?',
          back: '@media (prefers-reduced-motion: reduce)',
          keyRule: 'Désactiver ou neutraliser les mouvements brusques.',
        },
        browserSupport: 'Universel (100% de support moderne)',
      },
    ],
  },

  // ==========================================
  // MONDE 14 : PROJETS PROFESSIONNELS COMPLETS
  // ==========================================
  {
    id: 14,
    worldNumber: 14,
    title: 'Monde 14 : Projets Professionnels Complets',
    tagline: 'Mettre en pratique l\'ensemble de vos compétences sur des interfaces réelles',
    description: 'Construisez des composants et pages entières : carte de profil, page de login, dashboard responsive et portfolio.',
    iconName: 'Trophy',
    isUnlockedByDefault: false,
    lessons: [
      {
        id: '14-1',
        levelId: 14,
        levelTitle: 'Monde 14 : Projets',
        title: 'Projet 1 : Carte de Profil Professionnelle',
        slug: 'projet-carte-profil',
        shortDescription: 'Assembler Flexbox, Box Model, variables et typographie soignée.',
        readingTimeMinutes: 7,
        xpReward: 100,
        mode: 'boss_battle',
        conceptName: 'Projet de Synthèse : Carte Profil',
        problemContext: 'Vous devez concevoir la carte de profil d\'un développeur pour une plateforme de recrutement moderne, avec avatar, badges de compétences, statistiques et bouton d\'action.',
        simpleDefinition: 'Un projet complet combine Box Model (espacements réguliers), Flexbox (alignement des badges et actions) et variables CSS pour un rendu professionnel.',
        beginnerAnalogy: 'C\'est l\'épreuve finale du maître d\'œuvre : vous combinez les briques, la menuiserie et l\'électricité pour livrer un bâtiment impeccable !',
        syntaxExample: `.profile-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  background: #1e293b;
  border: 1px solid #334155;
}`,
        visualSchemaType: 'variables',
        visualSchemaCaption: 'Observez la synergie entre Flexbox et les variables de thème.',
        interactiveExercise: {
          instruction: 'Finalisez le style de la carte de profil : display: flex, padding: 24px, border-radius: 16px, background: #0f172a, border: 1px solid #334155, et gap: 16px.',
          starterHtml: '<div class="profile-card">\n  <div class="header">\n    <h3>Sophie Durand</h3>\n    <span class="role">Ingénieure Frontend</span>\n  </div>\n  <p class="bio">Passionnée par le CSS moderne, l\'accessibilité et le web performant.</p>\n  <button class="cta">Contacter</button>\n</div>',
          starterCss: '.profile-card {\n  /* Assemblez les propriétés */\n}',
          expectedCssRules: ['display: flex', 'padding: 24px', 'border-radius: 16px', 'background', 'gap: 16px'],
          hints: [
            'Ajoutez display: flex; et flex-direction: column;',
            'Ajoutez padding: 24px;',
            'Ajoutez border-radius: 16px;',
            'Ajoutez background: #0f172a;',
            'Ajoutez gap: 16px;',
          ],
          solutionCss: '.profile-card {\n  display: flex;\n  flex-direction: column;\n  padding: 24px;\n  border-radius: 16px;\n  background: #0f172a;\n  border: 1px solid #334155;\n  gap: 16px;\n  color: #f8fafc;\n  max-width: 320px;\n}\n\n.cta {\n  background: #3b82f6;\n  color: white;\n  padding: 10px 16px;\n  border-radius: 8px;\n  border: none;\n  font-weight: 600;\n  cursor: pointer;\n}',
          explanation: 'La carte profile dispose d\'une hiérarchie claire, d\'espacements harmonieux et d\'une excellente ergonomie tactile.',
        },
        commonMistakes: [
          {
            mistake: 'Oublier max-width sur les cartes.',
            why: 'Sans largeur maximale, la carte s\'étire sur toute la largeur de l\'écran et le texte devient difficile à lire.',
            fix: 'Définissez max-width: 360px pour conserver une carte compacte et lisible.',
          },
        ],
        detailedCorrection: 'Félicitations ! Vous avez appliqué l\'ensemble des concepts fondamentaux avec une rigueur de niveau professionnel.',
        keyTakeaways: [
          'Les composants pro s\'appuient sur une structure Flexbox propre.',
          'Les espacements (padding et gap) créent la respiration visuelle.',
          'La typographie et le contraste garantissent la lisibilité.',
        ],
        miniQuiz: {
          question: 'Quel est l\'espacement de lecture optimal recommandé pour une ligne de texte (measure) ?',
          options: [
            '10 à 20 caractères',
            '45 à 75 caractères',
            '200 à 300 caractères',
            'Sans importance',
          ],
          correctIndex: 1,
          explanation: 'Entre 45 et 75 caractères par ligne (environ 65ch en CSS) offre le confort de lecture oculaire maximal.',
        },
        memoryFlashcard: {
          front: 'Quelle unité CSS permet de limiter la largeur d\'un paragraphe à la longueur idéale de lecture ?',
          back: 'max-width: 65ch;',
          keyRule: 'ch représente la largeur du caractère zéro ("0").',
        },
        browserSupport: 'Universel (100% de support)',
      },
    ],
  },
];
