import React from 'react';
import styles from '../assets/stylesClient/About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>מי אנחנו</h1>
        <p className={styles.subtitle}>שירות איכותי, מקצועיות ומוצרי בוטיק ברמה הגבוהה ביותר</p>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.textBlock}>
          <h2>הסיפור שלנו</h2>
          <p>
            אנחנו עסק משפחתי שנולד מאהבה אמיתית לעולם הקולינריה והאירוח. עם ניסיון רב שנים,
            אנו מספקים ללקוחותינו פתרונות איכותיים לאירועים, כנסים וחגיגות מיוחדות.
            בין אם אתם מחפשים מגשי אירוח, עוגות בעיצוב אישי או שירותי קייטרינג ברמה גבוהה,
            אנחנו כאן כדי להפוך את הרגעים שלכם למתוקים במיוחד.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <img
            src="images/1.jpg" 
            alt="האירועים שלנו"
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.servicesSection}>
        <h2>מה אנחנו מציעים?</h2>
        <ul className={styles.servicesList}>
          <li>מגשי אירוח מתוקים ומלוחים</li>
          <li>עוגות מעוצבות לפי בקשת הלקוח</li>
          <li>שירותי קייטרינג לאירועים פרטיים ועסקיים</li>
          <li>אירועי בוטיק בהתאמה אישית</li>
          <li>שירותי מיתוג קולינרי</li>
        </ul>
      </div>

      <div className={styles.gallerySection}>
        <h2>גלריה</h2>
        <div className={styles.gallery}>
          <img src="images/3.jpg" alt="תמונה 1" />
          <img src="images/4.jpg" alt="תמונה 2" />
          <img src="images/5.jpg" alt="תמונה 3" />
          <img src="images/6.jpg" alt="תמונה 4" />
        </div>
      </div>
    </div>
  );
};

export default About;
