import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  installationSidebar: [
    {type: 'doc', id: 'installation/index', label: 'Overview'},
    {
      type: 'category',
      label: 'Self-Host Installation',
      items: [
        'installation/requirements',
        'installation/deployment',
        'installation/configuration',
        'installation/upgrade',
      ],
    },
  ],

  userGuideSidebar: [
    {type: 'doc', id: 'user-guide/index', label: 'Overview'},
    {
      type: 'category',
      label: 'Administration',
      items: [
        'user-guide/administration/index',
        'user-guide/administration/users',
        'user-guide/administration/roles',
        'user-guide/administration/settings',
      ],
    },
    {
      type: 'category',
      label: 'Home Automation',
      items: [
        'user-guide/home-automation/index',
        'user-guide/home-automation/devices',
        'user-guide/home-automation/automations',
        'user-guide/home-automation/scenes',
      ],
    },
    {
      type: 'category',
      label: 'Daily Life Management',
      items: [
        'user-guide/daily-life/index',
        'user-guide/daily-life/calendar',
        'user-guide/daily-life/tasks',
        'user-guide/daily-life/shopping',
      ],
    },
    {
      type: 'category',
      label: 'Possession Management',
      items: [
        'user-guide/possessions/index',
        'user-guide/possessions/inventory',
        'user-guide/possessions/categories',
        'user-guide/possessions/maintenance',
      ],
    },
  ],

  developerSidebar: [
    {type: 'doc', id: 'developer/index', label: 'Overview'},
    {
      type: 'category',
      label: 'Implementing Plugins',
      items: [
        'developer/plugins/index',
        'developer/plugins/getting-started',
        'developer/plugins/api-reference',
        'developer/plugins/publishing',
      ],
    },
  ],
};

export default sidebars;
