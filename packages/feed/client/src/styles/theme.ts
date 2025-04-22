import { type StyleFunctionProps, extendTheme } from '@chakra-ui/react';

import { colors } from './colors';

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: `${props.theme.colors.gray[900]} !important`,
        color: props.theme.colors.white,
      },
      '::-webkit-scrollbar': {
        webkitAppearance: 'none',
        width: '9px',
        height: '12px',
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: '4px',
        backgroundColor: props.theme.colors.gray[400],
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: props.theme.colors.gray[500],
      },
      html: {
        bg: props.theme.colors.gray[900],
        scrollBehavior: 'smooth',
        height: '100%',
      },
      'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
        {
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: props.theme.colors.white,
          transition: 'background-color 5000s ease-in-out 0s',
          boxShadow: 'inset 0 0 20px 20px transparent',
        },
    }),
  },
});

export default theme;
