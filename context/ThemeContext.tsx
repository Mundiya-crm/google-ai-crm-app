
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'sleek-carbon' | 'oceanic-blue' | 'classic-light' | 'windows-aero' | 'minty-fresh' | 'sakura-pink' | 'matrix-green' | 'sunset-glow' | 'aero-noir';
type ButtonStyle = 'sharp' | 'rounded';

interface ThemeContextType {
  theme: Theme;
  buttonStyle: ButtonStyle;
  setTheme: (theme: Theme) => void;
  setButtonStyle: (style: ButtonStyle) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('windows-aero');
  const [buttonStyle, setButtonStyleState] = useState<ButtonStyle>('rounded');

  useEffect(() => {
    // This check ensures localStorage is only accessed on the client-side
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('crm-theme') as Theme | null;
        const savedButtonStyle = localStorage.getItem('crm-button-style') as ButtonStyle | null;
        if (savedTheme) setThemeState(savedTheme);
        if (savedButtonStyle) setButtonStyleState(savedButtonStyle);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('crm-theme', newTheme);
    setThemeState(newTheme);
  };

  const setButtonStyle = (newStyle: ButtonStyle) => {
    localStorage.setItem('crm-button-style', newStyle);
    setButtonStyleState(newStyle);
  };
  
  useEffect(() => {
    // This effect should only run on the client, as it accesses the DOM.
    if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        root.classList.remove(
            'theme-sleek-carbon', 
            'theme-oceanic-blue', 
            'theme-classic-light', 
            'theme-windows-aero',
            'theme-minty-fresh',
            'theme-sakura-pink',
            'theme-matrix-green',
            'theme-sunset-glow',
            'theme-aero-noir'
        );
        root.classList.add(`theme-${theme}`);
        
        root.classList.remove('buttons-sharp', 'buttons-rounded');
        root.classList.add(`buttons-${buttonStyle}`);
    }
  }, [theme, buttonStyle]);

  return (
    <ThemeContext.Provider value={{ theme, buttonStyle, setTheme, setButtonStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
