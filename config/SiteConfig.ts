import dotenv from 'dotenv';
import pkg from '../package.json';

dotenv.config();

const { CONTEXT, DEPLOY_PRIME_URL, GATSBY_ACTIVE_ENV, NODE_ENV } = process.env;
const BUILD_CONTEXT = GATSBY_ACTIVE_ENV || NODE_ENV || CONTEXT || 'development';

console.log('Using environment config', { BUILD_CONTEXT });

// BEGIN CONFIG HERE

// This is your domain usually. We will override it with URLs from your CI (netlify usually) for dev/testing if applicable.
const URL = 'https://www.madebystem.com';
const DEFAULT_DEV_URL = 'http://localhost:8000';

const getBaseUrl = () => {
  if (BUILD_CONTEXT === 'production') {
    return URL;
  }
  if (DEPLOY_PRIME_URL) {
    return DEPLOY_PRIME_URL;
  }
  return DEFAULT_DEV_URL;
};

const pathPrefix = '/';

const baseUrl = getBaseUrl() + pathPrefix;

const social = {
  twitter: {
    username: 'stephymiehle',
  },
  facebook: {
    username: 'madebystem',
  },
  instagram: {
    username: 'madebystem',
  },
};

const language = 'en';

const siteMetadata = {
  title: 'Made by Stem', // Site title.
  titleShort: 'Made by Stem', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  description: 'Ceramics, tools, crafts, and resources by Stephy Miehle', // Website description used for RSS feeds/meta description tag.
  pathPrefix,
  siteUrl: baseUrl,
  buildContext: BUILD_CONTEXT,
  version: pkg.version,
  social,
  language,
};

const googleAnalytics = {
  trackingId: process.env.GOOGLE_ANALYTICS_ID,
  anonymize: true,
  respectDNT: true,
};

const manifestOptions = {
  name: siteMetadata.title,
  short_name: siteMetadata.titleShort,
  description: siteMetadata.description,
  homepage_url: baseUrl,
  start_url: pathPrefix,
  background_color: '#fff',
  theme_color: '#48695f',
  icon: 'src/assets/images/favicon.svg',
  icon_options: {
    purpose: 'maskable',
  },
};

const ghostOptions = {
  apiUrl: process.env.GHOST_API_URL,
  contentApiKey: process.env.GHOST_CONTENT_KEY,
  version: 'v3',
};

export {
  baseUrl,
  siteMetadata,
  pathPrefix,
  googleAnalytics,
  social,
  manifestOptions,
  ghostOptions,
};
