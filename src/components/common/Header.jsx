import styles from "./Header.module.css";

import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const menuList = [
    { id: 0, name: "공고지도", path: "/complexes" },
    { id: 1, name: "공고지도", path: "/complexes" },
    { id: 2, name: "공고지도", path: "/complexes" },
    { id: 3, name: "공고지도", path: "/complexes" },
    { id: 4, name: "공고지도", path: "/complexes" },
  ];

  return (
    <>
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

          {/* 로그인 */}
          <button>로그인</button>
        </div>
      </header>
    </>
  );
};

export default Header;
