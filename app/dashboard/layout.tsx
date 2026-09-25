import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import Footer from "@/components/sections/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050b14] text-white">
      <Sidebar />
      <div className="min-h-screen md:pl-[272px]">
        <Topbar />
        <main id="main-content" className="min-w-0 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1500px]">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
