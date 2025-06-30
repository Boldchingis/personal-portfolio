import ClickSpark from "./ClickSpark/ClickSpark";
import Hero from "./_components/Hero";
import Main from "./_components/Main";
import { SlideTabsExample } from "./SlideNav/SlideNav";
import Footer from "./_components/Footer";
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
        <SlideTabsExample />
        <Hero />
        <Main />
        <Footer />
      </ClickSpark>
    </div>
  );
}
