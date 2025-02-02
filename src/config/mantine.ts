import { createTheme } from '@mantine/core';

import { MantineThemeOverride } from '@mantine/core';

export const mantineTheme: MantineThemeOverride = createTheme({
  /** Put your mantine theme override here */
  defaultRadius: 'xs',
  lineHeights: {
    md: 2,
  },
  components: {
    Input: {
      defaultProps: {
        radius: 'xs',
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'xs',
      },
    },
    Button: {
      styles: {
        root: {
          border: '1px solid #323232',
          color: '#303030',
          backgroundColor: '#fff',
        },
      },
    },
  },
});
