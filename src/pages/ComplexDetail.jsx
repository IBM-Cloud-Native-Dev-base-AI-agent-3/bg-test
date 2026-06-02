import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getComplexDetail } from "../api/complexApi";

import styles from "./ComplexDetail.module.css";
import PageContainer from "../components/layout/PageContainer";
import NoticeAnalysisSection from "../components/Complex/NoticeAnalysisSection";
import ComplexCompetitionChart from "../components/Complex/ComplexCompetitionChart";
import OdsayTransitSection from "../components/Complex/OdsayTransitSection";
function ComplexDetail() {
  const { id } = useParams();

  const [complex, setComplex] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplexDetail = async () => {
      try {
        setIsLoading(true);

        const data = await getComplexDetail(id);

        setComplex(data);
        setSelectedType(data.housingTypes?.[0]?.type || "");
      } catch (error) {
        console.error(error);
        alert("단지 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplexDetail();
  }, [id]);

  const housingTypes = complex?.housingTypes || [];

  const selectedHousingType = useMemo(() => {
    return (
      housingTypes.find((item) => item.type === selectedType) ||
      housingTypes[0] ||
      null
    );
  }, [housingTypes, selectedType]);

  if (isLoading) {
    return (
      <main className={styles.loading}>단지 정보를 불러오는 중입니다...</main>
    );
  }

  if (!complex) {
    return (
      <main className={styles.loading}>단지 정보를 찾을 수 없습니다.</main>
    );
  }

  const heroImage = complex.imageUrl;

  return (
    <main className={styles.page}>
      <PageContainer>
        <div className={styles.detailLayout}>
          <section
            className={styles.hero}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 4, 19, 0.08) 0%, rgba(0, 4, 19, 0.82) 100%), url(${heroImage})`,
            }}
          >
            <div className={styles.heroContent}>
              <div className={styles.badgeGroup}>
                <span className={styles.blueBadge}>{complex.supplyType}</span>
                <span className={styles.greenBadge}>
                  {complex.isRecruiting ? "모집공고 활성" : "공고 분석 활성"}
                </span>
              </div>

              <h1>{complex.name}</h1>

              <p>{complex.address}</p>
            </div>
          </section>

          <section className={styles.infoCard}>
            <div className={styles.sectionTitleRow}>
              <h2>단지 종합 제원 및 수치 분석</h2>
            </div>

            <select
              className={styles.typeSelect}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {housingTypes.map((item) => (
                <option key={item.type} value={item.type}>
                  {item.type} 신혼특공, 일반
                </option>
              ))}
            </select>

            <div className={styles.specGrid}>
              <div>
                <span>주소 :</span>
                <strong>{complex.address}</strong>
              </div>

              <div>
                <span>예비자모집호수 :</span>
                <strong>{selectedHousingType?.householdCount || "-"}호</strong>
              </div>

              <div>
                <span>공급면적 :</span>
                <strong>{selectedHousingType?.supplyArea || "-"}</strong>
              </div>

              <div>
                <span>전용면적 :</span>
                <strong>{selectedHousingType?.exclusiveArea || "-"}</strong>
              </div>

              <div>
                <span>난방 :</span>
                <strong>
                  {complex.basicInfo?.find((item) => item.label === "난방 방식")
                    ?.value || "-"}
                </strong>
              </div>

              <div>
                <span>최대거주기간 :</span>
                <strong>20년</strong>
              </div>

              <div>
                <span>공급형 :</span>
                <strong>{selectedHousingType?.type || "-"}</strong>
              </div>

              <div>
                <span>지하철역 :</span>
                <strong className={styles.blueText}>
                  {complex.nearestStation
                    ? `${complex.nearestStation.name} / ${complex.nearestStation.line}`
                    : "-"}
                </strong>
              </div>

              <div>
                <span>공급대상 :</span>
                <strong>{complex.rentType}</strong>
              </div>
            </div>
          </section>

          <section className={styles.rentCard}>
            <table className={styles.rentTable}>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>보증금</th>
                  <th>임대료</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td rowSpan="3">일반공급</td>
                  <td>
                    <span>최대</span>
                    <strong>{selectedHousingType?.deposit || "-"}</strong>
                  </td>
                  <td>
                    <strong>0원</strong>
                    <small>월 전체 계약</small>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span>기본</span>
                    <strong>{selectedHousingType?.deposit || "-"}</strong>
                    <em>전환 10%</em>
                  </td>
                  <td>
                    <strong>{selectedHousingType?.monthlyRent || "-"}</strong>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span>최소</span>
                    <strong>100,000,000원</strong>
                  </td>
                  <td>
                    <strong>640,000원</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <NoticeAnalysisSection notice={complex.noticeAnalysis} />

          <section className={styles.reportCard}>
            <p className={styles.eyebrow}>PREMIUM INSIGHT REPORT</p>
            <h2>경쟁률 및 공고 이력 분석</h2>

            <ComplexCompetitionChart
              competitionRates={complex.competitionRates || []}
              complexName={complex.name}
            />
          </section>

          <OdsayTransitSection complex={complex} />

          <section className={styles.historyCard}>
            <h2>모집공고이력</h2>

            {(complex.recruitmentHistory || []).map((item) => (
              <div key={item.id} className={styles.historyItem}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </section>

          {/* <section className={styles.nearbyCard}>
            <h2>주변정보</h2>

            <div className={styles.nearbyGrid}>
              {(complex.nearbyInfo || []).map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section> */}
        </div>
      </PageContainer>
    </main>
  );
}

export default ComplexDetail;
