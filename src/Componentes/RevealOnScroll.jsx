"use client";

import { useEffect, useRef, useState } from "react";

export default function RevealOnScroll({ children, className = "", delayClass = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "reveal-on-scroll",
        delayClass,
        visible ? "is-visible" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
