import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";

export default function MainLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex flex-row grow">
        <SideBar />
        <Outlet />
        <Toaster
          position="top-center"
        />
      </main>
      <Footer />
    </div>
  );
}
