import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import { getComplexDetail } from "../api/complexApi";
import styles from "./ComplexDetail.module.css";
import OdsayTransitSection from "../components/Complex/OdsayTransitSection";

const FALLBACK_IMAGE =
  "https://placehold.co/1000x640/eef4ff/0057ff?text=Announcement";

function parseMarkdownTable(markdownText) {
  if (!markdownText) return null;

  const lines = markdownText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return null;

  const rows = lines
    .filter((line) => line.includes("|"))
    .map((line) =>
      line
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean),
    );

  if (rows.length < 2) return null;

  const columns = rows[0];

  const bodyRows = rows.slice(2).filter((row) => {
    return !row.every((cell) => /^-+$/.test(cell.replaceAll(" ", "")));
  });

  return {
    columns,
    rows: bodyRows,
  };
}

function hasTable(table) {
  if (!table) return false;

  if (table.format && table.value) return true;

  if (table.columns && table.rows) return true;

  return false;
}

function DataTable({ table }) {
  if (!table) return null;

  if (table.format === "html" && table.value) {
    return (
      <div
        className={styles.htmlTableBox}
        dangerouslySetInnerHTML={{ __html: table.value }}
      />
    );
  }

  if (table.format === "markdown" && table.value) {
    const parsedTable = parseMarkdownTable(table.value);

    if (!parsedTable) return null;

    return <BasicTable table={parsedTable} />;
  }

  if (table.columns && table.rows) {
    return <BasicTable table={table} />;
  }

  return null;
}

function BasicTable({ table }) {
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
              {Array.isArray(row)
                ? row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))
                : table.columns.map((column) => (
                    <td key={`${rowIndex}-${column}`}>{row[column] || "-"}</td>
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
    return null;
  }

  return (
    <div className={styles.imageGrid}>
      {images.map((image, index) => (
        <div
          key={image.id || image.name || `${image.imageUrl}-${index}`}
          className={styles.infoImageBox}
        >
          <img
            src={image.imageUrl || FALLBACK_IMAGE}
            alt={image.alt || image.name || "이미지"}
            onError={(event) => {
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
        </div>
      ))}
    </div>
  );
}

function getImagesByHouseId(images = [], selectedHouseId) {
  if (!images || images.length === 0) return [];

  const hasHouseId = images.some((image) => image.houseId);

  if (!hasHouseId) {
    return images;
  }

  return images.filter((image) => image.houseId === selectedHouseId);
}

function getAddressByHouseId(addresses = [], selectedHouseId) {
  if (!addresses || addresses.length === 0) return null;

  const hasHouseId = addresses.some((address) => address.houseId);

  if (!hasHouseId) {
    return addresses[0];
  }

  return addresses.find((address) => address.houseId === selectedHouseId);
}

function formatArea(sizeSqm) {
  if (!sizeSqm || Number(sizeSqm) === 0) {
    return "공고문 확인";
  }

  return `${sizeSqm}㎡`;
}

function formatRoomCount(count) {
  if (!count || Number(count) === 0) {
    return "공고문 확인";
  }

  return `${count}개`;
}

function formatPrice(priceMillionWon) {
  if (!priceMillionWon || Number(priceMillionWon) === 0) {
    return "공고문 확인";
  }

  return `${priceMillionWon}백만원`;
}

function getHouseSubtitle(house) {
  if (house.housingType) return house.housingType;
  if (house.sizeRange) return house.sizeRange;
  if (house.sizeSqm && Number(house.sizeSqm) !== 0) return `${house.sizeSqm}㎡`;

  return "공급정보";
}

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
    return getAddressByHouseId(announcement?.addresses, selectedHouse?.id);
  }, [announcement, selectedHouse]);

  const selectedHouseImages = useMemo(() => {
    return getImagesByHouseId(announcement?.houseImages, selectedHouse?.id);
  }, [announcement, selectedHouse]);

  const selectedFloorPlans = useMemo(() => {
    return getImagesByHouseId(announcement?.floorPlans, selectedHouse?.id);
  }, [announcement, selectedHouse]);

  const hasHouseImages = selectedHouseImages.length > 0;
  const hasFloorPlans = selectedFloorPlans.length > 0;

  const hasEligibility =
    hasTable(announcement?.eligibilityTable) ||
    announcement?.eligibilityImages?.length > 0;

  const hasWinnerSelection =
    hasTable(announcement?.winnerSelectionTable) ||
    announcement?.winnerSelectionImages?.length > 0;

  const hasTransitCoordinates =
    selectedAddress?.coordinates?.latitude != null &&
    selectedAddress?.coordinates?.longitude != null;

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
                <span>{announcement.announcementType || "공공임대"}</span>
                <span>{announcement.status || "공고"}</span>
                <span>{announcement.source || "LH"}</span>
              </div>

              <h1>{announcement.announcementName || "모집공고 상세"}</h1>

              <p>
                {announcement.region || "지역 정보 없음"} · 공고일{" "}
                {announcement.postedDate ||
                  announcement.schedule?.announcementDate ||
                  "-"}
              </p>
            </div>

            <div className={styles.heroImage}>
              <img
                src={announcement.thumbnailUrl || FALLBACK_IMAGE}
                alt={announcement.announcementName || "모집공고 이미지"}
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
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
                <h2>공급정보</h2>
              </div>
              <span>공급정보를 선택하면 주소 정보가 함께 변경됩니다.</span>
            </div>

            {houseInfoList.length > 0 ? (
              <>
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
                      <strong>{house.complexName || "공급정보"}</strong>
                      <span>{getHouseSubtitle(house)}</span>
                    </button>
                  ))}
                </div>

                {selectedHouse && (
                  <div className={styles.selectedHouseGrid}>
                    <div className={styles.houseInfoBox}>
                      <h3>{selectedHouse.complexName || "공급정보"}</h3>

                      <dl>
                        <div>
                          <dt>단지명</dt>
                          <dd>{selectedHouse.complexName || "-"}</dd>
                        </div>

                        <div>
                          <dt>전용면적</dt>
                          <dd>{formatArea(selectedHouse.sizeSqm)}</dd>
                        </div>

                        <div>
                          <dt>방 개수</dt>
                          <dd>{formatRoomCount(selectedHouse.rooms)}</dd>
                        </div>

                        <div>
                          <dt>욕실 수</dt>
                          <dd>{formatRoomCount(selectedHouse.bathrooms)}</dd>
                        </div>

                        <div>
                          <dt>가격</dt>
                          <dd>{formatPrice(selectedHouse.priceMillionWon)}</dd>
                        </div>

                        <div>
                          <dt>주소</dt>
                          <dd>
                            {selectedAddress?.address || "주소 정보 없음"}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.emptyBox}>공급정보가 없습니다.</div>
            )}
          </section>

          {hasTransitCoordinates && (
            <OdsayTransitSection
              destination={{
                id: selectedAddress?.id,
                name: selectedHouse?.complexName,
                address: selectedAddress?.address,
                latitude: selectedAddress?.coordinates?.latitude,
                longitude: selectedAddress?.coordinates?.longitude,
              }}
            />
          )}

          {hasHouseImages && (
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>주택 이미지</h2>
                </div>
              </div>

              <ImageGrid images={selectedHouseImages} />
            </section>
          )}

          {hasFloorPlans && (
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>평면도</h2>
                </div>
              </div>

              <ImageGrid images={selectedFloorPlans} />
            </section>
          )}

          {hasEligibility && (
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>신청자격</h2>
                </div>
              </div>

              <DataTable table={announcement.eligibilityTable} />
              <ImageGrid images={announcement.eligibilityImages} />
            </section>
          )}

          {hasWinnerSelection && (
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>입주자 선정기준</h2>
                </div>
              </div>

              <DataTable table={announcement.winnerSelectionTable} />
              <ImageGrid images={announcement.winnerSelectionImages} />
            </section>
          )}

          {announcement.specialNotes && (
            <section className={styles.noticeCard}>
              <h2>유의사항</h2>
              <p>{announcement.specialNotes}</p>
            </section>
          )}
        </div>
      </PageContainer>
    </main>
  );
}

export default ComplexDetail;
