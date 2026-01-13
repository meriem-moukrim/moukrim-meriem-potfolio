/**
 * Fichier de configuration globale du site.
 * Regroupe les paramètres comme l'email, les réseaux sociaux, et la navigation.
 */
module.exports = {
  // L'adresse e-mail affichée et utilisée pour le bouton de contact
  email: 'moukrim.meriem.dev2026@gmail.com',

  // Liste des réseaux sociaux affichés dans les barres latérales et le pied de page
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/meriem-moukrim',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/meriemmoukrim/',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/212684993907',
    },
  ],

  navLinks: [
    {
      name: 'À propos',
      url: '/#about',
    },
    {
      name: 'Compétences',
      url: '/#skills',
    },
    {
      name: 'Expérience',
      url: '/#jobs',
    },
    {
      name: 'Projets',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
