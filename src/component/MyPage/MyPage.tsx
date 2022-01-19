const MyPage = () => {
  return (
    <div className={"SubMenu"}>
      <ul>
        계정
        <li>비밀번호 변경</li>
        <li>이메일 변경</li>
      </ul>

      <ul>
        커뮤니티
        <li>닉네임 설정</li>
        <li>커뮤니티 이용규칙</li>
      </ul>

      <ul>
        기타
        <li>회원 탈퇴</li>
      </ul>
    </div>
  );
};

export default MyPage;
