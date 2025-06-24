import { Menu } from 'antd';
import { useState } from 'react';
import { MenuData } from '../../types';  // 引入公共类型

type HeaderProps = {
  menuList: MenuData[];
  currentMenu: string;
  setCurrentMenu: (key: string) => void;
  setHasSubMenu: (has: boolean) => void;
};

const Header = ({ menuList, currentMenu, setCurrentMenu, setHasSubMenu }: HeaderProps) => {
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);

  const handleMenuClick = (e: { key: string }) => {
    const targetMenu = menuList.find(item => item.key === e.key);
    
    if (targetMenu?.subMenu.length) {
      const firstSubKey = `${e.key}-sub0`;
      setSelectedSubMenu(firstSubKey);
      setCurrentMenu(firstSubKey);
      setHasSubMenu(true);
    } else {
      setSelectedSubMenu(null);
      setCurrentMenu(e.key);
      setHasSubMenu(false);
    }
  };

  const renderMainMenu = (item: MenuData) => (
    <Menu.Item 
      key={item.key} 
      onClick={handleMenuClick}
      // 删除多余的 selected 属性（由外层 Menu 的 selectedKeys 自动控制）
    >
      {item.name}
    </Menu.Item>
  );

  return (
    <div className="header-container">
      <Menu
        mode="horizontal"
        selectedKeys={menuList.some(item => item.key === currentMenu && !item.subMenu.length) ? [currentMenu] : []}
        theme="light"
        className="header-main-menu"
      >
        {menuList.map(renderMainMenu)}
      </Menu>

      {(() => {
        const mainMenuKey = currentMenu?.split('-')[0];
        const targetMainMenu = mainMenuKey ? menuList.find(item => item.key === mainMenuKey) : undefined;
        
        // 显式类型检查：确认 targetMainMenu 和 subMenu 存在且长度大于0
        if (targetMainMenu && targetMainMenu.subMenu && targetMainMenu.subMenu.length > 0) {
          return (
            <Menu
              mode="horizontal"
              selectedKeys={[selectedSubMenu || '']}
              theme="light"
              className="header-sub-menu"
              onClick={e => {
                setCurrentMenu(e.key);
                setSelectedSubMenu(e.key);
              }}
            >
              {/* 此时 TypeScript 已确认 targetMainMenu 和 subMenu 非空 */}
              {targetMainMenu.subMenu.map((sub: string, index: number) => (
                <Menu.Item key={`${mainMenuKey}-sub${index}`}>
                  {sub}
                </Menu.Item>
              ))}
            </Menu>
          );
        }
        return null;
      })()}
    </div>
  );
};

export default Header;
