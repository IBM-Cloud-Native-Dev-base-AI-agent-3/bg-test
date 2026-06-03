import { useState } from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import { predictHopeHousing } from "../../api/hopeHousingApi";
import styles from "./HopeHousingPredictionGrid.module.css";

function createPredictionRequestBody(complex) {
  return {
    complex_name: complex?.name || "연남공공원룸텔",
    gender: "여성",
    is_parents_homeless: true,
    is_applicant_disabled: false,
    is_parents_disabled: false,
    subscription_count: 24,
    is_priority1_eligible: true,
    is_recipient: true,
    is_single_parent_family: false,
    income_percent: 80,
    total_asset: 100000000,
    car_value: 0,
    is_income_under50: false,
  };
}

function HopeHousingPredictionGrid({ complex }) {
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePredict = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const requestBody = createPredictionRequestBody(complex);
      const data = await predictHopeHousing(requestBody);

      setPredictionResult(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "당첨 확률 예측 결과를 불러오지 못했습니다. FastAPI 서버 실행 여부를 확인해주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const gridData = predictionResult
    ? [
        [
          predictionResult.announcement_name,
          predictionResult.application_type,
          predictionResult.applicant_rank,
          predictionResult.user_score,
          predictionResult.previous_cutline,
          predictionResult.competition_rate,
          `${predictionResult.win_probability}%`,
          predictionResult.result,
        ],
      ]
    : [];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>AI PREDICTION</p>
          <h2>희망하우징 당첨 확률 예측</h2>
          <span>
            자격진단 데이터와 이전 커트라인, 경쟁률을 기반으로 당첨 가능성을
            예측합니다.
          </span>
        </div>

        <button
          type="button"
          className={styles.predictButton}
          onClick={handlePredict}
          disabled={isLoading}
        >
          {isLoading ? "예측 중..." : "당첨 확률 예측하기"}
        </button>
      </div>

      {errorMessage && <div className={styles.errorBox}>{errorMessage}</div>}

      {!predictionResult && !errorMessage && (
        <div className={styles.emptyBox}>
          버튼을 누르면 FastAPI 예측 결과가 Grid.js 테이블로 표시됩니다.
        </div>
      )}

      {predictionResult && (
        <>
          <div className={styles.resultSummary}>
            <div>
              <span>당첨 확률</span>
              <strong>{predictionResult.win_probability}%</strong>
            </div>

            <div>
              <span>내 점수</span>
              <strong>{predictionResult.user_score}점</strong>
            </div>

            <div>
              <span>이전 커트라인</span>
              <strong>{predictionResult.previous_cutline}점</strong>
            </div>

            <div
              className={
                predictionResult.result === "당첨 가능"
                  ? styles.successResult
                  : styles.failResult
              }
            >
              <span>예측 결과</span>
              <strong>{predictionResult.result}</strong>
            </div>
          </div>

          <div className={styles.gridWrap}>
            <Grid
              columns={[
                "공고명",
                "신청유형",
                "신청순위",
                "내 점수",
                "이전 커트라인",
                "경쟁률",
                "당첨 확률",
                "결과",
              ]}
              data={gridData}
              search={false}
              sort={false}
              pagination={false}
            />
          </div>
        </>
      )}

      <p className={styles.noticeText}>
        ※ 현재 요청값은 테스트용 더미 자격진단 데이터입니다. 추후 회원의 실제
        자격진단 결과와 공고 데이터를 연결해 요청값을 구성하면 됩니다.
      </p>
    </section>
  );
}

export default HopeHousingPredictionGrid;
