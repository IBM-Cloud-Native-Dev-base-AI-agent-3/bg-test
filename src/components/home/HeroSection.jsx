import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </section>
  );
};

export default HeroSection;
