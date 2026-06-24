// src/theme/ThemeContext.tsx
import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, FONTS, lightTheme, SHADOW, SHADOW_BLUE } from './Theme';
// import { lightTheme, darkTheme, FONTS, SHADOW, SHADOW_BLUE } from './theme';

const ThemeContext = createContext(lightTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme();
  const theme = useMemo(() => (scheme === 'dark' ? darkTheme : lightTheme), [scheme]);

  const combinedTheme = {
    ...theme,
    FONTS,
    SHADOW,
    SHADOW_BLUE,
  };

  return <ThemeContext.Provider value={combinedTheme}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => useContext(ThemeContext);
