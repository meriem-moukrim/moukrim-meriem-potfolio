/**
 * Fichier de configuration des APIs Node de Gatsby.
 * Ce fichier permet de personnaliser la création des pages, la configuration Webpack,
 * et de définir précisément le schéma GraphQL pour éviter les erreurs de données manquantes.
 */

const path = require('path');

// API Gatsby pour créer des pages dynamiquement.
// Note : Le dossier 'posts' ayant été supprimé, cette fonction est actuellement vide.
exports.createPages = async () => {
  // Les pages de blog et de tags ne sont plus générées.
};

// Modification de la configuration Webpack.
// Utilisé ici pour gérer les alias de chemins et éviter les erreurs SSR avec certaines librairies.
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

// Personnalisation du schéma GraphQL.
// On définit explicitement les champs du Frontmatter pour éviter que Gatsby ne plante si un champ est absent dans un fichier Markdown.
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String
      date: Date @dateformat
      github: String
      external: String
      tech: [String]
      showInProjects: Boolean
      slug: String
      company: String
      location: String
      range: String
      url: String
      certificate: File @fileByRelativePath
      cover: File @fileByRelativePath
      fullscreen: String
      tech_icons: [File] @fileByRelativePath
      description: String
      tags: [String]
      draft: Boolean
      ios: String
      android: String
    }
  `;
  createTypes(typeDefs);
};
