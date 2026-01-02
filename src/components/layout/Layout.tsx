import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import SearchSideBar from "../search/SearchSideBar.tsx";

// interface LayoutProps {
//   children: React.ReactNode;
// }

const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex min-h-screen bg-blue-900">
          <Header />
        {/*  /!* SIDEBAR *!/*/}
        <aside className="fixed left-0 top-0 h-full w-64  mt-40">
          <SearchSideBar />
        </aside>
        {/*  /!* MAIN CONTENT *!/*/}
        <main className="w-full md:w-3/4 ml-70 ">
          <Outlet />
        </main>
        <footer className="fixed bottom-0 left-0 w-full z-50">
          <Footer />
        </footer>
      </div>
    </>
  )
}
export default Layout;