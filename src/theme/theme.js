import colors from './colors';

export const defaultTheme = {
  backgroundColor: colors.white,
  primaryTextColor: colors.black,
  secondaryTextColor: '#404040',
  info: colors.info,
  primaryColor: colors.primary,
  secondaryColor: '#EFEFEF',
  borderColor: colors.border,
  accent: colors.accent,
  activeGreen: 'green',
  nav: {
    backgroundColor: colors.white,
    active: colors.primary,
    inActive: '#808080',
  },
};

export const darkTheme = {
  backgroundColor: '#202124',
  primaryTextColor: colors.white,
  secondaryTextColor: colors.lightgrey,
  info: '#87D3F8',
  primaryColor: colors.primary,
  secondaryColor: '#333333',
  borderColor: '#808080',
  accent: colors.accent,
  activeGreen: '#33FF33',
  nav: {
    backgroundColor: colors.white,
    active: colors.primary,
    inActive: colors.lightgrey,
  },
};
