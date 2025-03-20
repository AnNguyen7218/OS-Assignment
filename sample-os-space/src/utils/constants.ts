export const LOGO =
  'https://cdn.prod.website-files.com/67518d4f9d25de09cbcd2d4f/67518d4f9d25de09cbcd2d62_opensend-logo.svg';
export const BASE_URL = 'https://stgapp-bwgkn3md.opensend.com';

export const ERROR_CODE = {
  AUTH_EMAIL_NOTFOUND: 'AUTH_EMAIL_NOTFOUND',
  AUTH_PASSWORD_MISMATCHED: 'AUTH_PASSWORD_MISMATCHED'
};
export const SEPARATOR = ':: ';
export const WIDGETS = [
  {
    id: '0',
    icon: 'fa-id-card',
    title: 'Identities Provided',
    description: 'New identities provided during the selected time period.'
  },
  {
    id: '1',
    title: 'Opened Message',
    icon: 'fa-message',
    description:
      'Number of provided identities who opened emails during the selected time period.'
  },
  {
    id: '2',
    title: 'Clicked',
    icon: 'fa-computer-mouse',
    description:
      'Number of provided identities who clicked on emails for the time period.'
  }
];
export const LAYOUT_CONFIG = {
  lg: [
    { x: 0, y: 0, w: 2, h: 2, i: '0', minW: 2, minH: 2, maxW: 6 },
    { x: 2, y: 0, w: 2, h: 2, i: '1', minW: 2, minH: 2, maxW: 6 },
    { x: 4, y: 0, w: 2, h: 2, i: '2', minW: 2, minH: 2, maxW: 6 }
  ]
};
