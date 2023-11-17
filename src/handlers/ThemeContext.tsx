import React, { createContext, useState, useContext, FC } from 'react';

export type ThemeItem = {
  id: number;
  name: string;
  code: string;
  selected: boolean;
};

export type SettingType = {
  themes: ThemeItem[];
  setThemes: React.Dispatch<React.SetStateAction<ThemeItem[]>>;
};

export const ThemeContext = createContext<SettingType | undefined>(undefined);

export const ThemeProvider: any = ({ children } : any) => {
  const initialState: ThemeItem[] = [
    { id: 1, name: 'Light Mode', code: 'light', selected: true },
    { id: 2, name: 'Dark Mode', code: 'dark', selected: false },
  ];

  const [themes, setThemes] = useState<ThemeItem[]>(initialState);

  return (
    <ThemeContext.Provider value={{ themes, setThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
