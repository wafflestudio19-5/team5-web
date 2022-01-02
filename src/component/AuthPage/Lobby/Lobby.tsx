import LoginAndRegister from "../../common/LoginAndRegister";

const Lobby = () => {
  return (
    <div className="Lobby">
      <div className="Lobby__Introduce"></div>
      <nav className="Lobby__RightBar">
        <section className="Lobby__Login">
          <div className="Lobby__Logo"></div>
          <LoginAndRegister />
        </section>
        <section>
          <ul className="Lobby__UnivList"></ul>
        </section>
      </nav>
    </div>
  );
};

export default Lobby;
