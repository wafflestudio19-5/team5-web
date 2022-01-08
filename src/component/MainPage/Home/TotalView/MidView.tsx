import TotalViewItem from './TotalViewItem';
import { useEffect, useState } from 'react';
import { getBoardAPI } from '../../../../API/boardAPI';
import { boardItemType } from '../../../../interface/interface';

const MidView = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    getBoardAPI().then((res) => setBoardList(res));
  }, []);
  return (
    <div className={'midViewWrapper'}>
      <img
        className={'banner'}
        src={'https://cf-eba.everytime.kr/20220101_kosaf_scholarship_home.jpg'}
      />
      <div className="TotalView__main">
        {boardList.map((item: boardItemType) => (
          <TotalViewItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MidView;
