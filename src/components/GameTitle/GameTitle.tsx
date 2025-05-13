import { useEffect, useRef } from "react";
import "./GameTitle.css";

const GameTitle = () => {
  const container = useRef<HTMLDivElement>(null);

  const createHeart = () => {
    const element = document.createElement("div");
    element.classList.add("GameTitle-Heart");
    element.style.left = Math.random() * 100 + "vw";
    element.style.animationDuration = Math.random() * 2 + 8 + "s";
    element.innerText = "💗";
    container.current?.appendChild(element);
    setTimeout(() => {
      element.remove();
    }, 5000);
  };

  useEffect(() => {
    const createHeartInterval = setInterval(() => {
      createHeart();
    }, 300);
    return () => {
      clearInterval(createHeartInterval);
    };
  }, []);

  return (
    <div className="GameTitle-Container" ref={container}>
      <div className="GameTitle-Text">Walentynki THE GAME</div>
    </div>
  );
};

export default GameTitle;
