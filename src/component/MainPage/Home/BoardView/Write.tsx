import { useState } from "react";
import { postInputType } from "../../../../interface/interface";
import { postPostAPI } from "../../../../API/postAPI";
import { toastErrorData } from "../../../../API/errorHandling";

interface WriteParams {
  boardId: number;
  setReloading: Function;
  openWrite: Function;
}

const initialPostInput = {
  title: "",
  content: "",
  tags: [],
  is_anonymous: false,
  is_question: false,
};

const Write = ({ boardId, setReloading, openWrite }: WriteParams) => {
  const [postInput, setPostInput] = useState<postInputType>(initialPostInput);

  const checkHashtag = (inputContent: string) => {
    const newTag: string[] = [];
    const content = inputContent
      .replaceAll("\n", " ")
      .split(" ")
      .filter((word) => word.length > 0);
    content.forEach((word) => {
      let source = word;
      let target = source.indexOf("#");
      while (target >= 0) {
        const nextTarget = source.indexOf("#", target + 1);
        if (nextTarget > 0) {
          const newHash = source.substring(target, nextTarget);
          if (newHash.length > 1) {
            newTag.push(newHash);
          }
        } else {
          const newHash = source.substring(target);
          if (newHash.length > 1) {
            newTag.push(newHash);
          }
        }
        target = nextTarget;
      }
    });
    return newTag;
  };

  const writePost = (board: number, input: postInputType) => {
    postPostAPI(board, {
      ...input,
      tags: checkHashtag(input.content),
    }).then(
      () => {
        openWrite();
        setReloading(true);
      },
      (error) => {
        toastErrorData(error.response.data);
      }
    );
  };

  return (
    <form
      className={"Write"}
      onSubmit={(event) => {
        event.preventDefault();
        writePost(boardId, postInput);
      }}
    >
      <p className={"Write__title"}>
        <input
          className={"title"}
          name={"title"}
          autoComplete={"off"}
          placeholder={"글 제목"}
          value={postInput.title}
          onChange={(e) => {
            setPostInput({ ...postInput, title: e.target.value });
          }}
        />
      </p>
      <p className={"Write__content"}>
        <textarea
          className={"content"}
          name={"content"}
          autoComplete={"off"}
          placeholder={
            "에브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다. \n" +
            "\n" +
            "아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다. \n" +
            "\n" +
            "※ 정치·사회 관련 행위 금지 \n" +
            "- 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위 \n" +
            "- 정책·외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위 \n" +
            "- 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위 \n" +
            "- 위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위 \n" +
            "* 해당 게시물은 시사·이슈 게시판에만 작성 가능합니다. \n" +
            "\n" +
            "※ 홍보 및 판매 관련 행위 금지 \n" +
            "- 영리 여부와 관계 없이 사업체·기관·단체·개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위 \n" +
            "- 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭·단어 언급 행위 \n" +
            "* 해당 게시물은 홍보게시판에만 작성 가능합니다. \n" +
            "\n" +
            "※ 그 밖의 규칙 위반 \n" +
            "- 타인의 권리를 침해하거나 불쾌감을 주는 행위 \n" +
            "- 범죄, 불법 행위 등 법령을 위반하는 행위 \n" +
            "- 욕설, 비하, 차별, 혐오, 자살, 폭력 관련 내용을 포함한 게시물 작성 행위 \n" +
            "- 음란물, 성적 수치심을 유발하는 행위 \n" +
            "- 스포일러, 공포, 속임, 놀라게 하는 행위 "
          }
          value={postInput.content}
          onChange={(e) => {
            setPostInput({ ...postInput, content: e.target.value });
          }}
        />
      </p>
      {postInput.is_question && (
        <p className={"question_description"}>
          질문 글을 작성하면 게시판 상단에 일정 기간 동안 노출되어, 더욱 빠르게
          답변을 얻을 수 있게 됩니다.
          <br />
          또한, 다른 학우들이 정성껏 작성한 답변을 유지하기 위해, 댓글이 달린
          이후에는 <b>글을 수정 및 삭제할 수 없습니다.</b>
        </p>
      )}
      <ul className={"option"}>
        <li
          title={"해시태그"}
          className={"hashtag"}
          onClick={() => {
            setPostInput({ ...postInput, content: postInput.content + "#" });
          }}
        />
        <li title={"첨부"} className={"attach"} />
        <li title={"완료"} className={"submit"}>
          <button type="submit" />
        </li>
        <li
          title={"익명"}
          className={postInput.is_anonymous ? "anonymousActive" : "anonymous"}
          onClick={() => {
            setPostInput({
              ...postInput,
              is_anonymous: !postInput.is_anonymous,
            });
          }}
        />
        <li
          title={"질문"}
          className={postInput.is_question ? "questionActive" : "question"}
          onClick={() => {
            setPostInput({
              ...postInput,
              is_question: !postInput.is_question,
            });
          }}
        />
      </ul>
    </form>
  );
};
export default Write;
