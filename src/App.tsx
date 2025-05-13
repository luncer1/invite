import "./App.css";
import { Box, Typography } from "@mui/material";
import Invite from "./Invite";
import HeartSpin from "./HeartSpin";
import { useState } from "react";
import FinalScreen from "./FinalScreen";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [declines, setDeclines] = useState(0);

  const increaseDecline = () => {
    setDeclines((prevState) => prevState + 1);
  };
  const handleAccept = () => {
    setAccepted(true);
  };
  return (
    <Box
      id="mainContainer"
      sx={{
        paddingTop: "10vh",
        paddingBottom: "10vh",
        bgcolor: "red",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {accepted ? (
        <FinalScreen declineScore={declines} />
      ) : (
        <Invite
          increaseDeclines={increaseDecline}
          handleAccept={handleAccept}
        />
      )}

      <HeartSpin />
      {!accepted && (
        <Box>
          <Typography
            className="points"
            sx={{
              typography: { xs: "h5", sm: "h5", md: "h3", lg: "h3" },
            }}
          >
            Odmówiłaś {declines} {declines == 1 ? "raz" : "razy"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default App;
