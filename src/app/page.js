import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import MainPage from "@/component/main-page/MainPage";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex  flex-col items-center justify-between p-24">
        <MainPage />
      </main>

      <Footer />
    </>
  );
}
