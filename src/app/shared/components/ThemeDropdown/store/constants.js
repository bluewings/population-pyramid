import entries from 'object.entries';

const IS_APP_SENTINEL = '@@__WIDGET_TABLE__@@';

const CLASSNAME_PREFIX = 'rsf-';

const CLASSNAMES = entries({
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  PHONE: 'phone',
  LANDSCAPE_PHONE: 'landscape-phone',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  LARGE_DESKTOP: 'large-desktop',
}).reduce((prev, [key, value]) => ({
  ...prev,
  [key]: CLASSNAME_PREFIX + value,
}), {});

const TYPE = {
  ARRAY: 'array',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  OBJECT: 'object',
  STRING: 'string',
};

const SIZES = {
  DEFAULT: 'default',
  SMALL: 'small',
  LARGE: 'large',
  MD: 'md',
  SM: 'sm',
  LG: 'lg',
};

const {
  XS, SM, MD, LG, XL, 
  PHONE, LANDSCAPE_PHONE, TABLET, DESKTOP, LARGE_DESKTOP, 
} = CLASSNAMES;

const mediaBreakpoints = [
  [1280, XL, LARGE_DESKTOP],
  [992, LG, DESKTOP],
  [768, MD, TABLET],
  [576, SM, LANDSCAPE_PHONE],
  [0, XS, PHONE],
];

export {
  IS_APP_SENTINEL,
  CLASSNAME_PREFIX,
  CLASSNAMES,
  TYPE,
  SIZES,
  mediaBreakpoints,
};
