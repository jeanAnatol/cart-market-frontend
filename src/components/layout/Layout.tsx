import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router";

// interface LayoutProps {
//   children: React.ReactNode;
// }

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto pt-24 min-h-[95vh]">
        {/*{children}*/}
      <Outlet />
      </div>
      <Footer />

    </>
  )

}
export default Layout;