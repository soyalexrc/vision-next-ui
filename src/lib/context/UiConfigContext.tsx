import React, { createContext, useState, useContext } from 'react';

export const UiConfigContext = createContext<{
  viewStyle: 'grid' | 'list';
  setViewStyle: (style: 'grid' | 'list') => void;
}>({
  viewStyle: 'grid',
  setViewStyle: () => {},
});

export const useUiConfig = () => useContext(UiConfigContext);

export const UiConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('list');
  console.log('here');
  const value = {
    viewStyle,
    setViewStyle,
  };

  return <UiConfigContext.Provider value={value}>{children}</UiConfigContext.Provider>;
};
