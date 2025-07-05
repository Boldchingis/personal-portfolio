import ClickSpark from "./ClickSpark/ClickSpark";
import { SlideTabsExample } from "./SlideNav/SlideNav";

export default function Home() {
  return (
    <div className="bg-[#f3f3f3]">
      <ClickSpark
        sparkColor="#000"
        sparkSize={10}
        sparkRadius={75}
        sparkCount={11}
        duration={400}
      >
        <div className="fixed bottom-4 right-4 md:bottom-12 md:right-12 z-30">
        </div>
        <SlideTabsExample />

      </ClickSpark>
    </div>
  );
}
