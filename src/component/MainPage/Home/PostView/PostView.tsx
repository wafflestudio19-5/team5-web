import { useEffect, useState } from 'react';
import { getBoardDetailDummy } from '../../../../dummy/get-dummy';

interface PostViewParams {
  match: {
    params: {
      boardId: string;
      postId: string;
    };
  };
}

interface BoardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

const PostView = ({ match }: PostViewParams) => {
  const [postDetail, setPostDetail] = useState<BoardDetailDummyItem>({
    id: '',
    writer: '',
    title: '',
    content: '',
  });

  useEffect(() => {
    setPostDetail(
      getBoardDetailDummy(match.params.boardId).data.find(
        (x: { id: string }) => x.id === match.params.postId,
      ),
    );
  }, [setPostDetail, match.params.boardId, match.params.postId]);

  return (
    <div className={'BoardView__post'}>
      <div className={'BoardView__post__profile'}>
        <div className={'BoardView__post__profile__img'}>사진</div>
        <div className={'BoardView__post__profile__name'}>
          <h3 className={'large'}>{postDetail.writer}</h3>
          <time>시간</time>
        </div>
        <ul>
          <li>쪽지</li>
          <li>신고</li>
        </ul>
      </div>
      <h2 className={'large'}>{postDetail.title}</h2>
      <p className={'large'}>{postDetail.content}</p>
      <ul className={'status'}>
        <li className={'vote_active'}>10</li>
        <li className={'comment_active'}>10</li>
        <li className={'scrap_active'}>10</li>
      </ul>
      <br />
      <div className={'buttons'}>
        <span className={'sympathy'}>공감</span>
        <span className={'scrap'}>스크랩</span>
      </div>
    </div>
  );
};

export default PostView;
