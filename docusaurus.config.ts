import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'OpenSearch: From Zero to Foundations',
  tagline: 'Learn OpenSearch basics in 15 minutes',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://isaactorresmichel.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/opensearch-from-zero-to-foundations/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'isaactorresmichel', // Usually your GitHub org/user name.
  projectName: 'opensearch-from-zero-to-foundations', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'OpenSearch: From Zero to Foundations',
      logo: {
        alt: 'OpenSearch',
        src: 'img/favicon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://opensearch.org',
          label: 'Official Site',
          position: 'right',
        },
        {
          href: 'https://opensearch.org/docs/',
          label: 'Docs',
          position: 'right',
        },
        {
          href: 'https://github.com/opensearch-project/OpenSearch',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Get Started',
              to: '/docs/intro',
            },
            {
              label: 'Core Concepts',
              to: '/docs/core-concepts',
            },
            {
              label: 'Resources',
              to: '/docs/resources',
            },
          ],
        },
        {
          title: 'OpenSearch Project',
          items: [
            {
              label: 'Official Site',
              href: 'https://opensearch.org',
            },
            {
              label: 'Documentation',
              href: 'https://opensearch.org/docs/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/opensearch-project',
            },
            {
              label: 'Community Forum',
              href: 'https://discuss.opensearchproject.org',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Docker Hub',
              href: 'https://hub.docker.com/r/opensearchproject/opensearch',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@opensearchproject',
            },
          ],
        },
      ],
      copyright: `Built by Isaac with ❤️ and OpenSearch`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
