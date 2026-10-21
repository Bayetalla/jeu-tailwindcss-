import { DictionaryEntry } from '../types';

export const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  // ==========================================
  // FLEXBOX
  // ==========================================
  {
    propertyName: 'justify-content',
    category: 'Flexbox',
    frenchDefinition: 'Distribue les éléments enfants le long de l\'axe principal d\'un conteneur Flexbox ou Grid.',
    concreteUtility: 'Centrer des boutons, répartir des liens de navigation aux extrémités (space-between) ou espacer des cartes.',
    syntaxExample: `.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}`,
    commonValues: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
    commonTrap: 'Confondre justify-content (axe principal) et align-items (axe secondaire/perpendiculaire).',
    comparisonWithSimilar: 'justify-content aligne dans le sens de lecture de flex-direction, tandis qu\'align-items aligne sur l\'axe perpendiculaire.',
    browserSupport: 'Universel (100% de support)',
    mnemonicTip: '« Justify » comme un traitement de texte : aligne le texte horizontalement le long de la ligne.',
    previewHtml: '<div class="preview-box">\n  <span>Élément A</span>\n  <span>Élément B</span>\n  <span>Élément C</span>\n</div>',
    previewCss: '.preview-box {\n  display: flex;\n  justify-content: space-between;\n  background: #0f172a;\n  padding: 12px;\n  border-radius: 8px;\n  color: #38bdf8;\n  font-family: monospace;\n  font-size: 11px;\n}',
  },
  {
    propertyName: 'align-items',
    category: 'Flexbox',
    frenchDefinition: 'Aligne les éléments enfants sur l\'axe secondaire (perpendiculaire à l\'axe principal) dans un conteneur Flexbox ou Grid.',
    concreteUtility: 'Aligner verticalement une icône et son label de texte pour qu\'ils soient parfaitement à la même hauteur.',
    syntaxExample: `.btn-icon {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}`,
    commonValues: ['stretch (défaut)', 'flex-start', 'center', 'flex-end', 'baseline'],
    commonTrap: 'Oublier que la valeur par défaut est stretch, ce qui peut étirer les enfants sur toute la hauteur disponible.',
    comparisonWithSimilar: 'align-items s\'applique à tous les enfants sur le conteneur parent, tandis qu\'align-self permet à un enfant unique de déroger à la règle.',
    browserSupport: 'Universel (100% de support)',
    mnemonicTip: '« Items » = la posture de chaque item sur la barre transversale.',
    previewHtml: '<div class="preview-box">\n  <div style="height: 25px; background: #3b82f6; padding: 4px 8px; border-radius: 4px;">Icon</div>\n  <span style="color: white;">Texte centré verticalement</span>\n</div>',
    previewCss: '.preview-box {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  height: 60px;\n  background: #0f172a;\n  padding: 10px;\n  border-radius: 8px;\n  font-family: sans-serif;\n  font-size: 12px;\n}',
  },
  {
    propertyName: 'flex-direction',
    category: 'Flexbox',
    frenchDefinition: 'Définit l\'axe principal le long duquel les éléments flexibles sont disposés (horizontal ou vertical).',
    concreteUtility: 'Transformer une rangée de boutons desktop en une liste verticale tactile sur mobile.',
    syntaxExample: `.menu-mobile {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}`,
    commonValues: ['row (défaut)', 'column', 'row-reverse', 'column-reverse'],
    commonTrap: 'Quand vous passez en column, l\'axe principal devient vertical : justify-content contrôle alors le haut/bas !',
    comparisonWithSimilar: 'flex-direction réoriente les coordonnées spatiales complètes du conteneur.',
    browserSupport: 'Universel (100% de support)',
    mnemonicTip: 'Direction = la flèche le long de laquelle les enfants s\'enfilent.',
    previewHtml: '<div class="preview-box">\n  <div>Étape 1</div>\n  <div>Étape 2</div>\n  <div>Étape 3</div>\n</div>',
    previewCss: '.preview-box {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  background: #0f172a;\n  padding: 10px;\n  border-radius: 8px;\n  color: #10b981;\n  font-size: 11px;\n  font-family: monospace;\n}',
  },
  {
    propertyName: 'flex-wrap',
    category: 'Flexbox',
    frenchDefinition: 'Détermine si les éléments flexibles sont forcés de rester sur une seule ligne ou peuvent passer à la ligne suivante en cas de manque d\'espace.',
    concreteUtility: 'Créer un nuage de tags ou une série de badges qui s\'enroulent joliment sur plusieurs lignes sans déborder.',
    syntaxExample: `.tag-cloud {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}`,
    commonValues: ['nowrap (défaut)', 'wrap', 'wrap-reverse'],
    commonTrap: 'Par défaut (nowrap), les éléments se rétrécissent jusqu\'à s\'écraser mutuellement au lieu de passer à la ligne.',
    comparisonWithSimilar: 'Contrairement à CSS Grid qui définit des pistes explicites, flex-wrap s\'enroule naturellement selon la taille intrinsèque de chaque tag.',
    browserSupport: 'Universel (100% de support)',
    mnemonicTip: '« Wrap » comme un rouleau de printemps : on enroule dès que ça déborde.',
    previewHtml: '<div class="preview-box">\n  <span>HTML</span><span>CSS</span><span>JS</span><span>Flexbox</span><span>Grid</span><span>React</span>\n</div>',
    previewCss: '.preview-box {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  background: #0f172a;\n  padding: 10px;\n  border-radius: 8px;\n}\n.preview-box span {\n  background: #334155;\n  color: #f8fafc;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n  font-family: monospace;\n}',
  },

  // ==========================================
  // BOX MODEL & DIMENSIONS
  // ==========================================
  {
    propertyName: 'box-sizing',
    category: 'Box Model & Dimensions',
    frenchDefinition: 'Définit comment la largeur et la hauteur totales d\'un élément sont calculées (avec ou sans le padding et la bordure).',
    concreteUtility: 'Garantir que width: 100% ne dépasse jamais de l\'écran lorsqu\'on ajoute du padding interne.',
    syntaxExample: `*, *::before, *::after {\n  box-sizing: border-box;\n}`,
    commonValues: ['content-box (défaut W3C historique)', 'border-box (recommandé)'],
    commonTrap: 'Garder content-box provoque des débordements horizontaux parasites (scrollbars horizontales non voulues).',
    comparisonWithSimilar: 'En content-box, width = contenu. En border-box, width = contenu + padding + bordure.',
    browserSupport: 'Universel (100% de support)',
    mnemonicTip: '« Border-box » : la boîte s\'arrête à la bordure, rien ne déborde au-delà de la taille déclarée.',
    previewHtml: '<div class="preview-box">\n  <div style="box-sizing: border-box; width: 100%; padding: 10px; background: #3b82f6; color: white; border: 2px solid white; border-radius: 6px; text-align: center; font-size: 11px;">100% border-box (Parfait)</div>\n</div>',
    previewCss: '.preview-box {\n  background: #0f172a;\n  padding: 12px;\n  border-radius: 8px;\n}',
  },
  {
    propertyName: 'gap',
    category: 'Box Model & Dimensions',
    frenchDefinition: 'Définit l\'espacement (gouttière) entre les lignes et colonnes dans les conteneurs Flexbox et Grid.',
    concreteUtility: 'Remplacer définitivement les marges complexes du type :not(:last-child) ou margin-right.',
    syntaxExample: `.liste {\n  display: flex;\n  gap: 16px;\n}`,
    commonValues: ['8px', '16px', '1rem', 'clamp(8px, 2vw, 24px)'],
    commonTrap: 'gap ne fonctionne que sur les conteneurs display: flex, grid ou multi-column (pas sur display: block).',
    comparisonWithSimilar: 'margin s\'applique autour de l\'élément lui-même, tandis que gap s\'applique uniquement DANS L\'INTERVALLE entre les éléments.',
    browserSupport: 'Universel moderne (100% depuis 2021)',
    mnemonicTip: '« Gap » = le vide entre deux dents ou deux voitures garées.',
    previewHtml: '<div class="preview-box">\n  <div>1</div><div>2</div><div>3</div>\n</div>',
    previewCss: '.preview-box {\n  display: flex;\n  gap: 12px;\n  background: #0f172a;\n  padding: 12px;\n  border-radius: 8px;\n}\n.preview-box div {\n  background: #6366f1;\n  color: white;\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n  font-weight: bold;\n}',
  },

  // ==========================================
  // CSS GRID
  // ==========================================
  {
    propertyName: 'grid-template-columns',
    category: 'CSS Grid',
    frenchDefinition: 'Définit le nombre et la largeur des colonnes dans une grille CSS 2D.',
    concreteUtility: 'Créer des mises en page de dashboards, galeries d\'images ou tableaux structurés.',
    syntaxExample: `.grid-dashboard {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}`,
    commonValues: ['repeat(3, 1fr)', 'repeat(auto-fit, minmax(200px, 1fr))', '200px 1fr', '1fr 2fr 1fr'],
    commonTrap: 'Oublier display: grid avant de définir grid-template-columns.',
    comparisonWithSimilar: 'repeat(auto-fit, ...) crée des colonnes dynamiques qui s\'étirent, alors qu\'auto-fill crée des colonnes vides si l\'espace le permet.',
    browserSupport: 'Universel (100% de support)',
    mnemonicTip: '« Template » = le patron ou le moule de chaque colonne.',
    previewHtml: '<div class="preview-box">\n  <div>Col 1 (1fr)</div><div>Col 2 (2fr)</div>\n</div>',
    previewCss: '.preview-box {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 8px;\n  background: #0f172a;\n  padding: 10px;\n  border-radius: 8px;\n  font-size: 11px;\n  color: white;\n}\n.preview-box div {\n  background: #059669;\n  padding: 8px;\n  border-radius: 4px;\n  text-align: center;\n}',
  },

  // ==========================================
  // POSITIONNEMENT
  // ==========================================
  {
    propertyName: 'position: sticky',
    category: 'Positionnement',
    frenchDefinition: 'Place l\'élément en flux normal jusqu\'à ce que le défilement atteigne un seuil (ex: top: 0), où il se fige au bord.',
    concreteUtility: 'Créer des en-têtes de tableau (headers) ou barres de navigation qui restent visibles lors du scroll.',
    syntaxExample: `.header-collant {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n}`,
    commonValues: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    commonTrap: 'Si l\'un des parents a overflow: hidden, le comportement sticky est bloqué et ne colle plus !',
    comparisonWithSimilar: 'fixed est toujours collé à l\'écran. sticky se déplace avec son conteneur parent et s\'arrête au bord de ce parent.',
    browserSupport: 'Universel (100% de support)',
    mnemonicTip: '« Sticky » = post-it collant qui glisse puis s\'accroche au bord.',
    previewHtml: '<div class="preview-box">\n  <div style="background: #f59e0b; color: #0f172a; padding: 4px 8px; font-weight: bold; border-radius: 4px; font-size: 11px;">En-tête Sticky (top: 0)</div>\n</div>',
    previewCss: '.preview-box {\n  background: #0f172a;\n  padding: 10px;\n  border-radius: 8px;\n}',
  },

  // ==========================================
  // SÉLECTEURS AVANCÉS & PSEUDO
  // ==========================================
  {
    propertyName: ':has()',
    category: 'Sélecteurs & Pseudo',
    frenchDefinition: 'Pseudo-classe relationnelle permettant de cibler un élément parent en fonction de ses éléments enfants ou descendants.',
    concreteUtility: 'Styliser une carte si elle contient une image, ou un champ de formulaire si son input est invalide.',
    syntaxExample: `/* Cible le formulaire contenant une erreur */\nform:has(input:invalid) {\n  border-color: #ef4444;\n}`,
    commonValues: [':has(img)', ':has(> .actif)', ':has(:focus)', ':has(input:checked)'],
    commonTrap: 'Croire que :has() cible l\'enfant. C\'est le parent DEVANT le :has() qui est ciblé !',
    comparisonWithSimilar: 'A > B sélectionne l\'enfant B. A:has(> B) sélectionne le parent A.',
    browserSupport: 'Baseline 2023 (100% moderne)',
    mnemonicTip: '« Le parent a (:has) un trésor, donc on le récompense ! »',
    previewHtml: '<div class="preview-box">\n  <div class="card-demo">Carte avec icône active <span>★</span></div>\n</div>',
    previewCss: '.preview-box {\n  background: #0f172a;\n  padding: 10px;\n  border-radius: 8px;\n}\n.card-demo {\n  background: #1e293b;\n  color: white;\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid #eab308;\n  font-size: 11px;\n}',
  },
  {
    propertyName: ':focus-visible',
    category: 'Sélecteurs & Pseudo',
    frenchDefinition: 'S\'active uniquement lorsque l\'élément reçoit le focus via une méthode de saisie nécessitant un repère visuel (typiquement le clavier avec Tab).',
    concreteUtility: 'Supprimer l\'anneau bleu disgracieux au clic souris tout en offrant une accessibilité clavier irréprochable.',
    syntaxExample: `button:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}`,
    commonValues: ['outline: 2px solid currentColor', 'outline-offset: 3px'],
    commonTrap: 'Mettre outline: none sur :focus sans fournir de remplacement avec :focus-visible casse l\'accessibilité pour les personnes aveugles ou malvoyantes.',
    comparisonWithSimilar: ':focus se déclenche à chaque clic ou toucher. :focus-visible sait faire la différence entre souris et clavier.',
    browserSupport: 'Universel moderne (100%)',
    mnemonicTip: '« Visible seulement quand c\'est utile (clavier) ! »',
    previewHtml: '<button class="btn-demo">Naviguez avec Tab</button>',
    previewCss: '.btn-demo {\n  background: #2563eb;\n  color: white;\n  padding: 6px 14px;\n  border-radius: 6px;\n  border: none;\n  outline: 2px solid #93c5fd;\n  outline-offset: 2px;\n  font-size: 11px;\n  cursor: pointer;\n}',
  },

  // ==========================================
  // VARIABLES & MODERNES
  // ==========================================
  {
    propertyName: 'var() & :root',
    category: 'Variables & Modernes',
    frenchDefinition: 'Permet de déclarer des propriétés personnalisées (--nom) et de les insérer n\'importe où dans les styles avec var().',
    concreteUtility: 'Gérer des palettes de couleurs globales, basculer entre mode clair et sombre en temps réel, harmoniser les rayons de bordures.',
    syntaxExample: `:root {\n  --brand-primary: #3b82f6;\n}\n.btn {\n  background: var(--brand-primary);\n}`,
    commonValues: ['var(--token)', 'var(--token, fallback)'],
    commonTrap: 'Oublier les deux tirets obligatoires (ex: brand-primary au lieu de --brand-primary).',
    comparisonWithSimilar: 'Les variables CSS sont dynamiques et obéissent à la cascade (contrairement aux variables SASS compilées statiquement).',
    browserSupport: 'Universel (100% de support)',
    mnemonicTip: '« Deux tirets pour créer, var() pour consommer. »',
    previewHtml: '<div class="preview-box">\n  <div style="background: var(--demo-color, #10b981); color: white; padding: 6px 12px; border-radius: 6px; font-size: 11px; text-align: center;">var(--theme-success)</div>\n</div>',
    previewCss: '.preview-box {\n  background: #0f172a;\n  padding: 10px;\n  border-radius: 8px;\n}',
  },
  {
    propertyName: 'clamp()',
    category: 'Variables & Modernes',
    frenchDefinition: 'Limite une valeur entre une borne minimale et une borne maximale, en utilisant une valeur idéale fluide au milieu.',
    concreteUtility: 'Typographie fluide qui grandit harmonieusement avec l\'écran sans aucune media query.',
    syntaxExample: `h1 {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n}`,
    commonValues: ['clamp(min, fluide, max)'],
    commonTrap: 'Inverser le minimum et le maximum (ex: clamp(3rem, 4vw, 1rem)) rend la fonction inactive.',
    comparisonWithSimilar: 'clamp(A, B, C) équivaut mathématiquement à max(A, min(B, C)).',
    browserSupport: 'Universel (100% de support)',
    mnemonicTip: '« Clamp » comme un étau : serre entre deux bornes fixes.',
    previewHtml: '<div class="preview-box">\n  <span style="font-size: 16px; font-weight: bold; color: #a855f7;">clamp(14px, 2.5vw, 24px)</span>\n</div>',
    previewCss: '.preview-box {\n  background: #0f172a;\n  padding: 12px;\n  border-radius: 8px;\n  text-align: center;\n}',
  },
];
