import { Feature } from './types';

export const LAYOUT_OPTIONS = {
  GRID: 'grid',
  LIST: 'list',
  COMPACT: 'compact',
} as const;

export type LayoutOptions = (typeof LAYOUT_OPTIONS)[keyof typeof LAYOUT_OPTIONS];

export const THEMES = {
  WHITELABEL: 'whitelabel',
  VINK: 'vink',
  NAANTALI: 'naantali',
  RAISIO: 'raisio',
  KAARINA: 'kaarina',
  TAI: 'tai',
} as const;

export type Themes = (typeof THEMES)[keyof typeof THEMES];

export const DATA_ATTRIBUTES = [
  'audience',
  'description',
  'features',
  'keywords',
  'language',
  'layout',
  'linkText',
  'linkUrl',
  'numOfVisibleResults',
  'openInNewWindow',
  'search',
  'showEmbedTool',
  'showSearch',
  'theme',
  'timeEnd',
  'timeStart',
  'title',
  'typeId',
] as const;

export type DataAttributes = (typeof DATA_ATTRIBUTES)[number];

export const freeTranslated = {
  fi: 'ilmainen',
  sv: 'gratis',
  en: 'free',
};

export const virtualEventTranslated = {
  fi: 'virtuaalinen',
  sv: 'virtuell',
  en: 'virtual',
};

export const features: Feature[] = [
  {
    label: freeTranslated,
    value: 'is_free=true',
  },
  {
    label: virtualEventTranslated,
    value: 'virtual=true',
  },
];

export const DateShortcut = {
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  THIS_WEEK: 'thisWeek',
  CURRENT_MONTH: 'currentMonth',
  RESET: 'reset',
} as const;

export type DateShortcutType = (typeof DateShortcut)[keyof typeof DateShortcut];
