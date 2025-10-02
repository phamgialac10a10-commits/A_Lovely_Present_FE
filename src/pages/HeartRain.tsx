import { useEffect, useState } from "react";
import styles from "./HappyBirthday.module.css";

function HeartRain() {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 20 + 10}px`,
          duration: `${Math.random() * 3 + 3}s`,
          delay: `0s`
        }
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heartContainer}>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className={styles.heart}
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDuration: heart.duration,
            animationDelay: heart.delay
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

export default HeartRain;