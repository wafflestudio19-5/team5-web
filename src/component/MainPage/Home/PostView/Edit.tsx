import { useEffect, useState } from 'react';
import { postInputType } from '../../../../interface/interface';
import {
  postDeleteAPI,
  postEditAPI,
  postPostAPI,
} from '../../../../API/postAPI';

interface BoardDetailItem {
  id: string;
  writer: string;
  title: string;
  content: string;
  number_of_likes: number;
  number_of_scrap: number;
  number_of_comments: string;
  images: string;
  tags: any;
  is_anonymous: boolean;
  is_question: boolean;
}

interface post {
  postDetail: BoardDetailItem;
  boardId: string;
  setEditPost: any;
}

const Edit = ({ postDetail, boardId, setEditPost }: post) => {
  const [postInput, setPostInput] = useState<postInputType>({
    title: '',
    content: '',
    tags: [],
    is_anonymous: false,
    is_question: false,
  });

  const updatePost = (input: postInputType) => {
    const form = new FormData();
    form.append('id', postDetail.id);
    form.append('title', input.title);
    form.append('content', input.content);
    form.append('tags', JSON.stringify(input.tags));
    form.append('is_anonymous', JSON.stringify(input.is_anonymous));
    form.append('is_question', JSON.stringify(input.is_question));
    postEditAPI(form, postDetail.id).then((response) => console.log(response));
    setEditPost(false);
  };

  useEffect(() => {
    setPostInput({
      title: postDetail.title,
      content: postDetail.content,
      tags: postDetail.tags,
      is_anonymous: postDetail.is_anonymous,
      is_question: postDetail.is_question,
    });
  }, []);

  return (
    <form
      className={'Write'}
      onSubmit={(event) => {
        event.preventDefault();
        updatePost(postInput);
      }}
    >
      <p className={'Write__title'}>
        <input
          className={'title'}
          name={'title'}
          autoComplete={'off'}
          placeholder={'글 제목'}
          value={postInput.title}
          onChange={(e) => {
            setPostInput({ ...postInput, title: e.target.value });
          }}
        />
      </p>
      <p className={'Write__content'}>
        <textarea
          className={'content'}
          name={'content'}
          autoComplete={'off'}
          placeholder={
            '에브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다. \n' +
            '\n' +
            '아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다. \n' +
            '\n' +
            '※ 정치·사회 관련 행위 금지 \n' +
            '- 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위 \n' +
            '- 정책·외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위 \n' +
            '- 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위 \n' +
            '- 위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위 \n' +
            '* 해당 게시물은 시사·이슈 게시판에만 작성 가능합니다. \n' +
            '\n' +
            '※ 홍보 및 판매 관련 행위 금지 \n' +
            '- 영리 여부와 관계 없이 사업체·기관·단체·개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위 \n' +
            '- 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭·단어 언급 행위 \n' +
            '* 해당 게시물은 홍보게시판에만 작성 가능합니다. \n' +
            '\n' +
            '※ 그 밖의 규칙 위반 \n' +
            '- 타인의 권리를 침해하거나 불쾌감을 주는 행위 \n' +
            '- 범죄, 불법 행위 등 법령을 위반하는 행위 \n' +
            '- 욕설, 비하, 차별, 혐오, 자살, 폭력 관련 내용을 포함한 게시물 작성 행위 \n' +
            '- 음란물, 성적 수치심을 유발하는 행위 \n' +
            '- 스포일러, 공포, 속임, 놀라게 하는 행위 '
          }
          value={postInput.content}
          onChange={(e) => {
            setPostInput({ ...postInput, content: e.target.value });
          }}
        />
      </p>
      <ul className={'option'}>
        <li title={'해시태그'} className={'hashtag'} />
        <li title={'첨부'} className={'attach'} />
        <li title={'완료'} className={'submit'}>
          <button type="submit"></button>
        </li>
        <li
          title={'익명'}
          className={postInput.is_anonymous ? 'anonymousActive' : 'anonymous'}
          onClick={() =>
            setPostInput((prev) => {
              return {
                ...prev,
                is_anonymous: !prev.is_anonymous,
              };
            })
          }
        />
        <li title={'질문'} className={'question'} />
      </ul>
    </form>
  );
};

export default Edit;
