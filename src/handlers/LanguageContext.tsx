import React, { createContext, useState, useContext, FC } from 'react';

export type LanguageItem = {
  id: number;
  name: string;
  code: string;
  selected: boolean;
};

export type SettingType = {
  languages: LanguageItem[];
  onSetLanguages: (code: string) => void;
};

export const LanguageContext = createContext<SettingType | undefined>(undefined);

export const LanguageProvider: any = ({ children }: any) => {
  const initialState: LanguageItem[] = [
    { id: 1, name: 'English', code: 'en', selected: true },
    { id: 2, name: 'VietNam', code: 'vn', selected: false },
  ];

  const [languages, setLanguages] = useState<LanguageItem[]>(initialState);
  const onSetLanguages = (code:string) =>{
    const newLanguages = languages.map((item) => {
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
    setLanguages(newLanguages)
  }
  return (
    <LanguageContext.Provider value={{ languages, onSetLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
