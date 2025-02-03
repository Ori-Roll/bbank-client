import { createTheme, TextInput } from '@mantine/core';

import { MantineThemeOverride } from '@mantine/core';

export const mantineTheme: MantineThemeOverride = createTheme({
  /** Put your mantine theme override here */
  defaultRadius: 'xs',
  components: {
    Input: {
      defaultProps: {
        radius: 'xs',
      },
      styles: {
        input: {
          border: '1px solid #323232',
          color: '#353535',
          backgroundColor: '#fff',
          fontWeight: 600,
        },
      },
    },
    Button: {
      styles: {
        root: {
          border: '1px solid #323232',
          color: '#353535',
          backgroundColor: '#fff',
          fontWeight: 600,
        },
      },
    },
  },
});
