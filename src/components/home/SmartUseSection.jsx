import { useNavigate } from "react-router-dom";
import styles from "./SmartUseSection.module.css";

const featureCards = [
  {
    id: 1,
    title: "공고지도",
    description:
      "지도에서 원하는 지역의 공공임대 공고를 한눈에 확인하고, 위치와 주변 정보를 쉽게 비교해보세요.",
    buttonText: "공고지도 보기",
    path: "/complexes",
    image: "/img/feature-map.png",
  },
  {
    id: 2,
    title: "AI를 이용한 진단기",
    description:
      "내 소득, 자산, 가구 조건을 입력하면 AI가 공고 조건과 비교해 당첨 가능성을 예측해드립니다.",
    buttonText: "진단 시작하기",
    path: "/rentalList",
    image: "/img/feature-ai.png",
  },
  {
    id: 3,
    title: "후기 게시판",
    description:
      "실제 입주민과 이용자들의 생생한 후기를 보고, 관심 있는 단지의 생활 정보를 미리 확인해보세요.",
    buttonText: "후기 보러가기",
    path: "/reviews",
    image: "/img/feature-review.png",
  },
];

function SmartUseSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>
            방 굿 을
            <br />더 똑똑하게 이용하는 방법
          </h2>
        </div>

        <div className={styles.cardGrid}>
          {featureCards.map((card) => (
            <article key={card.id} className={styles.card}>
              <div className={styles.imageBox}>
                <img src={card.image} alt={card.title} />
              </div>

              <div className={styles.cardBody}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>

                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => navigate(card.path)}
                >
                  {card.buttonText}
                  <span>›</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SmartUseSection;
