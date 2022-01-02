import TotalViewItem from './TotalViewItem';
import { useEffect, useState } from 'react';
import { boardDummy } from '../../../../dummy/get-dummy';
import RightMenu from '../RightMenu/RightMenu';
import { logout } from '../../../../redux/authorization';
import { useDispatch } from 'react-redux';
import { deleteToken } from '../../../../function/localStorage';

interface boardDummyItem {
  id: string;
  name: string;
  available: boolean;
}

const TotalView = () => {
  const dispatch = useDispatch();
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    setBoardList(boardDummy);
  });
  const tryLogout = () => {
    deleteToken();
    dispatch(logout());
  };

  return (
    <div className="TotalView">
      <div id={'container'}>
        <div className={'banner'}></div>
        <div className={'leftSide'}>
          <div className={'userCard'}>
            <img className={'userImg'} />
            <p className={'nickName'}>자하연 금도끼</p>
            <p className={'school'}>이름</p>
            <p className={'school'}>id</p>
            <div className={'buttons'}>
              <button>내 정보</button>
              <button
                onClick={() => {
                  tryLogout();
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
          <div className={'left_menu'}>
            <li id={'my_post'}>내가 쓴 글</li>
            <li id={'my_comment'}>댓글 단 글</li>
            <li id={'my_clip'}>내 스크랩</li>
          </div>
          <div className={'ad'}>광고</div>
          <div className={'ad'}>광고</div>
          <div className={'ad'}>광고</div>
        </div>
        <div className={'rightSide'}>
          <input
            className={'searchBar'}
            placeholder={'전체 게시판의 글을 검색하세요!'}
          />
          <RightMenu />
        </div>
        <div className="TotalView__main">
          {boardList.map((item: boardDummyItem) => (
            <TotalViewItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalView;
