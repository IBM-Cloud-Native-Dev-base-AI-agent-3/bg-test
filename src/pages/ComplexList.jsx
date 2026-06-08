import { useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import ComplexListCard from "../components/Complex/ComplexListCard";
import { getComplexes } from "../api/complexApi";
import styles from "./ComplexList.module.css";

function ComplexList() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const data = await getComplexes();
        setAnnouncements(data);
      } catch (error) {
        console.error(error);
        alert("모집공고 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <main className={styles.page}>
      <PageContainer>
        <section className={styles.hero}>
          <p>ANNOUNCEMENT LIST</p>
          <h1>모집공고</h1>
          <span>
            LH, SH 등 공공임대 모집공고를 한눈에 확인하고 상세 공급정보를
            비교해보세요.
          </span>
        </section>

        {isLoading ? (
          <div className={styles.loadingBox}>
            모집공고를 불러오는 중입니다...
          </div>
        ) : (
          <section className={styles.grid}>
            {announcements.map((announcement) => (
              <ComplexListCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
          </section>
        )}
      </PageContainer>
    </main>
  );
}

export default ComplexList;
