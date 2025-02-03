import Disks from "./Disks";

type TProps = {
  declineScore: number;
};
function FinalScreen({ declineScore }: TProps) {
  return (
    <>
      <Disks declineScore={declineScore} />
    </>
  );
}

export default FinalScreen;
