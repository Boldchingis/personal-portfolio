import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports with loading states
const ClickSpark = dynamic(() => import("./ClickSpark/ClickSpark"), {
  loading: () => (
    <div className="fixed bottom-4 right-4 md:bottom-12 md:right-12 z-30 w-12 h-12 bg-black/10 rounded-full animate-pulse" />
  ),
});

const SlideTabsExample = dynamic(() => import("./SlideNav/SlideNav").then(mod => ({ default: mod.SlideTabsExample })), {
  loading: () => (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  return (
    <div className="bg-[#f3f3f3]">
      <Suspense fallback={
        <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }>
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
      </Suspense>
    </div>
  );
}
