import Squares from "../Squares/Squares";

export default function Footer() {
  return (
    <footer className="w-full h-[50%] relative flex items-center justify-center">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#fff"
        hoverFillColor="#222"
      />
    </footer>
  );
}
