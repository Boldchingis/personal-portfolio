import ClickSpark from "./ClickSpark/ClickSpark";
import ElasticCursor from "./utils/ElasticCursor";
import Hero from "./_components/Hero";
export default function Home() {
  return (
    <div>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={75}
        sparkCount={11}
        duration={400}
      >
        <Hero />
        <ElasticCursor />
      </ClickSpark>
    </div>
  );
}
