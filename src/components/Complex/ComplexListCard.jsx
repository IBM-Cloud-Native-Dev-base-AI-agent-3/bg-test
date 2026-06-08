import { useNavigate } from "react-router-dom";
import styles from "./ComplexListCard.module.css";

const FALLBACK_IMAGE =
  "https://placehold.co/900x600/eef4ff/0057ff?text=Announcement";

function ComplexListCard({ announcement }) {
  const navigate = useNavigate();

  const handleMoveDetail = () => {
    navigate(`/complexes/${announcement.id}`);
  };

  return (
    <article className={styles.card} onClick={handleMoveDetail}>
      <div className={styles.imageBox}>
        <img
          src={announcement.thumbnailUrl || FALLBACK_IMAGE}
          alt={announcement.announcementName}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <span className={styles.statusBadge}>{announcement.status}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.badgeRow}>
          <span>{announcement.announcementType}</span>
          <span>{announcement.region}</span>
          <span>{announcement.source}</span>
        </div>

        <h3>{announcement.announcementName}</h3>

        <div className={styles.infoList}>
          <p>
            <b>공고일</b>
            {announcement.postedDate}
          </p>

          <p>
            <b>접수기간</b>
            {announcement.schedule?.applyStart || "-"} ~{" "}
            {announcement.schedule?.applyEnd || "-"}
          </p>

          <p>
            <b>공급정보</b>
            {announcement.houseInfoList?.length || 0}개
          </p>
        </div>

        <button type="button" className={styles.detailButton}>
          상세보기
          <span>›</span>
        </button>
      </div>
    </article>
  );
}

export default ComplexListCard;
