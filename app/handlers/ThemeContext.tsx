import React, {createContext, useState, useContext} from 'react';

export type ThemeItem = {
  id: number;
  name: string;
  code: string;
  selected: boolean;
};

export type SettingType = {
  themes: ThemeItem[];
  onSetTheme: (code: string) => void;
};

export const ThemeContext = createContext<SettingType | undefined>(undefined);

export const ThemeProvider: any = ({children}: any) => {
  const initialState: ThemeItem[] = [
    {id: 1, name: 'Light Mode', code: 'light', selected: true},
    {id: 2, name: 'Dark Mode', code: 'dark', selected: false},
  ];

  const [themes, setThemes] = useState<ThemeItem[]>(initialState);
  const onSetTheme = (code: string) => {
    const newLanguages = themes.map(item => {
      if (item.code === code) {
        return {
          ...item,
          selected: true,
        };
      }
      return {
        ...item,
        selected: false,
      };
    });
    setThemes(newLanguages);
  };
  return (
    <ThemeContext.Provider value={{themes, onSetTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemes = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
