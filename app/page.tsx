import { fetchMenu } from "@/lib/sheet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CakeExplorer from "@/components/CakeExplorer";
import Faq from "@/components/Faq";

export default async function Home() {
  const { options } = await fetchMenu();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6">
      <Header />
      <main className="flex flex-1 flex-col gap-10 pb-16">
        <CakeExplorer options={options} />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
