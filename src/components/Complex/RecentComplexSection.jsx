import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { getComplexes } from "../../api/complexApi";
import styles from "./RecentComplexSection.module.css";

const FALLBACK_IMAGE =
  "https://placehold.co/900x600/eef4ff/0057ff?text=Announcement";

function RecentComplexSection() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

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
        alert("최근 모집공고를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleMoveDetail = (id) => {
    navigate(`/complexes/${id}`);
  };

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.loadingBox}>
            최근 모집공고를 불러오는 중입니다...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>ANNOUNCEMENT</p>
            <h2>최근 등록된 모집공고</h2>
          </div>

          <div className={styles.headerRight}>
            {/* <button
              type="button"
              className={styles.moreButton}
              onClick={handleMoveList}
            >
              전체 공고 보러가기
              <span>›</span>
            </button> */}

            <div className={styles.arrowGroup}>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={handlePrev}
                aria-label="이전 모집공고 보기"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={styles.arrowIcon}
                >
                  <path
                    d="M15 18L9 12L15 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className={styles.arrowButton}
                onClick={handleNext}
                aria-label="다음 모집공고 보기"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={styles.arrowIcon}
                >
                  <path
                    d="M9 6L15 12L9 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 2.3,
              spaceBetween: 22,
            },
            1200: {
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
          }}
          className={styles.swiper}
        >
          {announcements.map((announcement) => (
            <SwiperSlide key={announcement.id}>
              <article
                className={styles.card}
                onClick={() => handleMoveDetail(announcement.id)}
              >
                <div className={styles.imageBox}>
                  <img
                    src={announcement.thumbnailUrl || FALLBACK_IMAGE}
                    alt={announcement.announcementName}
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />

                  <span className={styles.statusBadge}>
                    {announcement.status || "공고"}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.badgeRow}>
                    <span>{announcement.announcementType}</span>
                    <span>{announcement.source}</span>
                    <span>{announcement.postedDate}</span>
                  </div>

                  <h3>{announcement.announcementName}</h3>

                  <div className={styles.metaList}>
                    <p>
                      <b>지역</b>
                      {announcement.region}
                    </p>

                    <p>
                      <b>접수</b>
                      {announcement.schedule?.applyStart || "-"} ~{" "}
                      {announcement.schedule?.applyEnd || "-"}
                    </p>

                    <p>
                      <b>공급정보</b>
                      {announcement.houseInfoList?.length || 0}개
                    </p>
                  </div>

                  <div className={styles.bottomRow}>
                    <strong>상세 조건 확인</strong>
                    <span>›</span>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default RecentComplexSection;
