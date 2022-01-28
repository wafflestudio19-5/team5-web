import { useEffect, useState } from "react";
import { getMyPoint } from "../../../API/lectureAPI";
import { myPointType } from "../../../interface/interface";

const emptyMyPoint = {
  sum: 0,
  details: [],
};

const LecturePoint = () => {
  const [myPoint, setMyPoint] = useState<myPointType>(emptyMyPoint);

  useEffect(() => {
    getMyPoint().then((response) => {
      setMyPoint(response);
    });
  }, []);

  return (
    <div className="LecturePoint-wrapper">
      <div className="LecturePoint">
        <h3>내 포인트 내역</h3>
        <div className="LecturePoint__sum">
          총 포인트 <span className="point">{myPoint.sum}P</span>
        </div>
        <ul className="LecturePoint__history">
          {myPoint.details.map((detail) => {
            return (
              <li>
                <div className="point">
                  {detail.point >= 0 ? (
                    <div className="point">+{detail.point}</div>
                  ) : (
                    <div className="point minus">{detail.point}</div>
                  )}
                </div>
                <div className="name">{detail.reason}</div>
                <div className="date">{detail.created_at}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="LecturePoint-guide">
        <h3>포인트 제도 안내</h3>
        <ul>
          <li>
            포인트는 강의평가 서비스 내에서만 이용되는 제도입니다. 그 외의
            커뮤니티 활동 등에는 이용되지 않습니다.
          </li>
          <li>
            다른 계정으로 학교 인증 시 해당 계정으로 포인트가 합산되며, 기존
            계정의 포인트는 초기화됩니다.
          </li>
          <li>
            단, 다른 계정이더라도 학교 등이 변경될 경우에는 포인트가 합산되지
            않습니다.
          </li>
          <li>
            포인트 획득을 위해 허위/중복/성의없는 정보를 작성할 경우, 서비스
            이용이 영구 제한될 수 있습니다.
          </li>
          <li>허위 신고를 남용하는 이용자 또한 제재가 가해질 수 있습니다.</li>
        </ul>
        <h4>포인트 획득</h4>
        <ul>
          <li>강의평 작성: +10점</li>
          <li>시험 정보 공유: +20점</li>
          <li>신고 보상:+10점</li>
        </ul>
        <h4>포인트 차감</h4>
        <ul>
          <li>시험 정보 조회:-5점</li>
        </ul>
      </div>
    </div>
  );
};
export default LecturePoint;
