import {StyleSheet, Text, View, useColorScheme, Appearance} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {darkTheme, defaultTheme} from '../theme/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === 'dark' ? darkTheme : defaultTheme,
  );
  // const [load, setLoad] = useState(true);

  // useEffect(() => {
  //   setLoad(true);
  //   const subscription = Appearance.addChangeListener(({colorScheme}) => {
  //     setTheme(colorScheme);
  //     setLoad(false);
  //     console.log('Color scheme changed:', colorScheme);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  return (
    <ThemeContext.Provider value={{theme}}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const styles = StyleSheet.create({});
