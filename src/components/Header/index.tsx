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
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleMenuClick = (e: { key: string }) => {
    setCurrentMenu(e.key);
    // 显式拆分查找逻辑，明确处理 undefined 情况
    const foundItem = menuList.find((item: MenuData) => item.key === e.key);
    const hasSub = foundItem ? foundItem.subMenu.length > 0 : false;
    setHasSubMenu(hasSub);
  };

  const renderMenu = (item: MenuData) => {  // 显式声明item类型
    if (item.subMenu.length === 0) { 
      return (
        <Menu.Item key={item.key} onClick={handleMenuClick}>
          {item.name}
        </Menu.Item>
      );
    }
    return ( 
      <Menu.SubMenu  // 移除SubMenu上的onOpenChange（错误属性）
        key={item.key}
        title={item.name}
      >
        {item.subMenu.map((sub, index) => (
          <Menu.Item key={`${item.key}-sub${index}`} onClick={handleMenuClick}>
            {sub}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    );
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[currentMenu]}
      openKeys={openKeys}
      theme="light"
      className="header-menu"
      // 将onOpenChange移到Menu组件（正确位置），并声明keys类型
      onOpenChange={(keys: string[]) => setOpenKeys(keys)}
    >
      {menuList.map(renderMenu)}
    </Menu>
  );
};

export default Header;
