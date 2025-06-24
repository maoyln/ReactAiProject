import { createContext } from 'react';

export type ThemeContextType = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  // 修正默认函数的参数类型（原无参数）
  setTheme: (theme: 'light' | 'dark') => {},  // 添加参数类型注解
});
