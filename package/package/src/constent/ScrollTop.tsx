import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface newType {
  x: number;
  y: number;
}
const ScrollTop = () => {
  const [value, setValue] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<newType>({ x: 0, y: 0 });
  const { pathname } = useLocation();

  const ScrollButton = () => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 307.919;
    setValue(scrolled);
    if (window.scrollY > 30) {
      scrollRef.current?.classList.add("active-progress");
    } else {
      scrollRef.current?.classList.remove("active-progress");
    }
  };
  const cursorPosition = (ev: MouseEvent) => {
    setPosition({
      x: ev.clientX,
      y: ev.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", ScrollButton);
    window.addEventListener("mousemove", cursorPosition);

    return () => {
      window.removeEventListener("scroll", ScrollButton);
      window.removeEventListener("mousemove", cursorPosition);
    };
  }, []);

  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return (
    <>
      <div
        className="scroltop-progress scroltop-primary"
        ref={scrollRef}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <svg width="100%" height="100%" viewBox="-1 -1 102 102">
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              transition: ".5s linear",
              strokeDasharray: `307px`,
              strokeDashoffset: `${value - 307.919}px`,
            }}
          />
        </svg>
      </div>

      <div
        id="pointer-ring"
        style={{
          borderColor: " rgb(117, 12, 126)",
          padding: "15px",
          transform: `translate(${position.x - 15}px,${position.y - 15}px)`,
        }}
        className=""
      ></div>
      <div
        id="pointer-dot"
        style={{
          borderColor: "white",
          transform: `translate(${position.x}px,${position.y}px)`,
        }}
      ></div>
    </>
  );
};

export default ScrollTop;
