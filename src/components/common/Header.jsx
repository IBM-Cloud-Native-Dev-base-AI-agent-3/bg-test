import styles from "./Header.module.css";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// 🌟 1. authSlice 대신 { logout } 액션을 직접 가져옵니다.
import { logout } from "../../redux/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 리덕스 스토어에서 로그인 상태와 유저네임 가져오기
  const { isLoggedIn, username } = useSelector((state) => state.auth);

  const onLogout = async (e) => {
    e.preventDefault();

    if (!window.confirm("로그아웃 하시겠습니까?")) return;

    try {
      // 백엔드에게 보안 쿠키(HttpOnly) 만료 요청
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(
        "백엔드 로그아웃 통신 실패:",
        error,
      );
    } finally {
      // 🌟 2. 프론트엔드 로그인 흔적 싹 청소하기 (세션스토리지 + 리덕스 초기화)
      dispatch(logout());
      alert("로그아웃 되었습니다.");
      navigate("/login");
    }
  };

  const menuList = [
    { id: 0, name: "공고지도", path: "/complexes" },
    { id: 1, name: "공고지도", path: "/complexes" },
    { id: 2, name: "신청자격진단", path: "/rental" },
    { id: 3, name: "공고지도", path: "/complexes" },
    { id: 4, name: "공고지도", path: "/complexes" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* 로고 */}
        <Link to="/" className={styles.logoArea}>
          <span className={styles.logo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Apple"
              role="img"
              viewBox="0 0 512 512"
            >
              <path d="m0 0H512V512H0" fill="#fff" />
              <path d="m406 335s-9 30-26 54-31 47-60 47c-23 0-35-15-61-15s-42 15-64 15-33-15-50-35c-44-55-62-146-38-194s59-58 84-58 48 16 63 16 38-17 68-17 59 13 74 38c-49 27-64 115 10 149M327 56c5 36-27 89-76 88-5-42 32-85 76-88" />
            </svg>
          </span>
        </Link>

        {/* 메뉴 */}
        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menuList.map((menu) => (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.menuLink} ${styles.active}`
                      : styles.menuLink
                  }
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* 로그인 / 로그아웃 상태 분기 피드 */}
        <ul className={styles.login_wrap}>
          {isLoggedIn ? (
            <>
              <li><span>{username}</span>님</li>
              <li>
                {/* 🌟 onClick 이벤트가 들어가므로 to="#" 이나 버튼 태그로 감싸는게 좋습니다 */}
                <Link to="#" onClick={onLogout}>
                  로그아웃
                </Link>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
