import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MaNoir Documentation',
  tagline: 'Your smart home, your way.',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://manoir-app.github.io',
  baseUrl: '/',

  organizationName: 'manoir-app',
  projectName: 'manoir-app.github.io',
  trailingSlash: false,

  onBrokenLinks: 'throw',

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
          editUrl:
            'https://github.com/manoir-app/manoir-app.github.io/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'MaNoir',
      logo: {
        alt: 'MaNoir Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'installationSidebar',
          position: 'left',
          label: 'Installation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'userGuideSidebar',
          position: 'left',
          label: 'User Guide',
        },
        {
          type: 'docSidebar',
          sidebarId: 'developerSidebar',
          position: 'left',
          label: 'Developer',
        },
        {
          href: 'https://github.com/manoir-app',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Installation',
          items: [
            {label: 'Overview', to: '/docs/installation'},
            {label: 'Requirements', to: '/docs/installation/requirements'},
            {label: 'Deployment', to: '/docs/installation/deployment'},
          ],
        },
        {
          title: 'User Guide',
          items: [
            {label: 'Administration', to: '/docs/user-guide/administration'},
            {label: 'Home Automation', to: '/docs/user-guide/home-automation'},
            {label: 'Daily Life', to: '/docs/user-guide/daily-life'},
            {label: 'Possessions', to: '/docs/user-guide/possessions'},
          ],
        },
        {
          title: 'Developer',
          items: [
            {label: 'Plugin Guide', to: '/docs/developer/plugins'},
            {label: 'GitHub', href: 'https://github.com/manoir-app'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MaNoir. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
