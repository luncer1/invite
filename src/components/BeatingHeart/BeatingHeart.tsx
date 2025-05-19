import "./BeatingHeart.css";

interface BeatingHeartProps {
  active: boolean;
}
const BeatingHeart = ({ active }: BeatingHeartProps) => {
  return (
    <div className="BeatingHeart-container">
      <div className="BeatingHeart-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 497 470"
          height="100%"
          id={
            active ? "BeatingHeart-heart-active" : "BeatingHeart-heart-inactive"
          }
        >
          <path
            d="M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303 0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z"
            strokeWidth="20"
            fill={active ? "url(#radialGradient)" : "gray"}
          />

          <defs>
            <radialGradient
              id="radialGradient"
              cx="50%"
              cy="50%"
              r="100%"
              gradientUnits="objectBoundingBox"
            >
              <stop
                offset="1%"
                style={{
                  stopColor: active ? "rgb(255, 150, 150)" : "rgb(0, 0, 0)",
                  stopOpacity: 1,
                }}
              ></stop>
              <stop
                offset="90%"
                style={{
                  stopColor: active ? "rgb(255, 0, 0)" : "rgb(67, 67, 67)",
                  stopOpacity: 1,
                }}
              ></stop>
              <stop
                offset="100%"
                style={{
                  stopColor: active ? "rgb(208, 46, 46)" : "rgb(61, 60, 60)",
                  stopOpacity: 1,
                }}
              ></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default BeatingHeart;
