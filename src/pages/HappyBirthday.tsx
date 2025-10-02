import { useState, useEffect, useRef } from "react";
import styles from './HappyBirthday.module.css';
import HeartRain from "./HeartRain";

function HappyBirthday() {
  const [showPopup, setShowPopup] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOk = () => {
    setShowPopup(false);
    setCountdown(3);

    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log("Autoplay bị chặn:", err);
      });
    }
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // 👇 theo dõi khi user scroll tới messageContainer
  useEffect(() => {
    const handleScroll = () => {
      if (messageRef.current) {
        const rect = messageRef.current.getBoundingClientRect();
        // Kiểm tra xem message có nằm trong viewport không
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setShowMessage(true);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {showPopup ? (
        <div className={styles.popUp}>
          <div className={styles.popUpContainer}>
            <img src="src/assets/are-you-ready.jpg" alt="img" width="200" height="200" />
            <h2>Are you ready for a surprise? 🎉</h2>
            <button onClick={handleOk}>OK</button>
          </div>
        </div>
      ) : countdown !== null && countdown > 0 ? (
        <div className={styles.popUp}>
          <div className={styles.countDown}>
            <h1>{countdown}</h1>
          </div>
        </div>
      ) : (
        <div className={styles.happyBirthdayContainer}>
          <HeartRain />
          <div className={styles.prolouge}>
            <h1>Happy Birthday, Beautiful!</h1>
            <p>Wishing that you will...</p>

            <div className={styles.scrollIndicator}>
              <span>Scroll down</span>
              <div className={styles.arrow}></div>
            </div>
          </div>
          {/* messageContainer có hiệu ứng reveal */}
          <div ref={messageRef} className={styles.messageContainer}>
            <div className={`${styles.message} ${showMessage ? styles.show : ""}`}>
              <h1>A special message for you</h1>
              <p>I Love You 💖</p>
            </div>
          </div>
        </div>
      )}
       <audio ref={audioRef} src="src/assets/Lady Gaga, Bruno Mars - Die With A Smile (Official Music Video).mp3" preload="auto"></audio>
    </div>
  );
}

export default HappyBirthday;
