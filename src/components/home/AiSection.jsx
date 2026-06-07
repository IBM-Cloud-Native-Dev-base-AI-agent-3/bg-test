import { useNavigate } from "react-router-dom";
import styles from "./AiSection.module.css";

function AiSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h2>
            더 이상 공고문 붙잡고
            <br />
            <span>헤매지 마세요.</span>
          </h2>

          <p className={styles.description}>
            본인의 소득, 자산, 가족 조건을 입력하시면
            <br />
            복잡한 공고문 대신 나에게 맞는 청약 조건과 결과를 알려드립니다.
          </p>

          <ul className={styles.featureList}>
            <li>
              {/* <span>✓</span> */}
              전국 모든 임대 공고 기반 자격 분석
            </li>
            <li>
              {/* <span>✓</span> */}
              가족과 기본 정보 기준 8가지 체크
            </li>
            <li>
              {/* <span>✓</span> */}
              맞춤 공고 추천과 AI 카운트 분석
            </li>
          </ul>

          <button
            type="button"
            className={styles.ctaButton}
            onClick={() => navigate("/rentalList")}
          >
            자격 체크 시작하기
            {/* <span>›</span> */}
          </button>
        </div>

        <div className={styles.right}>
          <div className={styles.mockPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.aiIcon}>AI</div>

              <div>
                <strong>당첨 분석 솔루션</strong>
                <p>Real-time diagnosis</p>
              </div>
            </div>

            <div className={styles.resultBox}>
              <span>신청 가능 공고</span>
              <strong>24건</strong>
            </div>

            <div className={styles.resultBoxActive}>
              <span>예상 당첨 확률</span>
              <strong>82%</strong>
              <p>내 조건 분석 기준</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiSection;
