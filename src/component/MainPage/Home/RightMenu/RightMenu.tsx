const RightMenu = () => {
  return (
    <>
      <ul className={'RightMenu__board'}>
        <li className={'RightMenu__board-name'}>
          <h3>실시간 인기 글</h3>
        </li>
        <li className={'RightMenu__board-item1'}>
          <p>내용</p>
          <h4>게시판종류</h4>
          <ul className={'status'}>
            <li className={'vote_active'}>10</li>
            <li className={'comment_active'}>10</li>
          </ul>
        </li>
        <li className={'RightMenu__board-item1'}>
          <p>내용</p>
          <h4>게시판종류</h4>
          <ul className={'status'}>
            <li className={'vote_active'}>10</li>
            <li className={'comment_active'}>10</li>
          </ul>
        </li>
      </ul>
      <ul className={'TotalView__card'}>
        <li className={'RightMenu__board-name'}>
          <h3>HOT 게시물</h3>
          <span>더보기</span>
        </li>
        <li className={'RightMenu__board-item2'}>
          <p>내용</p>
        </li>
        <li className={'RightMenu__board-item2'}>
          <p>내용</p>
        </li>
        <li className={'RightMenu__board-item2'}>
          <p>내용</p>
        </li>
        <li className={'RightMenu__board-item2'}>
          <p>내용</p>
        </li>
      </ul>
      <ul className={'sideBest'}>
        <li className={'RightMenu__board-name'}>
          <h3>BEST 게시판</h3>
          <span>더보기</span>
        </li>
      </ul>
      <ul className={'sideLecEval'}>
        <li className={'RightMenu__board-name'}>
          <h3>최근 강의평</h3>
        </li>
        <li className={'RightMenu__board-item3'}>
          <span className={'star'}>
            <span className={'onStar'} />
          </span>
          <p className={'title'}>물리학2 : 김경태</p>
          <p className={'small'}>내용</p>
        </li>
      </ul>
    </>
  );
};

export default RightMenu;
