import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";

export default function MainLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex flex-row grow">
        <SideBar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
