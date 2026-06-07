import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/mypage.css"; 
import RentalListCon from "../../pages/RentalListCon";

const MyPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    fetch("/api/v1/users/me", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`유저 정보 로드 실패 (상태코드: ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("마이페이지 에러:", error);
        alert("유저 정보를 불러오지 못했습니다. 다시 로그인해 주세요.");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isLoggedIn, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="mypage-wrapper">
      <div className="mypage-container">
        {/* 상단 파란색 배너 섹션 */}
        {/* <header className="header-banner">
          <div className="header-text-wrapper">
            <h1 className="header-title">마이 페이지</h1>
          </div>
        </header> */}

        {/* 카드 리스트 섹션 */}
        <div className="card-list">
          {userInfo ? (
            <>
              {/* 프로필 이미지 카드 */}
              <div className="card">
                <div className="card-header">
                  <span className="icon">👤</span>
                  <span className="card-label">프로필 이미지</span>
                </div>
                <div className="card-body">
                  {userInfo.profileImageUrl ? (
                    <img
                      src={userInfo.profileImageUrl}
                      alt="프로필"
                      className="profile-img"
                    />
                  ) : (
                    <div className="profile-img-placeholder">이미지 없음</div>
                  )}
                  {/* <span className="status-tag">활성화됨</span> */}
                </div>
                <div>
                  {/* 닉네임 카드 */}
                  <div className="card">
                    <div className="card-header">
                      <span className="icon">🏷️</span>
                      <span className="card-label">닉네임</span>
                    </div>
                    <div className="card-body">
                      <h2 className="card-value">
                        {userInfo.nickname || "정보 없음"}
                      </h2>
                      {/* <span className="info-tag">본인 확인 완료</span> */}
                    </div>
                  </div>

                  {/* 이메일 카드 */}
                  <div className="card">
                    <div className="card-header">
                      <span className="icon">✉️</span>
                      <span className="card-label">이메일 주소</span>
                    </div>
                    <div className="card-body">
                      <h2 className="card-value">
                        {userInfo.email || "정보 없음"}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-data-card">사용자 정보가 존재하지 않습니다.</div>
          )}
        </div>
      </div>
      <RentalListCon />
    </div>
  );
};

export default MyPage;
