import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "../../styles/shared.module.css";

interface SectionWrapperProps {
  id?: string;
  theme: "dark" | "light";
  reviewId: string;
  ariaLabelledBy?: string;
  className?: string;
  children: ReactNode;
}

export function SectionWrapper({
  id,
  theme,
  reviewId,
  ariaLabelledBy,
  className,
  children,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const combinedClass = className
    ? `${styles.section} ${className}`
    : styles.section;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={combinedClass}
      data-theme={theme}
      data-review-id={reviewId}
      aria-labelledby={ariaLabelledBy}
      data-visible={isVisible}
    >
      <div className={styles.container}>{children}</div>
    </section>
  );
}
