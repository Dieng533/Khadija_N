/**
 * ====================================================================
 * DATA SERVICE POUR KHADIJA_ND (LOCALSTORAGE UNIQUE)
 * ====================================================================
 * Gère toutes les données avec localStorage uniquement.
 * Supporte les liens TikTok, YouTube et vidéos directes.
 */

const STORAGE_KEYS = {
  password: "khadija_admin_password",
  contents: "khadija_contents_v3",
  gallery: "khadija_gallery_v3",
  collabs: "khadija_collabs_v2",
  messages: "khadija_messages_v2",
  settings: "khadija_site_settings_v2",
  packs: "khadija_packs_v2",
  simulator: "khadija_simulator_config_v2"
};

const DEFAULT_PASSWORD = "khadija2026";

// Données initiales
const INITIAL_DATA = {
  contents: [
    {
      id: "c1",
      caption: "@khadija_nd — Lookbook Haute Couture Paris ✦",
      category: "reels",
      link_type: "video",
      video: "https://assets.mixkit.co/videos/preview/mixkit-woman-posing-in-a-white-dress-41315-large.mp4",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: "c2",
      caption: "@khadija_nd — Routine Skincare Glow Solaire ✦",
      category: "ugc",
      link_type: "video",
      video: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-applying-facial-cream-41324-large.mp4",
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: "c3",
      caption: "@khadija_nd — Backstage & Fashion Week Vlogs ✦",
      category: "vlogs",
      link_type: "video",
      video: "https://assets.mixkit.co/videos/preview/mixkit-model-posing-for-a-fashion-photoshoot-41314-large.mp4",
      order_index: 3,
      created_at: new Date().toISOString()
    }
  ],
  gallery: [
    { id: "g1", caption: "Shooting Haute Couture — Éditorial 2026", category: "mode", image: "Images/photo2.jpeg", order_index: 1, created_at: new Date().toISOString() },
    { id: "g2", caption: "Glow & Skincare — Signature Beauté", category: "beaute", image: "Images/photo1.jpeg", order_index: 2, created_at: new Date().toISOString() },
    { id: "g3", caption: "Portrait Iconique — Khadija_Nd Studio", category: "mode", image: "Images/photo2.jpeg", order_index: 3, created_at: new Date().toISOString() },
    { id: "g4", caption: "Fashion Week & Événements Privés", category: "evenement", image: "Images/photo1.jpeg", order_index: 4, created_at: new Date().toISOString() }
  ],
  collabs: [
    { id: "b1", name: "Dior Beauty", logo: "", order_index: 1, created_at: new Date().toISOString() },
    { id: "b2", name: "L'Oréal Paris", logo: "", order_index: 2, created_at: new Date().toISOString() },
    { id: "b3", name: "Zara Fashion", logo: "", order_index: 3, created_at: new Date().toISOString() },
    { id: "b4", name: "Sephora", logo: "", order_index: 4, created_at: new Date().toISOString() },
    { id: "b5", name: "Fenty Beauty", logo: "", order_index: 5, created_at: new Date().toISOString() }
  ],
  packs: [
    {
      id: "p1",
      title: "Pack Éclat",
      tagline: "Idéal pour un lancement produit ou une visibilité ciblée et percutante.",
      popular: false,
      popularBadge: "",
      reels: 1,
      stories: 2,
      ugc: 0,
      ads: false,
      features: [
        "1 Reel Scénarisé (Instagram + TikTok)",
        "2 Stories avec lien swipe-up / sticker",
        "Rapport d'audience et de métriques",
        "Livraison sous 5 à 7 jours ouvrés"
      ],
      buttonText: "Sélectionner Pack Éclat ✦",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: "p2",
      title: "Pack Signature",
      tagline: "La formule complète pour un storytelling puissant et une conversion maximale.",
      popular: true,
      popularBadge: "★ Le Plus Demandé",
      reels: 2,
      stories: 4,
      ugc: 1,
      ads: true,
      features: [
        "2 Reels Haute Définition / 4K",
        "4 Stories d'engagement et backstage",
        "1 Format UGC supplémentaire pour vos Ads",
        "Cession de droits publicitaires 30 jours"
      ],
      buttonText: "Sélectionner Pack Signature ✦",
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: "p3",
      title: "Pack Ambassadrice",
      tagline: "Partenariat exclusif trimestriel ou annuel avec présence égérie.",
      popular: false,
      popularBadge: "",
      reels: 4,
      stories: 6,
      ugc: 3,
      ads: true,
      features: [
        "Shooting photo & vidéo dédié en studio",
        "4 Reels / Mois + Stories hebdomadaires",
        "Présence physique aux événements de marque",
        "Exclusivité sectorielle garantie"
      ],
      buttonText: "Sélectionner Pack Ambassadrice ✦",
      order_index: 3,
      created_at: new Date().toISOString()
    }
  ],
  simulatorConfig: {
    reachPerReel: 75000,
    reachPerStory: 20000,
    reachPerUgc: 40000,
    adsMultiplier: 1.5,
    baseReachMin: 15000,
    maxReels: 4,
    maxStories: 6,
    maxUgc: 3,
    engagementText: "98% - 100%",
    delayText: "5 à 7 Jours"
  },
  messages: [],
  settings: {
    heroGreeting: "Bonjour",
    heroName: "Khadija_Nd",
    heroRole1: "Créatrice de contenu",
    heroRole2: "Influenceuse",
    heroRole3: "Model photo",
    heroRole4: "Maquilleuse",
    availability: "Ouverte aux collaborations 2026",
    heroCtaSimulate: "Simuler un partenariat ✦",
    heroCtaVideos: "Voir les vidéos",
    igFollowers: "68K+",
    tiktokFollowers: "105K+",
    igNumber: 68,
    tiktokNumber: 105,
    engagementRate: "100%",
    campaignsCount: "12+",
    aboutTitle: "Khadija_Nd",
    aboutP1: "Je suis créatrice de contenu et influenceuse, passionnée par le storytelling, l'image et le lien authentique avec une communauté engagée qui me suit au quotidien.",
    aboutP2: "J'accompagne les marques dans leur présence en ligne en imaginant des formats qui captent l'attention et racontent une histoire vraie, sans jamais sonner comme une publicité de plus.",
    aboutH1: "Formats courts ultra-viraux (Reels, TikTok) et séries longues",
    aboutH2: "Collaborations multi-secteurs : mode, beauté, lifestyle",
    aboutH3: "Communauté fidèle et réactive sur plusieurs plateformes",
    aboutH4: "Direction créative complète : du brief au rendu final HD",
    srv1Title: "Création de contenu & Reels",
    srv1Desc: "Vidéos, photos et stories pensées pour capter l'attention dès les 3 premières secondes. Inclut scénario, tournage 4K, montage dynamique et étalonnage.",
    srv2Title: "Partenariats de marque",
    srv2Desc: "Placements produits natifs, sponsorisations et co-créations respectant l'ADN de votre marque et les attentes de ma communauté.",
    srv2Price: "✦ Tarifs sur mesure selon format et droits d'usage",
    srv3Title: "UGC pour marques (Ads)",
    srv3Desc: "Contenus bruts ou montés prêts pour vos campagnes Meta / TikTok Ads, livrés aux formats optimisés 9:16 et 4:5.",
    srv4Title: "Égérie & Shooting photo",
    srv4Desc: "Model photo pour lookbooks, campagnes digitales et lancements de collections mode ou cosmétiques.",
    srv5Title: "Maquillage Professionnel & Beauty Looks",
    srv5Desc: "Prestations Make-Up artist d'exception pour shootings éditoriaux, défilés, tournages clips/vidéos, événements prestigieux et collaborations marques beauté. Maîtrise du teint glow, contouring haute définition et looks sur-mesure.",
    srv5Price: "✦ Sur devis & selon format d'événement",
    mkC1Title: "18 - 34 ans",
    mkC1Desc: "Cœur de cible jeune adulte, actif et prescripteur d'achats.",
    mkC2Title: "Audience Féminine",
    mkC2Desc: "Forte affinité cosmétiques, mode, soins et bien-être.",
    mkC3Title: "Portée Mensuelle",
    mkC3Desc: "Impressions cumulées sur Instagram et TikTok.",
    faqQ1: "Quels sont tes délais habituels de livraison ?",
    faqA1: "En général entre 5 et 10 jours ouvrés entre la validation du brief et la livraison finale, selon la complexité du format.",
    faqQ2: "Proposes-tu des droits d'utilisation pour des publicités (Ads) ?",
    faqA2: "Oui, des cessions de droits (Spark Ads, Meta Ads 1 à 6 mois) sont disponibles sur devis selon votre plan média.",
    faqQ3: "Comment s'articule la facturation et le contrat ?",
    faqA3: "Émission d'un devis et contrat clair, acompte de 50% au lancement puis solde à la livraison/publication.",
    contactEmail: "contact@khadija-nd.com",
    contactPhone: "",
    igHandle: "@khadija_nd",
    tiktokHandle: "@khadija_nd",
    youtubeUrl: "",
    pinterestUrl: "",
    creatorBio: "Créatrice de contenu, influenceuse et model photo. Donner vie à des récits visuels captivants et authentiques."
  }
};

class DataService {
  constructor() {
    this.init();
  }

  init() {
    // Initialiser les données si elles n'existent pas
    if (!localStorage.getItem(STORAGE_KEYS.contents)) {
      localStorage.setItem(STORAGE_KEYS.contents, JSON.stringify(INITIAL_DATA.contents));
    }
    if (!localStorage.getItem(STORAGE_KEYS.gallery)) {
      localStorage.setItem(STORAGE_KEYS.gallery, JSON.stringify(INITIAL_DATA.gallery));
    }
    if (!localStorage.getItem(STORAGE_KEYS.collabs)) {
      localStorage.setItem(STORAGE_KEYS.collabs, JSON.stringify(INITIAL_DATA.collabs));
    }
    if (!localStorage.getItem(STORAGE_KEYS.packs)) {
      localStorage.setItem(STORAGE_KEYS.packs, JSON.stringify(INITIAL_DATA.packs));
    }
    if (!localStorage.getItem(STORAGE_KEYS.simulator)) {
      localStorage.setItem(STORAGE_KEYS.simulator, JSON.stringify(INITIAL_DATA.simulatorConfig));
    }
    if (!localStorage.getItem(STORAGE_KEYS.messages)) {
      localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(INITIAL_DATA.messages));
    }
    if (!localStorage.getItem(STORAGE_KEYS.settings)) {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(INITIAL_DATA.settings));
    }
    if (!localStorage.getItem(STORAGE_KEYS.password)) {
      localStorage.setItem(STORAGE_KEYS.password, DEFAULT_PASSWORD);
    }
  }

  getLocal(key, fallback = []) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return JSON.parse(JSON.stringify(fallback));
      const parsed = JSON.parse(raw);
      return parsed;
    } catch (e) {
      return JSON.parse(JSON.stringify(fallback));
    }
  }

  setLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn("Stockage local saturé :", e);
      return false;
    }
  }

  // --- Mot de passe ---
  verifyPassword(enteredPassword) {
    const savedPassword = localStorage.getItem(STORAGE_KEYS.password) || DEFAULT_PASSWORD;
    return enteredPassword === savedPassword;
  }

  changePassword(oldPassword, newPassword) {
    if (!this.verifyPassword(oldPassword)) {
      return { success: false, message: "Le mot de passe actuel est incorrect." };
    }
    if (!newPassword || newPassword.trim().length < 4) {
      return { success: false, message: "Le nouveau mot de passe doit comporter au moins 4 caractères." };
    }
    localStorage.setItem(STORAGE_KEYS.password, newPassword.trim());
    return { success: true, message: "Clé d'accès modifiée avec succès ✦" };
  }

  // --- Conversion de liens TikTok/YouTube ---
  convertToEmbedUrl(url, linkType) {
    if (!url) return "";

    if (linkType === "youtube") {
      // YouTube: extraire l'ID de la vidéo
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (match) {
        // mute=1 requis pour autoplay sur la plupart des navigateurs
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&rel=0&playsinline=1`;
      }
      return url;
    }

    if (linkType === "tiktok") {
      // TikTok: convertir en format embed
      if (url.includes("tiktok.com")) {
        // Remplacer /video/ par /embed/ pour le lecteur TikTok
        if (url.includes("/video/")) {
          return url.replace("/video/", "/embed/");
        }
        return url;
      }
      return url;
    }

    return url; // video direct
  }

  // --- VIDÉOS & REELS ---
  async getContents() {
    return this.getLocal(STORAGE_KEYS.contents, INITIAL_DATA.contents);
  }

  async addContent(caption, videoUrl, category = "reels", linkType = "video") {
    const localList = this.getLocal(STORAGE_KEYS.contents, INITIAL_DATA.contents);
    const newOrder = localList.length > 0 ? Math.max(...localList.map(i => i.order_index || 0)) + 1 : 1;

    const newContent = {
      id: "c_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      caption: caption || "@khadija_nd",
      video: videoUrl || "",
      category: category || "reels",
      link_type: linkType || "video",
      order_index: newOrder,
      created_at: new Date().toISOString()
    };

    localList.unshift(newContent);
    this.setLocal(STORAGE_KEYS.contents, localList);
    return newContent;
  }

  async updateContent(id, { caption, video, category, link_type, order_index }) {
    let localList = this.getLocal(STORAGE_KEYS.contents, INITIAL_DATA.contents);
    const index = localList.findIndex(item => item.id === id);

    if (index !== -1) {
      if (caption !== undefined) localList[index].caption = caption;
      if (video !== undefined) localList[index].video = video;
      if (category !== undefined) localList[index].category = category;
      if (link_type !== undefined) localList[index].link_type = link_type;
      if (order_index !== undefined) localList[index].order_index = order_index;
      this.setLocal(STORAGE_KEYS.contents, localList);
      return localList[index];
    }
    return null;
  }

  async deleteContent(id) {
    let localList = this.getLocal(STORAGE_KEYS.contents, INITIAL_DATA.contents);
    localList = localList.filter(item => item.id !== id);
    this.setLocal(STORAGE_KEYS.contents, localList);
    return true;
  }

  async reorderContents(orderedIds) {
    let localList = this.getLocal(STORAGE_KEYS.contents, INITIAL_DATA.contents);
    const map = new Map(localList.map(i => [i.id, i]));
    const newList = [];

    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        item.order_index = idx + 1;
        newList.push(item);
      }
    });

    this.setLocal(STORAGE_KEYS.contents, newList);
    return newList;
  }

  // --- GALERIE ---
  async getGallery() {
    return this.getLocal(STORAGE_KEYS.gallery, INITIAL_DATA.gallery);
  }

  async addGalleryItem(caption, imageUrl, category = "mode") {
    const localList = this.getLocal(STORAGE_KEYS.gallery, INITIAL_DATA.gallery);
    const newOrder = localList.length > 0 ? Math.max(...localList.map(i => i.order_index || 0)) + 1 : 1;

    const newItem = {
      id: "g_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      caption: caption || "Univers Khadija_Nd",
      image: imageUrl || "",
      category: category || "mode",
      order_index: newOrder,
      created_at: new Date().toISOString()
    };

    localList.unshift(newItem);
    this.setLocal(STORAGE_KEYS.gallery, localList);
    return newItem;
  }

  async updateGalleryItem(id, { caption, image, category, order_index }) {
    let localList = this.getLocal(STORAGE_KEYS.gallery, INITIAL_DATA.gallery);
    const index = localList.findIndex(item => item.id === id);

    if (index !== -1) {
      if (caption !== undefined) localList[index].caption = caption;
      if (image !== undefined) localList[index].image = image;
      if (category !== undefined) localList[index].category = category;
      if (order_index !== undefined) localList[index].order_index = order_index;
      this.setLocal(STORAGE_KEYS.gallery, localList);
      return localList[index];
    }
    return null;
  }

  async deleteGalleryItem(id) {
    let localList = this.getLocal(STORAGE_KEYS.gallery, INITIAL_DATA.gallery);
    localList = localList.filter(item => item.id !== id);
    this.setLocal(STORAGE_KEYS.gallery, localList);
    return true;
  }

  async reorderGallery(orderedIds) {
    let localList = this.getLocal(STORAGE_KEYS.gallery, INITIAL_DATA.gallery);
    const map = new Map(localList.map(i => [i.id, i]));
    const newList = [];

    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        item.order_index = idx + 1;
        newList.push(item);
      }
    });

    this.setLocal(STORAGE_KEYS.gallery, newList);
    return newList;
  }

  // --- COLLABORATIONS ---
  async getCollabs() {
    return this.getLocal(STORAGE_KEYS.collabs, INITIAL_DATA.collabs);
  }

  async addCollab(name, logoUrl) {
    const localList = this.getLocal(STORAGE_KEYS.collabs, INITIAL_DATA.collabs);
    const newOrder = localList.length > 0 ? Math.max(...localList.map(i => i.order_index || 0)) + 1 : 1;

    const newItem = {
      id: "b_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: name || "Nouvelle Marque",
      logo: logoUrl || "",
      order_index: newOrder,
      created_at: new Date().toISOString()
    };

    localList.unshift(newItem);
    this.setLocal(STORAGE_KEYS.collabs, localList);
    return newItem;
  }

  async updateCollab(id, { name, logo, order_index }) {
    let localList = this.getLocal(STORAGE_KEYS.collabs, INITIAL_DATA.collabs);
    const index = localList.findIndex(item => item.id === id);

    if (index !== -1) {
      if (name !== undefined) localList[index].name = name;
      if (logo !== undefined) localList[index].logo = logo;
      if (order_index !== undefined) localList[index].order_index = order_index;
      this.setLocal(STORAGE_KEYS.collabs, localList);
      return localList[index];
    }
    return null;
  }

  async deleteCollab(id) {
    let localList = this.getLocal(STORAGE_KEYS.collabs, INITIAL_DATA.collabs);
    localList = localList.filter(item => item.id !== id);
    this.setLocal(STORAGE_KEYS.collabs, localList);
    return true;
  }

  // --- PACKS ---
  async getPacks() {
    return this.getLocal(STORAGE_KEYS.packs, INITIAL_DATA.packs);
  }

  async addPack(packData) {
    const localList = this.getLocal(STORAGE_KEYS.packs, INITIAL_DATA.packs);
    const newOrder = localList.length > 0 ? Math.max(...localList.map(i => i.order_index || 0)) + 1 : 1;

    const newPack = {
      id: "p_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      ...packData,
      order_index: newOrder,
      created_at: new Date().toISOString()
    };

    localList.push(newPack);
    this.setLocal(STORAGE_KEYS.packs, localList);
    return newPack;
  }

  async updatePack(id, packData) {
    let localList = this.getLocal(STORAGE_KEYS.packs, INITIAL_DATA.packs);
    const index = localList.findIndex(item => item.id === id);

    if (index !== -1) {
      localList[index] = { ...localList[index], ...packData };
      this.setLocal(STORAGE_KEYS.packs, localList);
      return localList[index];
    }
    return null;
  }

  async deletePack(id) {
    let localList = this.getLocal(STORAGE_KEYS.packs, INITIAL_DATA.packs);
    localList = localList.filter(item => item.id !== id);
    this.setLocal(STORAGE_KEYS.packs, localList);
    return true;
  }

  // --- SETTINGS ---
  async getSettings() {
    return this.getLocal(STORAGE_KEYS.settings, INITIAL_DATA.settings);
  }

  async updateSettings(settingsData) {
    const currentSettings = this.getLocal(STORAGE_KEYS.settings, INITIAL_DATA.settings);
    const updatedSettings = { ...currentSettings, ...settingsData };
    this.setLocal(STORAGE_KEYS.settings, updatedSettings);
    return updatedSettings;
  }

  // --- SIMULATOR CONFIG ---
  async getSimulatorConfig() {
    return this.getLocal(STORAGE_KEYS.simulator, INITIAL_DATA.simulatorConfig);
  }

  async updateSimulatorConfig(configData) {
    const currentConfig = this.getLocal(STORAGE_KEYS.simulator, INITIAL_DATA.simulatorConfig);
    const updatedConfig = { ...currentConfig, ...configData };
    this.setLocal(STORAGE_KEYS.simulator, updatedConfig);
    return updatedConfig;
  }

  // --- MESSAGES ---
  async getMessages() {
    return this.getLocal(STORAGE_KEYS.messages, INITIAL_DATA.messages);
  }

  async addMessage(messageData) {
    const localList = this.getLocal(STORAGE_KEYS.messages, INITIAL_DATA.messages);
    const newMessage = {
      id: "m_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      ...messageData,
      status: "nouveau",
      created_at: new Date().toISOString()
    };

    localList.unshift(newMessage);
    this.setLocal(STORAGE_KEYS.messages, localList);
    return newMessage;
  }

  async updateMessageStatus(id, status) {
    let localList = this.getLocal(STORAGE_KEYS.messages, INITIAL_DATA.messages);
    const index = localList.findIndex(item => item.id === id);

    if (index !== -1) {
      localList[index].status = status;
      this.setLocal(STORAGE_KEYS.messages, localList);
      return localList[index];
    }
    return null;
  }

  async deleteMessage(id) {
    let localList = this.getLocal(STORAGE_KEYS.messages, INITIAL_DATA.messages);
    localList = localList.filter(item => item.id !== id);
    this.setLocal(STORAGE_KEYS.messages, localList);
    return true;
  }

  // --- Méthodes utilitaires pour compatibilité ---
  getCredentials() {
    return { url: "", anonKey: "" };
  }

  saveCredentials(url, key) {
    // Ne rien faire - plus de Supabase
  }

  isConfigured() {
    return false;
  }

  async runFullDiagnostic(url, key) {
    return {
      overallSuccess: false,
      messages: ["LocalStorage mode - No cloud connection needed ✦"]
    };
  }

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) { resolve(""); return; }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async exportAllData() {
    return {
      contents: this.getLocal(STORAGE_KEYS.contents, INITIAL_DATA.contents),
      gallery: this.getLocal(STORAGE_KEYS.gallery, INITIAL_DATA.gallery),
      collabs: this.getLocal(STORAGE_KEYS.collabs, INITIAL_DATA.collabs),
      packs: this.getLocal(STORAGE_KEYS.packs, INITIAL_DATA.packs),
      simulator: this.getLocal(STORAGE_KEYS.simulator, INITIAL_DATA.simulatorConfig),
      messages: this.getLocal(STORAGE_KEYS.messages, INITIAL_DATA.messages),
      settings: this.getLocal(STORAGE_KEYS.settings, INITIAL_DATA.settings)
    };
  }

  async importAllData(data) {
    if (data.contents) this.setLocal(STORAGE_KEYS.contents, data.contents);
    if (data.gallery) this.setLocal(STORAGE_KEYS.gallery, data.gallery);
    if (data.collabs) this.setLocal(STORAGE_KEYS.collabs, data.collabs);
    if (data.packs) this.setLocal(STORAGE_KEYS.packs, data.packs);
    if (data.simulator) this.setLocal(STORAGE_KEYS.simulator, data.simulator);
    if (data.messages) this.setLocal(STORAGE_KEYS.messages, data.messages);
    if (data.settings) this.setLocal(STORAGE_KEYS.settings, data.settings);
    return true;
  }

  // Alias pour compatibilité
  async getSiteSettings() {
    return this.getSettings();
  }

  async saveSiteSettings(settings) {
    return this.updateSettings(settings);
  }

  async getContactMessages() {
    return this.getMessages();
  }

  async sendContactMessage(msgData) {
    return await this.addMessage(msgData);
  }

  async updateContactMessageStatus(id, status) {
    return await this.updateMessageStatus(id, status);
  }

  async deleteContactMessage(id) {
    return await this.deleteMessage(id);
  }

  async saveSimulatorConfig(config) {
    return this.updateSimulatorConfig(config);
  }

  async reorderPacks(orderedIds) {
    let localList = this.getLocal(STORAGE_KEYS.packs, INITIAL_DATA.packs);
    const map = new Map(localList.map(i => [i.id, i]));
    const newList = [];

    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        item.order_index = idx + 1;
        newList.push(item);
      }
    });

    this.setLocal(STORAGE_KEYS.packs, newList);
    return newList;
  }

  async reorderCollabs(orderedIds) {
    let localList = this.getLocal(STORAGE_KEYS.collabs, INITIAL_DATA.collabs);
    const map = new Map(localList.map(i => [i.id, i]));
    const newList = [];

    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        item.order_index = idx + 1;
        newList.push(item);
      }
    });

    this.setLocal(STORAGE_KEYS.collabs, newList);
    return newList;
  }
}

// Initialiser le service
window.dataService = new DataService();
