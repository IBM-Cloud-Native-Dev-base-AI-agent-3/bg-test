import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import { getComplexDetail } from "../api/complexApi";
import styles from "./ComplexDetail.module.css";
import OdsayTransitSection from "../components/Complex/OdsayTransitSection";

const FALLBACK_IMAGE =
  "https://placehold.co/1000x640/eef4ff/0057ff?text=Announcement";

function DataTable({ table }) {
  if (!table || !table.columns || !table.rows) {
    return <div className={styles.emptyBox}>표 데이터가 없습니다.</div>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ImageGrid({ images }) {
  if (!images || images.length === 0) {
    return <div className={styles.emptyBox}>이미지 데이터가 없습니다.</div>;
  }

  return (
    <div className={styles.imageGrid}>
      {images.map((image) => (
        <div key={image.id} className={styles.infoImageBox}>
          <img src={image.imageUrl} alt={image.alt || "이미지"} />
        </div>
      ))}
    </div>
  );
}

// function createKakaoSearchUrl(address) {
//   return `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;
// }

function ComplexDetail() {
  const { id } = useParams();

  const [announcement, setAnnouncement] = useState(null);
  const [selectedHouseId, setSelectedHouseId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setIsLoading(true);
        const data = await getComplexDetail(id);

        setAnnouncement(data);
        setSelectedHouseId(data.houseInfoList?.[0]?.id || "");
      } catch (error) {
        console.error(error);
        alert("모집공고 상세 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  const houseInfoList = announcement?.houseInfoList || [];

  const selectedHouse = useMemo(() => {
    return (
      houseInfoList.find((house) => house.id === selectedHouseId) ||
      houseInfoList[0] ||
      null
    );
  }, [houseInfoList, selectedHouseId]);

  const selectedAddress = useMemo(() => {
    return announcement?.addresses?.find(
      (address) => address.houseId === selectedHouse?.id,
    );
  }, [announcement, selectedHouse]);

  const selectedHouseImages = useMemo(() => {
    return (
      announcement?.houseImages?.filter(
        (image) => image.houseId === selectedHouse?.id,
      ) || []
    );
  }, [announcement, selectedHouse]);

  const selectedFloorPlans = useMemo(() => {
    return (
      announcement?.floorPlans?.filter(
        (image) => image.houseId === selectedHouse?.id,
      ) || []
    );
  }, [announcement, selectedHouse]);

  if (isLoading) {
    return (
      <main className={styles.loading}>
        모집공고 상세 정보를 불러오는 중입니다...
      </main>
    );
  }

  if (!announcement) {
    return <main className={styles.loading}>모집공고를 찾을 수 없습니다.</main>;
  }

  return (
    <main className={styles.page}>
      <PageContainer>
        <div className={styles.detailLayout}>
          <section className={styles.hero}>
            <div className={styles.heroText}>
              <div className={styles.badgeRow}>
                <span>{announcement.announcementType}</span>
                <span>{announcement.status}</span>
                <span>{announcement.source}</span>
              </div>

              <h1>{announcement.announcementName}</h1>

              <p>
                {announcement.region} · 공고일 {announcement.postedDate}
              </p>

              {/* <div className={styles.actionGroup}>
                <a
                  href={announcement.originalUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.primaryButton}
                >
                  원문 공고 보기
                </a>

                <a
                  href={announcement.applyUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.outlineButton}
                >
                  신청하러 가기
                </a>
              </div> */}
            </div>

            <div className={styles.heroImage}>
              <img
                src={announcement.thumbnailUrl || FALLBACK_IMAGE}
                alt={announcement.announcementName}
              />
            </div>
          </section>

          <section className={styles.summaryGrid}>
            <article>
              <span>접수 시작</span>
              <strong>{announcement.schedule?.applyStart || "-"}</strong>
            </article>

            <article>
              <span>접수 마감</span>
              <strong>{announcement.schedule?.applyEnd || "-"}</strong>
            </article>

            <article>
              <span>당첨자 발표</span>
              <strong>{announcement.schedule?.winnerAnnounce || "-"}</strong>
            </article>

            <article>
              <span>공급정보</span>
              <strong>{houseInfoList.length}개</strong>
            </article>
          </section>

          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                {/* <p>SUPPLY INFORMATION</p> */}
                <h2>공급정보 선택</h2>
              </div>
              <span>
                공급정보를 선택하면 주소, 이미지, 평면도가 함께 변경됩니다.
              </span>
            </div>

            <div className={styles.houseSelector}>
              {houseInfoList.map((house) => (
                <button
                  key={house.id}
                  type="button"
                  className={
                    selectedHouse?.id === house.id ? styles.activeHouse : ""
                  }
                  onClick={() => setSelectedHouseId(house.id)}
                >
                  <strong>{house.complexName}</strong>
                  <span>{house.housingType}</span>
                </button>
              ))}
            </div>

            {selectedHouse && (
              <div className={styles.selectedHouseGrid}>
                <div className={styles.houseInfoBox}>
                  <h3>{selectedHouse.complexName}</h3>

                  <dl>
                    <div>
                      <dt>주택형</dt>
                      <dd>{selectedHouse.housingType}</dd>
                    </div>

                    <div>
                      <dt>전용면적</dt>
                      <dd>
                        {selectedHouse.sizeRange ||
                          `${selectedHouse.sizeSqm}㎡`}
                      </dd>
                    </div>

                    <div>
                      <dt>방 / 욕실</dt>
                      <dd>
                        방 {selectedHouse.rooms}개 · 욕실{" "}
                        {selectedHouse.bathrooms}개
                      </dd>
                    </div>

                    <div>
                      <dt>보증금</dt>
                      <dd>{selectedHouse.deposit || "공고문 확인"}</dd>
                    </div>

                    <div>
                      <dt>월 임대료</dt>
                      <dd>{selectedHouse.monthlyRent || "공고문 확인"}</dd>
                    </div>

                    <div>
                      <dt>관리비</dt>
                      <dd>{selectedHouse.maintenanceFee || "-"}</dd>
                    </div>

                    <div>
                      <dt>총 세대수</dt>
                      <dd>{selectedHouse.totalHouseholds || "-"}</dd>
                    </div>

                    <div>
                      <dt>난방</dt>
                      <dd>{selectedHouse.heatingType || "-"}</dd>
                    </div>
                  </dl>
                </div>

                {/* <div className={styles.addressBox}>
                  <h3>주소 정보</h3>

                  <p>{selectedAddress?.address || "주소 정보가 없습니다."}</p>

                  <div className={styles.coordinateBox}>
                    <span>
                      위도 {selectedAddress?.coordinates?.latitude || "-"}
                    </span>
                    <span>
                      경도 {selectedAddress?.coordinates?.longitude || "-"}
                    </span>
                  </div>

                  {selectedAddress?.address && (
                    <a
                      href={createKakaoSearchUrl(selectedAddress.address)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      카카오맵에서 보기
                    </a>
                  )}
                </div> */}
              </div>
            )}
          </section>

          <OdsayTransitSection
            destination={{
              id: selectedAddress?.id,
              name: selectedHouse?.complexName,
              address: selectedAddress?.address,
              latitude: selectedAddress?.coordinates?.latitude,
              longitude: selectedAddress?.coordinates?.longitude,
            }}
          />

          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                {/* <p>HOUSE IMAGES</p> */}
                <h2>주택 이미지</h2>
              </div>
            </div>

            <ImageGrid images={selectedHouseImages} />
          </section>

          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                {/* <p>FLOOR PLAN</p> */}
                <h2>평면도</h2>
              </div>
            </div>

            <ImageGrid images={selectedFloorPlans} />
          </section>

          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                {/* <p>SCHEDULE</p> */}
                <h2>모집 일정</h2>
              </div>
            </div>

            <div className={styles.scheduleGrid}>
              <article>
                <span>공고일</span>
                <strong>
                  {announcement.schedule?.announcementDate || "-"}
                </strong>
              </article>

              <article>
                <span>접수 시작</span>
                <strong>{announcement.schedule?.applyStart || "-"}</strong>
              </article>

              <article>
                <span>접수 마감</span>
                <strong>{announcement.schedule?.applyEnd || "-"}</strong>
              </article>

              <article>
                <span>당첨자 발표</span>
                <strong>{announcement.schedule?.winnerAnnounce || "-"}</strong>
              </article>

              <article>
                <span>계약 시작</span>
                <strong>{announcement.schedule?.contractStart || "-"}</strong>
              </article>

              <article>
                <span>계약 종료</span>
                <strong>{announcement.schedule?.contractEnd || "-"}</strong>
              </article>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                {/* <p>ELIGIBILITY</p> */}
                <h2>신청자격</h2>
              </div>
            </div>

            <DataTable table={announcement.eligibilityTable} />

            {announcement.eligibilityImages?.length > 0 && (
              <ImageGrid images={announcement.eligibilityImages} />
            )}
          </section>

          <section className={styles.card}>
            <div className={styles.sectionHeader}>
              <div>
                <p>WINNER SELECTION</p>
                <h2>입주자 선정기준</h2>
              </div>
            </div>

            <DataTable table={announcement.winnerSelectionTable} />
            {announcement.winnerSelectionImages?.length > 0 && (
              <ImageGrid images={announcement.winnerSelectionImages} />
            )}
          </section>

          <section className={styles.noticeCard}>
            <h2>유의사항</h2>
            <p>{announcement.specialNotes || "별도 유의사항이 없습니다."}</p>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}

export default ComplexDetail;
