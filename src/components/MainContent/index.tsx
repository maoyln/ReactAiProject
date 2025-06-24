import { Divider } from 'antd';

type MainContentProps = {
  currentMenu: string;
};

const MainContent = ({ currentMenu }: MainContentProps) => {
  return (
    <div className="main-content">
      <h2>当前内容区域：{currentMenu}</h2>
      <Divider />
      <p>这里显示{currentMenu}对应的业务内容...</p>
    </div>
  );
};

export default MainContent;
