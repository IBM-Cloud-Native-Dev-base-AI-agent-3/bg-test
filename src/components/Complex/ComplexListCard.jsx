import { useNavigate } from "react-router-dom";
import styles from "./ComplexListCard.module.css";

const FALLBACK_IMAGE =
  "https://placehold.co/800x520/eef4ff/0057ff?text=Housing";

function ComplexListCard({ complex }) {
  const navigate = useNavigate();

  const handleMoveDetail = () => {
    navigate(`/complexes/${complex.id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleMoveDetail();
    }
  };

  return (
    <article
      className={styles.card}
      onClick={handleMoveDetail}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.imageBox}>
        <img
          src={complex.imageUrl || FALLBACK_IMAGE}
          alt={complex.name}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div className={styles.regionLabel}>
          {/* <span>📍</span> */}
          {complex.region || complex.locationShort || "지역"}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.badgeRow}>
          <span>{complex.supplyType || "공급유형"}</span>
          <span>{complex.rentType || "임대유형"}</span>
          <span>{complex.noticeDate || "26년 05월 공고문"}</span>
        </div>

        <h3>{complex.name}</h3>

        <p>{complex.address}</p>
      </div>
    </article>
  );
}

export default ComplexListCard;
