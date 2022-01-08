import { useEffect, useState } from 'react';
import Comment from './Comment/Comment';
import { useHistory, useParams } from 'react-router-dom';
import request from '../../../../API/API';
import { getPostDetailAPI } from '../../../../API/postDetailAPI';
import Edit from './Edit';
import { postDeleteAPI } from '../../../../API/postAPI';

interface PostViewParams {
  boardId: string;
  postId: string;
}

interface BoardDetailItem {
  id: string;
  writer: string;
  title: string;
  content: string;
  number_of_likes: number;
  number_of_scrap: number;
  number_of_comments: string;
  tags: any;
  images: string;
  is_anonymous: boolean;
  is_question: boolean;
}

const PostView = () => {
  const history = useHistory();

  const getPostDetail = () => {
    getPostDetailAPI(parseInt(path.postId)).then((response) => {
      setPostDetail(response);
    });
  };

  const path = useParams<PostViewParams>();
  const [postDetail, setPostDetail] = useState<BoardDetailItem>({
    id: '',
    writer: '',
    title: '',
    content: '',
    number_of_likes: 0,
    number_of_scrap: 0,
    number_of_comments: '',
    images: '',
    tags: [],
    is_anonymous: false,
    is_question: false,
  });

  const [editPost, setEditPost] = useState<boolean>(false);

  const goBack = () => {
    history.goBack();
  };

  const deletePost = () => {
    console.log('d');
    const result = window.confirm('이 글을 삭제하시겠습니까?');
    if (result) {
      postDeleteAPI(path.postId);
      goBack();
    }
  };

  useEffect(() => {
    getPostDetail();
  }, [setPostDetail, path.boardId, path.postId, postDetail]);


  return editPost == false ? (
    <div className={'BoardView__post'}>
      <div className={'BoardView__post__profile'}>
        <div className={'BoardView__post__profile__img'}>사진</div>
        <div className={'BoardView__post__profile__name'}>
          <h3 className={'large'}>{postDetail.writer}</h3>
          <time>시간</time>
        </div>
        <ul>
          <li onClick={() => setEditPost(true)}>수정</li>
          <li onClick={deletePost}>삭제</li>
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
      <Comment writer={postDetail.writer} />
      <button onClick={goBack}>글 목록</button>
    </div>
  ) : (
    <>
      <Edit
        postDetail={postDetail}
        boardId={path.boardId}
        setEditPost={setEditPost}
      />
      <button className="goBackList" onClick={() => setEditPost(false)}>
        글 수정 취소
      </button>
    </>
  );
};

export default PostView;
