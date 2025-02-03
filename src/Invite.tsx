import { Box, Paper, Typography } from "@mui/material";
import Buttons from "./Buttons";
type TProps = {
  handleAccept: () => void;
  increaseDeclines: () => void;
};

function Invite({ handleAccept, increaseDeclines }: TProps) {
  return (
    <Box>
      <Typography
        className="nameText"
        sx={{
          typography: { xs: "h3", sm: "h3", md: "h2", lg: "h1" },
        }}
      >
        Oliwio<span style={{ textDecoration: "none" }}>,</span>
      </Typography>
      <Paper
        elevation={0}
        className="contentText"
        sx={{ backgroundColor: "#B40800", color: "white" }}
      >
        <Typography
          sx={{
            typography: {
              xs: "h6",
              sm: "h6",
              md: "h4",
              lg: "h4",
            },
            marginRight: "1vw",
            marginLeft: "1vw",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          className="contentText"
        >
          Jako, ze nie umiem zrobić jakichś wycinanek czy innych rzeczy, ale
          klikać w klawiature coś tam czasem poklikam to przygotowałem takie
          zaproszenie, na Walentynkowe wyjście.
          <br />
          <span>PS1. Poklikaj pare razy w nie</span>
          <br />
          <span>PS2. Daj znać jaki wynik udało się zrobić</span>
        </Typography>
      </Paper>
      <Buttons
        increaseDeclines={increaseDeclines}
        handleAccept={handleAccept}
      />
    </Box>
  );
}

export default Invite;
