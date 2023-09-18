import ComponentContainer from "@/component/ComponentContainer";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ComponentContainer />
      </main>
      <Footer />
    </>
  );
}
