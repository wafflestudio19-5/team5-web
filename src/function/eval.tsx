import { NewEvalType } from "../interface/interface";

interface formType {
  key:
    | "assignment"
    | "team_project"
    | "grade"
    | "attendance"
    | "exam"
    | "rating";
  name: string;
  options: { label: string; value: number }[];
}

const evalScoreData: formType[] = [
  {
    key: "assignment",
    name: "과제",
    options: [
      { label: "많음", value: 2 },
      { label: "보통", value: 1 },
      { label: "없음", value: 0 },
    ],
  },
  {
    key: "team_project",
    name: "조모임",
    options: [
      { label: "많음", value: 2 },
      { label: "보통", value: 1 },
      { label: "없음", value: 0 },
    ],
  },
  {
    key: "grade",
    name: "성적",
    options: [
      { label: "너그러움", value: 2 },
      { label: "보통", value: 1 },
      { label: "깐깐함", value: 0 },
    ],
  },
  {
    key: "attendance",
    name: "출결",
    options: [
      { label: "혼용", value: 4 },
      { label: "직접호명", value: 3 },
      { label: "지정좌석", value: 2 },
      { label: "전자출결", value: 1 },
      { label: "반영안함", value: 0 },
    ],
  },
  {
    key: "exam",
    name: "시험 횟수",
    options: [
      { label: "네번이상", value: 4 },
      { label: "세번", value: 3 },
      { label: "두번", value: 2 },
      { label: "한번", value: 1 },
      { label: "없음", value: 0 },
    ],
  },
];

const evalRatingData: formType = {
  key: "rating",
  name: "총점",
  options: [
    { label: "1점", value: 1 },
    { label: "2점", value: 2 },
    { label: "3점", value: 3 },
    { label: "4점", value: 4 },
    { label: "5점", value: 5 },
  ],
};

const dataToQuestion = (
  key:
    | "assignment"
    | "team_project"
    | "grade"
    | "attendance"
    | "exam"
    | "rating",
  name: string,
  options: { label: string; value: number }[],
  targetObject: NewEvalType,
  setter: Function
) => {
  return (
    <div className="question">
      <div className="question-name">{name}</div>
      {options.map((option) => {
        return (
          <div
            className={`option ${
              targetObject[key] === option.value ? "selected" : null
            }`}
            onClick={() => {
              setter({ ...targetObject, [key]: option.value });
            }}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  );
};

export const newEvalForm = (
  setter: Function,
  targetObject: NewEvalType,
  sem_option: string[]
) => {
  return (
    <div className="eval-form">
      <p className="mini-title">성적 반영</p>
      <div className="score">
        {evalScoreData.map((item) => {
          return dataToQuestion(
            item.key,
            item.name,
            item.options,
            targetObject,
            setter
          );
        })}
      </div>
      <div className="total">
        <p className="mini-title">총평</p>
        {dataToQuestion(
          evalRatingData.key,
          evalRatingData.name,
          evalRatingData.options,
          targetObject,
          setter
        )}
        <div className="question">
          <div className="question-name">수강학기</div>
          <select
            value={targetObject.semester}
            onChange={(e) => {
              setter({ ...targetObject, ["semester"]: e.target.value });
            }}
          >
            <option value="">수강학기 선택</option>
            {sem_option.map((opt) => {
              return <option value={opt}>{opt}</option>;
            })}
          </select>
        </div>
        <textarea
          onChange={(e) => {
            setter({ ...targetObject, ["content"]: e.target.value });
          }}
          value={targetObject.content}
          placeholder={
            "이 강의에 대한 총평을 적어주세요. (등록 후에는 수정 및 삭제가 불가능하므로 신중히 적어주세요!)"
          }
        />
      </div>
      <input type="submit" value="작성하기 (+10P)" />
    </div>
  );
};
