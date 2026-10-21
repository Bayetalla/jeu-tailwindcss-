import { FinalProject } from '../types';

export const FINAL_PROJECTS: FinalProject[] = [
  {
    id: 'proj-profile-card',
    title: 'Carte de Profil Moderne & Responsive',
    shortDescription: 'Créez une carte développeur avec avatar, badges de compétences en wrap, statistiques et action tactile.',
    difficulty: 'Débutant',
    estimatedTime: '15 min',
    brief: 'Vous devez styliser une carte de profil développeur élégante. La carte doit comporter un fond sombre soigné, des coins arrondis généreux (border-radius: 16px), un padding interne équilibré (24px), une organisation en colonne flexible (display: flex), et des badges de tags qui passent à la ligne (flex-wrap: wrap).',
    starterHtml: `<div class="profile-card">
  <div class="avatar-ring">
    <div class="avatar-circle">SD</div>
  </div>
  <div class="profile-info">
    <h3 class="name">Sophie Durand</h3>
    <span class="role">Lead Architecte CSS</span>
  </div>
  <p class="bio">
    Spécialiste en design systems scalables, animations 60 FPS et accessibilité web inclusive.
  </p>
  <div class="tags-container">
    <span class="tag">Flexbox</span>
    <span class="tag">CSS Grid</span>
    <span class="tag">Container Queries</span>
    <span class="tag">OKLCH</span>
  </div>
  <div class="stats-row">
    <div class="stat">
      <strong>142</strong>
      <span>Projets</span>
    </div>
    <div class="stat">
      <strong>99.4%</strong>
      <span>Score WCAG</span>
    </div>
  </div>
  <button class="cta-button">Engager Sophie &rarr;</button>
</div>`,
    starterCss: `/* Stylisez la carte de profil selon le cahier des charges */
.profile-card {
  max-width: 360px;
  margin: 20px auto;
  /* Ajoutez votre CSS ici */
}

.avatar-circle {
  width: 56px;
  height: 56px;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
}

.tags-container {
  /* Aligner les tags en wrap avec gap */
}

.cta-button {
  /* Bouton d'action pro */
}`,
    expectedCssRules: [
      'display: flex',
      'padding: 24px',
      'border-radius: 16px',
      'flex-wrap: wrap',
      'background',
    ],
    criteria: [
      'Utiliser display: flex pour structurer la carte verticalement avec un gap régulier.',
      'Appliquer un padding d\'au moins 20px et un rayon de courbure border-radius: 16px.',
      'Organiser les tags avec display: flex, flex-wrap: wrap et gap: 8px.',
      'Styliser le bouton d\'action avec un contraste supérieur à 4.5:1 et des coins arrondis.',
    ],
    targetPreviewDescription: 'Une carte moderne et soignée avec un fond sombre #0f172a, bordure subtile #334155, typographie équilibrée et tags émeraude.',
    solutionCss: `.profile-card {
  max-width: 360px;
  margin: 20px auto;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #f8fafc;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.avatar-circle {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: 18px;
}

.name {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.role {
  font-size: 12px;
  color: #38bdf8;
  font-weight: 600;
}

.bio {
  font-size: 13px;
  line-height: 1.5;
  color: #94a3b8;
  margin: 0;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #1e293b;
  color: #38bdf8;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  font-family: monospace;
}

.stats-row {
  display: flex;
  justify-content: space-around;
  background: #1e293b;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #334155;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat strong {
  font-size: 16px;
  color: #10b981;
  font-family: monospace;
}

.stat span {
  font-size: 11px;
  color: #94a3b8;
}

.cta-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: transform 150ms ease, background-color 150ms ease;
}

.cta-button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}`,
  },
  {
    id: 'proj-login-page',
    title: 'Page de Connexion Accessible & Centrée',
    shortDescription: 'Centrez parfaitement un formulaire d\'authentification avec inputs stylisés, états focus et validation visuelle.',
    difficulty: 'Intermédiaire',
    estimatedTime: '20 min',
    brief: 'Concevez un écran de connexion moderne. Le formulaire doit être centré verticalement et horizontalement au milieu de l\'écran (min-height: 100dvh). Chaque champ doit disposer d\'un état :focus-visible visible avec anneau bleu, et les labels doivent être placés au-dessus des inputs.',
    starterHtml: `<div class="login-wrapper">
  <form class="login-box">
    <div class="logo">
      <span class="logo-mark">CQ</span>
      <h2>Connexion sécurisée</h2>
    </div>
    
    <div class="form-group">
      <label for="email">Adresse e-mail</label>
      <input id="email" type="email" placeholder="dev@exemple.fr" required />
    </div>

    <div class="form-group">
      <label for="pwd">Mot de passe</label>
      <input id="pwd" type="password" placeholder="••••••••" required />
    </div>

    <button type="submit" class="submit-btn">Se connecter à la Quête</button>
  </form>
</div>`,
    starterCss: `/* Centrage complet et accessibilité */
.login-wrapper {
  /* Utilisez min-height: 100dvh et display: flex pour centrer */
}

.login-box {
  /* Style de la boîte */
}

input {
  /* Inputs confortables */
}

input:focus-visible {
  /* Anneau d'accessibilité clavier */
}`,
    expectedCssRules: [
      'min-height: 100dvh',
      'display: flex',
      'justify-content: center',
      'align-items: center',
      ':focus-visible',
    ],
    criteria: [
      'min-height: 100dvh avec centrage horizontal et vertical.',
      'Champs de saisie ergonomiques avec padding confortable.',
      ':focus-visible stylisé pour garantir l\'accessibilité clavier.',
      'Gestion des marges et espacements internes sans débordement.',
    ],
    targetPreviewDescription: 'Un écran centré avec une boîte d\'authentification aux finitions irréprochables.',
    solutionCss: `.login-wrapper {
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #020617;
  padding: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.login-box {
  width: 100%;
  max-width: 380px;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
}

.logo {
  text-align: center;
}

.logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: #3b82f6;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  margin-bottom: 8px;
}

h2 {
  font-size: 18px;
  color: #f8fafc;
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  font-weight: 500;
  color: #cbd5e1;
}

input {
  padding: 10px 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  transition: border-color 150ms ease;
}

input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 1px;
  border-color: #3b82f6;
}

.submit-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 150ms ease;
}

.submit-btn:hover {
  opacity: 0.9;
}`,
  },
  {
    id: 'proj-dashboard-grid',
    title: 'Tableau de Bord Métrique (CSS Grid 2D)',
    shortDescription: 'Construisez une grille de KPIs réactive avec auto-fit et cartes informatives.',
    difficulty: 'Intermédiaire',
    estimatedTime: '25 min',
    brief: 'Créez la vue métrique d\'un SaaS analytics. Utilisez display: grid avec repeat(auto-fit, minmax(220px, 1fr)) pour que les 4 cartes statistiques se placent en 4 colonnes sur écran large, 2 sur tablette et 1 sur mobile sans aucune media query.',
    starterHtml: `<div class="analytics-dashboard">
  <div class="kpi-card">
    <span class="label">Revenu Récurrent (MRR)</span>
    <strong class="number">24 850 €</strong>
    <span class="trend positive">+18.2% vs M-1</span>
  </div>
  <div class="kpi-card">
    <span class="label">Utilisateurs Actifs</span>
    <strong class="number">12 430</strong>
    <span class="trend positive">+8.4%</span>
  </div>
  <div class="kpi-card">
    <span class="label">Taux de Rétention</span>
    <strong class="number">94.8%</strong>
    <span class="trend neutral">+0.2%</span>
  </div>
  <div class="kpi-card">
    <span class="label">Tickets Résolus</span>
    <strong class="number">312</strong>
    <span class="trend positive">100% SLA</span>
  </div>
</div>`,
    starterCss: `/* Grille CSS moderne avec repeat et minmax */
.analytics-dashboard {
  /* Configurez display: grid avec auto-fit */
}

.kpi-card {
  /* Style des cartes */
}`,
    expectedCssRules: [
      'display: grid',
      'repeat(auto-fit, minmax(',
      'gap: 16px',
    ],
    criteria: [
      'Utiliser repeat(auto-fit, minmax(220px, 1fr)) pour une adaptabilité automatique.',
      'Appliquer un gap de 16px entre chaque carte métrique.',
      'Format de chiffres en police monospace ou tabular-nums pour un alignement soigné.',
    ],
    targetPreviewDescription: 'Un tableau de bord net aux accents émeraude et bleu avec des chiffres calibrés.',
    solutionCss: `.analytics-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 24px;
  background: #020617;
  border-radius: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.kpi-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
}

.number {
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
}

.trend {
  font-size: 11px;
  font-weight: 600;
  font-family: monospace;
}

.trend.positive {
  color: #10b981;
}

.trend.neutral {
  color: #38bdf8;
}`,
  },
  {
    id: 'proj-ecommerce-card',
    title: 'Fiche Produit E-Commerce avec Badge Absolute',
    shortDescription: 'Concevez une carte produit avec pastille en promo ancrée, prix barré et micro-interaction.',
    difficulty: 'Intermédiaire',
    estimatedTime: '20 min',
    brief: 'Concevez une carte e-commerce moderne. L\'image produit est surmontée d\'un badge "-25%" en position: absolute ancré sur un conteneur position: relative. Au survol de la carte, une transition douce (transform: translateY(-4px)) sublime l\'interaction.',
    starterHtml: `<div class="product-card">
  <div class="image-wrapper">
    <span class="sale-badge">-25%</span>
    <div class="product-visual">Casque Sans Fil ANC</div>
  </div>
  <div class="product-body">
    <span class="category">Audio Haute Fidélité</span>
    <h4 class="title">AuraSound Pro X1</h4>
    <div class="price-row">
      <span class="price-current">149 €</span>
      <span class="price-old">199 €</span>
    </div>
    <button class="add-to-cart">Ajouter au panier</button>
  </div>
</div>`,
    starterCss: `/* Fiche produit avec position relative / absolute */
.product-card {
  max-width: 280px;
  margin: 20px auto;
}

.image-wrapper {
  /* N'oubliez pas position: relative pour ancrer le badge ! */
}

.sale-badge {
  /* Positionnez le badge en haut à droite */
}`,
    expectedCssRules: [
      'position: relative',
      'position: absolute',
      'transform',
      'transition',
    ],
    criteria: [
      'position: relative sur le wrapper d\'image et position: absolute sur le badge de promo.',
      'Transition fluide lors du survol de la carte sans causer de saccade graphique.',
      'Contraste suffisant entre prix courant et prix barré.',
    ],
    targetPreviewDescription: 'Une carte produit d\'e-commerce au design soigné avec pastille de réduction bien ancrée.',
    solutionCss: `.product-card {
  max-width: 280px;
  margin: 20px auto;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 200ms ease, border-color 200ms ease;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: white;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: #3b82f6;
}

.image-wrapper {
  position: relative;
  height: 160px;
  background: linear-gradient(135deg, #1e1b4b, #312e81);
}

.product-visual {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: #c7d2fe;
}

.sale-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: monospace;
}

.product-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #38bdf8;
  font-weight: 600;
}

.title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price-current {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  font-family: monospace;
}

.price-old {
  font-size: 13px;
  color: #64748b;
  text-decoration: line-through;
  font-family: monospace;
}

.add-to-cart {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  margin-top: 4px;
}`,
  },
  {
    id: 'proj-dev-portfolio',
    title: 'Portfolio Développeur Mobile-First',
    shortDescription: 'Créez une page personnelle avec en-tête sticky, grille de projets 2D et formulaire de contact.',
    difficulty: 'Avancé',
    estimatedTime: '30 min',
    brief: 'Concevez la page d\'accueil d\'un portfolio développeur complet. La barre de navigation doit rester collée en haut (position: sticky; top: 0). La section projets utilise CSS Grid. La typographie utilise clamp() pour être fluide sur mobile comme sur desktop.',
    starterHtml: `<div class="portfolio-container">
  <header class="portfolio-nav">
    <span class="brand">Alex.dev</span>
    <nav class="nav-links">
      <span>Projets</span>
      <span>Compétences</span>
      <span>Contact</span>
    </nav>
  </header>
  
  <main class="portfolio-main">
    <section class="hero-intro">
      <h1 class="fluid-title">Développeur Frontend & Artisan CSS</h1>
      <p class="subtitle">Je transforme des maquettes complexes en code web rapide, accessible et élégant.</p>
    </section>

    <section class="projects-grid">
      <div class="project-item">Projet Quest 01</div>
      <div class="project-item">Projet SaaS 02</div>
      <div class="project-item">Projet Design System 03</div>
    </section>
  </main>
</div>`,
    starterCss: `/* Portfolio complet sticky + responsive */
.portfolio-nav {
  /* Rendre la navbar sticky */
}

.fluid-title {
  /* Utilisez clamp() pour un titre fluide */
}

.projects-grid {
  /* Grille de projets réactive */
}`,
    expectedCssRules: [
      'position: sticky',
      'top: 0',
      'clamp(',
      'display: grid',
    ],
    criteria: [
      'En-tête sticky avec position: sticky; top: 0; et z-index suffisant.',
      'Titre principal fluide avec clamp().',
      'Grille de projets moderne avec display: grid et gap.',
      'Contraste et lisibilité conformes WCAG AA.',
    ],
    targetPreviewDescription: 'Un portfolio personnel au design d\'agence avec navigation sticky et mise en page fluide.',
    solutionCss: `.portfolio-container {
  min-height: 100dvh;
  background: #020617;
  color: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.portfolio-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.brand {
  font-weight: 800;
  font-size: 16px;
  color: #38bdf8;
}

.nav-links {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #94a3b8;
}

.portfolio-main {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.fluid-title {
  font-size: clamp(1.75rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
  margin: 0;
}

.subtitle {
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  color: #94a3b8;
  max-width: 60ch;
  line-height: 1.6;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.project-item {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 24px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #38bdf8;
  transition: transform 150ms ease;
}

.project-item:hover {
  transform: translateY(-2px);
  border-color: #38bdf8;
}`,
  },
];
