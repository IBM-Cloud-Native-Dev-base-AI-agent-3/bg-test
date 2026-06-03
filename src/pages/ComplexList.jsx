import { useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import ComplexListCard from "../components/Complex/ComplexListCard";
import { getComplexes } from "../api/complexApi";
import styles from "./ComplexList.module.css";

function ComplexList() {
  const [complexes, setComplexes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplexes = async () => {
      try {
        setIsLoading(true);
        const data = await getComplexes();
        setComplexes(data);
      } catch (error) {
        console.error(error);
        alert("공고 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplexes();
  }, []);

  return (
    <main className={styles.page}>
      <PageContainer>
        <section className={styles.hero}>
          <h1>2026년 공공임대 공고지도</h1>
          <p>
            지도와 공고문을 한눈에 확인하고, 원하는 공고의 상세 정보를
            확인하세요.
          </p>
        </section>

        {isLoading ? (
          <div className={styles.loadingBox}>
            공고 목록을 불러오는 중입니다...
          </div>
        ) : (
          <section className={styles.grid}>
            {complexes.map((complex) => (
              <ComplexListCard key={complex.id} complex={complex} />
            ))}
          </section>
        )}
      </PageContainer>
    </main>
  );
}

export default ComplexList;
