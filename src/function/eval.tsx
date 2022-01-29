import { NewEvalType, NewTestType } from "../interface/interface";

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

const testTypeData: string[] = [
  "중간고사",
  "기말고사",
  "1차",
  "2차",
  "3차",
  "4차",
  "기타",
];

const questionTypeData = [
  "객관식",
  "주관식",
  "T/F형",
  "약술형",
  "논술형",
  "구술",
  "기타",
];

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

export const newTestForm = (
  setter: Function,
  targetObject: NewTestType,
  sem_option: string[]
) => {
  return (
    <div className="eval-form">
      <p className="mini-title">응시한 시험</p>
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
      <div className="question">
        <div className="question-name">종류</div>
        <select
          value={targetObject.exam}
          onChange={(e) => {
            setter({ ...targetObject, ["exam"]: e.target.value });
          }}
        >
          {testTypeData.map((test, index) => {
            return <option value={index}>{test}</option>;
          })}
        </select>
      </div>
      <p className="mini-title">시험 전략</p>
      <textarea
        onChange={(e) => {
          setter({ ...targetObject, ["strategy"]: e.target.value });
        }}
        value={targetObject.strategy}
        placeholder="시험에 대한 전략, 공부 방법, 노하우를 자유롭게 적어주세요."
      />
      <p className="mini-title">문제 유형</p>
      <div className="question">
        <div className="question-name">(복수 선택)</div>
        {questionTypeData.map((option) => {
          const isSelected = targetObject.types.indexOf(option);
          return (
            <div
              className={`option ${isSelected >= 0 ? "selected" : null}`}
              onClick={() => {
                if (isSelected >= 0) {
                  const deleteArray = targetObject.types;
                  deleteArray.splice(isSelected, 1);
                  setter({ ...targetObject, types: deleteArray });
                } else {
                  const addArray = targetObject.types;
                  addArray.push(option);
                  setter({ ...targetObject, types: addArray });
                }
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
      <p className="mini-title">문제 예시</p>
      <p className="example-example">
        예) 게임이론의 정의와 두 가지 이상의 사례를 작성하시오.
      </p>
      <ol>
        {targetObject.examples.map((example, index) => {
          return (
            <li key={index}>
              <input
                type="text"
                onChange={(e) => {
                  const newArray = targetObject.examples;
                  newArray.splice(index, 1, e.target.value);
                  setter({ ...targetObject, examples: newArray });
                }}
                value={example}
              />
            </li>
          );
        })}
      </ol>
      <div
        className="add-example"
        onClick={() => {
          setter({ ...targetObject, examples: [...targetObject.examples, ""] });
        }}
      >
        +더 입력하기
      </div>
      <input type="submit" value="공유하기 (+20P)" />
    </div>
  );
};

export const timetableQueryQuestion = (
  key: string,
  label: string,
  data: { name: string; val: string }[],
  value: string | undefined,
  setter: Function
) => {
  return (
    <div className="question">
      <div className="label">{label}</div>
      <div className="options">
        {data.map((datum) => (
          <div
            className={`option ${value === datum.val ? "selected" : ""}`}
            onClick={() => {
              setter(key, datum.val);
            }}
          >
            {datum.name}
          </div>
        ))}
      </div>
    </div>
  );
};
