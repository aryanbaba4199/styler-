// Layout.tsx
import { useState } from 'react';
import Header from "@/components/Header/Header";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ user, tab, title, children }: any) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Header title={title} />
      <main className="max-w-screen-2xl mx-auto bg-gray-100 grid grid-cols-1 md:grid-cols-4 md:px-14 pt-5 pb-8 gap-8">
        {/* Mobile Menu Button */}
        <div className="md:hidden col-span-1 flex">
          <button
            onClick={toggleMobileMenu}
            className="text-2xl mx-1 p-1 focus:outline-none bg-black text-white rounded-lg"
          >
            ☰
          </button>
        </div>
        <section
          className={`md:col-span-1 ${
            isMobileMenuOpen ? 'block' : 'hidden md:block'
          } bg-white p-2 md:p-5 rounded-xl border`}
        >
          {/* Show Sidebar only on larger screens */}
          <Sidebar data={{ ...user, tab }} />
        </section>
        <section className="md:col-span-3 bg-white p-2 md:p-5 rounded-xl border">
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
