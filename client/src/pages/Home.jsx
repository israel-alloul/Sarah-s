import React from 'react';
import styles from '../assets/stylesClient/Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>ברוכים הבאים לאתר שלנו</h1>
        <p className={styles.subtitle}>
          המקום המושלם למוצרים מיוחדים ואירועי בוטיק בלתי נשכחים.
        </p>
      </header>

      <section className={styles.features}>
        <div className={styles.feature}>
          <img
            src="/images/4.jpg"
            alt="עוגות מיוחדות"
            className={styles.featureImage}
          />
          <h3 className={styles.featureTitle}>עוגות בהתאמה אישית</h3>
          <p className={styles.featureDescription}>
            אנו מתמחים בעוגות מעוצבות, עוגות יום הולדת ועוגות מרוקאיות עם דגש על פרטים קטנים וטעם בלתי נשכח.
          </p>
        </div>
        <div className={styles.feature}>
          <img
            src="/images/1.jpg"
            alt="מגשים מעוצבים"
            className={styles.featureImage}
          />
          <h3 className={styles.featureTitle}>מגשים מעוצבים</h3>
          <p className={styles.featureDescription}>
            מגוון רחב של מגשים מלוחים ומתוקים לאירועים קטנים וגדולים.
          </p>
        </div>
        <div className={styles.feature}>
          <img
            src="/images/fruit3.jpg"
            alt=" מגשי פירות"
            className={styles.featureImage}
          />
          <h3 className={styles.featureTitle}>מגשי פירות טריים</h3>
          <p className={styles.featureDescription}>
            מבחר מגשי פירות ומגוונים המתאימים לכל אירוע.
          </p>
        </div>
      </section>

      <section className={styles.aboutUs}>
        <h2 className={styles.sectionTitle}>מי אנחנו?</h2>
        <p className={styles.aboutText}>
          אנו מציעים שירות אישי ומקצועי ללקוחות פרטיים ועסקיים. 
          החזון שלנו הוא להביא שמחה, יופי וטעם בלתי נשכח לכל לקוח.
        </p>
        <img
          src="/images/logo.jpg"
          alt="עלינו"
          className={styles.aboutImage}
        />
      </section>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
};

export default Home;
