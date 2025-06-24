import { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { ThemeContext } from './contexts/ThemeContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import './App.scss';
import { MenuData } from './types';  // 移动 import 到非导入代码之前

const { Header: AntdHeader, Content } = Layout;  // 非导入代码放在所有 import 之后

const App = () => {
  const [currentMenu, setCurrentMenu] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [hasSubMenu, setHasSubMenu] = useState(false);

  // 模拟菜单数据（10个一级菜单）
  // 模拟菜单数据时添加类型注解
  const menuList: MenuData[] = Array.from({ length: 10 }, (_, index) => ({
    key: `menu${index + 1}`,
    name: `菜单${index + 1}`,
    subMenu: index !== 0 ? ['子菜单1', '子菜单2', '子菜单3'] : []
  }));

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ConfigProvider theme={{ token: theme === 'dark' ? { colorPrimary: '#303030' } : {} }}>
        <Layout className="app-layout">
          <AntdHeader className="app-header">
            <Header
              menuList={menuList}
              currentMenu={currentMenu}
              setCurrentMenu={setCurrentMenu}
              setHasSubMenu={setHasSubMenu}
            />
          </AntdHeader>
          <Content className={`app-content ${hasSubMenu ? 'with-submenu' : ''}`}>
            <MainContent currentMenu={currentMenu} />
          </Content>
        </Layout>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default App;
