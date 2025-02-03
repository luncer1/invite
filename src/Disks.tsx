import { Typography } from "@mui/material";
import "./Disks.css";
type TProps = {
  declineScore: number;
};
function Disks({ declineScore }: TProps) {
  return (
    <>
      <Typography
        className="valentine-info"
        variant="h6"
        sx={{ paddingBottom: "50px" }}
      >
        Zmniejsz okno przeglądarki, żeby zbliżyć dyskietki do siebie.
      </Typography>
      <div className="container-disks">
        <div className="floppy floppy--green">
          <div className="floppy-disk"></div>
          <div className="floppy-label">
            <div className="floppy-reaction"></div>
          </div>
        </div>

        <div className="floppy floppy--pink">
          <div className="floppy-disk"></div>
          <div className="floppy-label">
            <div className="floppy-reaction"></div>
          </div>
        </div>
      </div>
      <Typography
        sx={{
          typography: { xs: "h2", sm: "h2", md: "h1", lg: "h1" },
          marginTop: "5vh",
        }}
        className="happy-valentines"
      >
        Do zobaczenia w Walentynki!
      </Typography>
      <Typography
        sx={{
          typography: { xs: "h6", sm: "h6", md: "h4", lg: "h4" },
          marginTop: "5vh",
        }}
        className="happy-valentines"
      >
        Twój końcowy wynik to: {declineScore}
      </Typography>
    </>
  );
}

export default Disks;
