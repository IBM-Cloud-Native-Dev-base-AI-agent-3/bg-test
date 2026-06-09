import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

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

function UnitMediaSection({
  selectedHouse,
  selectedUnitType,
  houseImages,
  floorPlans,
}) {
  const fixedHouseImage = houseImages?.[0] || null;
  const hasFloorPlans = floorPlans?.length > 0;

  if (!fixedHouseImage && !hasFloorPlans) {
    return null;
  }

  return (
    <section className={styles.card}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>이미지 정보</h2>
        </div>

        <span>
          {selectedHouse?.complexName} · {selectedUnitType?.name}
        </span>
      </div>

      <div className={styles.mediaCompareGrid}>
        <article className={styles.fixedComplexImageBox}>
          <div className={styles.mediaBoxHeader}>
            <strong>단지 관련 이미지</strong>
            <span>공급정보 기준 고정</span>
          </div>

          {fixedHouseImage ? (
            <div className={styles.fixedImageFrame}>
              <img
                src={fixedHouseImage.imageUrl || FALLBACK_IMAGE}
                alt={
                  fixedHouseImage.alt || fixedHouseImage.name || "단지 이미지"
                }
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            </div>
          ) : (
            <div className={styles.emptyBox}>단지 이미지가 없습니다.</div>
          )}

          {fixedHouseImage?.name && (
            <p className={styles.mediaCaption}>{fixedHouseImage.name}</p>
          )}
        </article>

        <article className={styles.floorPlanImageBox}>
          <div className={styles.mediaBoxHeader}>
            <strong>평면도</strong>
            <span>{selectedUnitType?.name || "선택 주택형"} 기준 변경</span>
          </div>

          {hasFloorPlans ? (
            <Swiper
              spaceBetween={16}
              slidesPerView={2}
              className={styles.floorPlanSwiper}
            >
              {floorPlans.map((image, index) => (
                <SwiperSlide
                  key={image.id || image.name || `${image.imageUrl}-${index}`}
                >
                  <div className={styles.fixedImageFrame}>
                    <img
                      src={image.imageUrl || FALLBACK_IMAGE}
                      alt={image.alt || image.name || "평면도"}
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>

                  <p className={styles.mediaCaption}>
                    {image.name || `${selectedUnitType?.name || ""} 평면도`}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className={styles.emptyBox}>평면도 이미지가 없습니다.</div>
          )}
        </article>
      </div>
    </section>
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

function formatHouseholds(totalHouseholds) {
  if (!totalHouseholds || Number(totalHouseholds) === 0) {
    return "공고문 확인";
  }

  return `${Number(totalHouseholds).toLocaleString()}세대`;
}

function getHouseSubtitle(house) {
  if (house.sizeRange && house.sizeRange !== "공고문 확인") {
    return `${house.sizeRange}㎡`;
  }

  if (house.heatingType && house.heatingType !== "공고문 확인") {
    return house.heatingType;
  }

  return "행복주택";
}

function ComplexDetail() {
  const { id } = useParams();

  const [announcement, setAnnouncement] = useState(null);
  const [selectedHouseId, setSelectedHouseId] = useState("");
  const [selectedUnitTypeId, setSelectedUnitTypeId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setIsLoading(true);
        const data = await getComplexDetail(id);

        const firstHouse = data.houseInfoList?.[0];

        setAnnouncement(data);
        setSelectedHouseId(firstHouse?.id || "");
        setSelectedUnitTypeId(firstHouse?.unitTypes?.[0]?.id || "");
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

  const unitTypeList = selectedHouse?.unitTypes || [];

  const selectedUnitType = useMemo(() => {
    return (
      unitTypeList.find((unit) => unit.id === selectedUnitTypeId) ||
      unitTypeList[0] ||
      null
    );
  }, [unitTypeList, selectedUnitTypeId]);

  useEffect(() => {
    const nextHouse =
      houseInfoList.find((house) => house.id === selectedHouseId) ||
      houseInfoList[0];

    setSelectedUnitTypeId(nextHouse?.unitTypes?.[0]?.id || "");
  }, [selectedHouseId, houseInfoList]);

  const selectedAddress = useMemo(() => {
    const fallbackAddress = getAddressByHouseId(
      announcement?.addresses,
      selectedHouse?.id,
    );

    return {
      id: selectedHouse?.id || fallbackAddress?.id,
      address: selectedHouse?.address || fallbackAddress?.address,
      coordinates: selectedHouse?.coordinates || fallbackAddress?.coordinates,
    };
  }, [announcement, selectedHouse]);

  const selectedHouseImages = useMemo(() => {
    if (selectedHouse?.images?.length > 0) {
      return selectedHouse.images;
    }

    const firstUnitWithImages = selectedHouse?.unitTypes?.find(
      (unit) => unit.images?.length > 0,
    );

    if (firstUnitWithImages) {
      return firstUnitWithImages.images;
    }

    return getImagesByHouseId(announcement?.houseImages, selectedHouse?.id);
  }, [announcement, selectedHouse]);

  const selectedFloorPlans = useMemo(() => {
    if (selectedUnitType?.floorPlans?.length > 0) {
      return selectedUnitType.floorPlans;
    }

    return [];
  }, [selectedUnitType]);

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
              <span>
                공급정보와 주택형을 선택하면 상세 정보와 이미지가 변경됩니다.
              </span>
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
                      {/* <span>{getHouseSubtitle(house)}</span> */}
                    </button>
                  ))}
                </div>

                {selectedHouse && (
                  <div className={styles.selectedHouseGrid}>
                    <div className={styles.houseInfoBox}>
                      <h3>{selectedHouse.complexName || "공급정보"}</h3>

                      <dl>
                        <div>
                          <dt>소재지</dt>
                          <dd>
                            {selectedAddress?.address || "주소 정보 없음"}
                          </dd>
                        </div>

                        <div>
                          <dt>전용면적</dt>
                          <dd>
                            {selectedHouse.sizeRange
                              ? `${selectedHouse.sizeRange}㎡`
                              : "공고문 확인"}
                          </dd>
                        </div>

                        <div>
                          <dt>총 세대수</dt>
                          <dd>
                            {formatHouseholds(selectedHouse.totalHouseholds)}
                          </dd>
                        </div>

                        <div>
                          <dt>난방방식</dt>
                          <dd>{selectedHouse.heatingType || "공고문 확인"}</dd>
                        </div>

                        <div>
                          <dt>입주예정월</dt>
                          <dd>{selectedHouse.moveInDate || "공고문 확인"}</dd>
                        </div>

                        <div>
                          <dt>선택 주택형</dt>
                          <dd>{selectedUnitType?.name || "공고문 확인"}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}

                {unitTypeList.length > 0 && (
                  <div className={styles.unitTypeSection}>
                    <div className={styles.unitTypeHeader}>
                      <h2>주택형 선택</h2>
                      <span>
                        선택한 주택형에 따라 아래 정보와 이미지가 바뀝니다.
                      </span>
                    </div>

                    <div className={styles.unitSelector}>
                      {unitTypeList.map((unit) => (
                        <button
                          key={unit.id}
                          type="button"
                          className={`${styles.unitButton} ${
                            selectedUnitType?.id === unit.id
                              ? styles.activeUnitButton
                              : ""
                          }`}
                          onClick={() => setSelectedUnitTypeId(unit.id)}
                        >
                          <strong>{unit.name}</strong>
                          <span>{formatArea(unit.sizeSqm)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedUnitType && (
                  <div className={styles.houseInfoBox}>
                    <h3>{selectedUnitType.name}</h3>

                    <dl>
                      <div>
                        <dt>전용면적</dt>
                        <dd>{formatArea(selectedUnitType.sizeSqm)}</dd>
                      </div>

                      <div>
                        <dt>방 개수</dt>
                        <dd>{formatRoomCount(selectedUnitType.rooms)}</dd>
                      </div>

                      <div>
                        <dt>욕실 수</dt>
                        <dd>{formatRoomCount(selectedUnitType.bathrooms)}</dd>
                      </div>

                      <div>
                        <dt>가격</dt>
                        <dd>{formatPrice(selectedUnitType.priceMillionWon)}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.emptyBox}>공급정보가 없습니다.</div>
            )}
          </section>

          <UnitMediaSection
            selectedHouse={selectedHouse}
            selectedUnitType={selectedUnitType}
            houseImages={selectedHouseImages}
            floorPlans={selectedFloorPlans}
          />

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
