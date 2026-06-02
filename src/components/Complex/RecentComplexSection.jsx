import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";

import { getComplexes } from "../../api/complexApi";
import styles from "./RecentComplexSection.module.css";

import "swiper/css";

const FALLBACK_IMAGE =
  "https://placehold.co/800x520/eef4ff/0057ff?text=Housing";

function RecentComplexSection() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const [complexes, setComplexes] = useState([]);

  useEffect(() => {
    const fetchComplexes = async () => {
      try {
        const data = await getComplexes();
        setComplexes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplexes();
  }, []);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ANNOUNCEMENT</p>
          <h2>최근 등록된 주택 공고</h2>
        </div>

        <div className={styles.headerRight}>
          {/* <button
            type="button"
            className={styles.moreButton}
            onClick={() => navigate("/complexes")}
          >
            전체 공고 보러가기 〉
          </button> */}

          <div className={styles.arrowGroup}>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={handlePrev}
              aria-label="이전 공고 보기"
            >
              ‹
            </button>

            <button
              type="button"
              className={styles.arrowButton}
              onClick={handleNext}
              aria-label="다음 공고 보기"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <Swiper
        className={styles.swiper}
        modules={[A11y]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={4}
        spaceBetween={28}
        grabCursor
        breakpoints={{
          0: {
            slidesPerView: 1.15,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2.1,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 28,
          },
        }}
      >
        {complexes.map((item) => (
          <SwiperSlide key={item.id}>
            <article
              className={styles.card}
              onClick={() => navigate(`/complexes/${item.id}`)}
            >
              <div className={styles.imageBox}>
                <img
                  src={item.imageUrl || FALLBACK_IMAGE}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />

                {/* <div className={styles.badgeGroup}>
                  {item.badges?.map((badge) => (
                    <span
                      key={badge}
                      className={`${styles.badge} ${
                        badge === "NEW" ? styles.newBadge : ""
                      } ${
                        badge === "모집중" || badge === "모집예정"
                          ? styles.orangeBadge
                          : ""
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div> */}
              </div>

              <div className={styles.cardBody}>
                <p className={styles.location}>
                  {item.locationShort || item.region}
                </p>

                <h3>{item.name}</h3>

                <div className={styles.bottomRow}>
                  <strong>{item.priceText || "조건 확인"}</strong>
                  <span>›</span>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default RecentComplexSection;
