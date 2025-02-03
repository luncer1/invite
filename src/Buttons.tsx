import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import YesButton from "./YesButton";
import NoButton from "./NoButton";

type TProps = {
  handleAccept: () => void;
  increaseDeclines: () => void;
};

function Buttons({ handleAccept, increaseDeclines }: TProps) {
  const [yesButtons, setYesButtons] = useState(
    [] as unknown as [{ x: number; y: number }]
  );
  const set = useRef(false);
  const set2 = useRef(false);
  const handleNoButton = () => {
    increaseDeclines();
    const mainContainer = document
      .getElementById("mainContainer")
      ?.getBoundingClientRect();
    const newYesButtons = [...yesButtons];
    if (mainContainer) {
      newYesButtons.push({
        x: Math.random() * mainContainer.width - 50,
        y: Math.random() * mainContainer.height - 50,
      });
    }
    // @ts-expect-error: No error
    setYesButtons(newYesButtons);
  };

  useEffect(() => {
    if (yesButtons.length > 2) {
      const element = document.getElementById("noButton");
      if (element && !set.current) {
        set.current = true;
        // element.classList.add("noBtnAnimate");
        setInterval(() => {
          let sign = "-";
          let val = 0;
          let axis = "Y";
          if (Math.random() * 100 < 50) {
            sign = "+";
          }
          if (Math.random() * 100 < 50) {
            axis = "X";
          }
          val = Math.floor(Math.random() * 250) + 50;
          element.style.transition = "transform 1s";
          element.style.transform = `translate${axis}(${sign}${val}%)`;
        }, 500);
      }
    } else {
      document.getElementById("noButton")?.classList.remove("noBtnAnimate");
    }
    if (yesButtons.length > 7) {
      const element = document.getElementById("noButton");
      if (element && !set2.current) {
        set2.current = true;
        // element.classList.add("noBtnAnimate");
        setInterval(() => {
          const arr = [0.1, 2, 1, 1.4, 0.5, 0.6, 1, 1.8, 0.2];
          const val = arr[Math.floor(Math.random() * 3)];
          element.style.transition = "transform 2s";
          console.log(`scale(${val})`);
          element.style.transform = `scale(${val})`;
        }, 2500);
      }
    }
  }, [yesButtons]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100vw",
        }}
      >
        <Box>
          <YesButton
            className="content btnAnimated"
            onYesClick={handleAccept}
          />
        </Box>
        <Box id="noButton">
          <NoButton
            className="content btnAnimated"
            onNoClick={handleNoButton}
          />
        </Box>
      </Box>

      {yesButtons.map((yesButton, index) => {
        return (
          <Box
            className="yesButton"
            key={index}
            sx={{
              position: "absolute",
              top: `${yesButton.y}px`,
              left: `${yesButton?.x}px`,
              zIndex: 10,
            }}
          >
            <YesButton
              className="content yesButton"
              onYesClick={handleAccept}
            />
          </Box>
        );
      })}
    </>
  );
}

export default Buttons;
