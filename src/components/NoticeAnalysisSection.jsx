import styles from "./NoticeAnalysisSection.module.css";

function NoticeAnalysisSection({ notice }) {
  if (!notice) return null;

  const {
    summary,
    recruitmentRegions = [],
    scheduleSteps = [],
    priorityConditions = [],
    supplyTargets = [],
    rentConditions = [],
    originalNotice,
  } = notice;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>AI NOTICE ANALYSIS</p>
          <h2>공고문 핵심 정보 분석</h2>
          <span>
            OCR/AI로 추출한 공고문 주요 정보를 화면에서 읽기 쉽게 정리했습니다.
          </span>
        </div>

        <div className={styles.actionGroup}>
          <a
            href={originalNotice?.pdfUrl || "#"}
            className={styles.outlineButton}
          >
            원문 공고문 보기
          </a>
          <a
            href={originalNotice?.applyUrl || "#"}
            className={styles.primaryButton}
          >
            공고 신청하러 가기
          </a>
        </div>
      </div>

      <div className={styles.summaryGrid}>
        <article>
          <span>공고대상</span>
          <strong>{summary?.target}</strong>
        </article>

        <article>
          <span>공급지역</span>
          <strong>{summary?.supplyAreas?.join(", ")}</strong>
        </article>

        <article>
          <span>모집규모</span>
          <strong>
            {summary?.recruitmentAreaText} / 총 {summary?.totalSupplyCount}호
          </strong>
        </article>

        <article>
          <span>최대 거주기간</span>
          <strong>{summary?.maxResidencePeriod}</strong>
        </article>

        <article>
          <span>보증금</span>
          <strong>{summary?.depositRange}</strong>
        </article>

        <article>
          <span>월 임대료</span>
          <strong>{summary?.monthlyRentRange}</strong>
        </article>
      </div>

      <div className={styles.keyPointBox}>
        <span>핵심 요약</span>
        <strong>{summary?.keyPoint}</strong>
      </div>

      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <h3>모집지역</h3>
          <span>
            {summary?.recruitmentAreaText} / 총 모집인원{" "}
            {summary?.totalSupplyCount}호
          </span>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>시·군·구</th>
                <th>주소</th>
                <th>주택유형</th>
                <th>모집인원</th>
              </tr>
            </thead>

            <tbody>
              {recruitmentRegions.map((item) => (
                <tr key={`${item.district}-${item.address}`}>
                  <td>{item.district}</td>
                  <td>{item.address}</td>
                  <td>{item.housingType}</td>
                  <td>{item.supplyCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <h3>상세 공급일정</h3>
          <span>공고문 일정표를 구조화한 데이터입니다.</span>
        </div>

        <div className={styles.timeline}>
          {scheduleSteps.map((step, index) => (
            <article
              key={`${step.title}-${index}`}
              className={`${styles.timelineItem} ${
                step.isHighlight ? styles.highlightTimeline : ""
              }`}
            >
              <div className={styles.timelineIndex}>{index + 1}</div>
              <strong>{step.title}</strong>
              <p>{step.date}</p>
              <span>{step.desc}</span>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <h3>공급순위</h3>
          <span>자격 및 상세조건 요약</span>
        </div>

        <div className={styles.priorityList}>
          {priorityConditions.map((item, index) => (
            <article
              key={`${item.rank}-${index}`}
              className={styles.priorityCard}
            >
              <div className={styles.rankBadge}>{item.rank}</div>
              <div>
                <strong>{item.qualification}</strong>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.twoColumn}>
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <h3>공급대상</h3>
            <span>주택별 공급 정보</span>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>주택명</th>
                  <th>주택유형</th>
                  <th>전용면적</th>
                  <th>성별</th>
                  <th>공급호수</th>
                </tr>
              </thead>

              <tbody>
                {supplyTargets.map((item) => (
                  <tr key={`${item.housingName}-${item.gender}`}>
                    <td>{item.housingName}</td>
                    <td>{item.housingType}</td>
                    <td>{item.exclusiveArea}</td>
                    <td>{item.gender}</td>
                    <td>{item.supplyCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <h3>임대조건</h3>
            <span>보증금 및 월 임대료</span>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>주택명</th>
                  <th>임대보증금</th>
                  <th>월 임대료</th>
                  <th>기숙사비</th>
                </tr>
              </thead>

              <tbody>
                {rentConditions.map((item) => (
                  <tr key={item.housingName}>
                    <td>{item.housingName}</td>
                    <td>{item.deposit}</td>
                    <td>{item.monthlyRent}</td>
                    <td>{item.maintenanceFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className={styles.noticeText}>
        ※ 본 정보는 OCR/AI 추출 결과를 기반으로 구성한 화면입니다. 실제 신청 전
        반드시 원문 공고문을 확인하세요.
      </p>
    </section>
  );
}

export default NoticeAnalysisSection;
