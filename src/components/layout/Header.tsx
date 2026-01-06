import {Link} from "react-router";
import LogoutButton from "../LogoutButton.tsx";

const Header = () => {

  return (
    <>
      <header className="bg-blue-800 w-full fixed top-0 left-0 h-30 z-[1000] border-b-2 border-blue-400"> {/* <-- z-index-50  */}
        <div className="container flex mx-auto justify-between items-center">
          <div className="fixed mt-18 -ml-10">
          <Link
            to="/"
            className=""
          >
            <img src="../../../src/assets/logo.png" alt="#"/>
          </Link>
          
          </div>
          <div className="grid mt-5">
            <div >
              <Link to="/account" className="text-white ml-270">My Account</Link>
            </div>
            <div className="fixed ml-300">
              <div>
                <Link className="text-white" to="/login">Login</Link>
              </div>
              <div>
                <Link className="text-white" to="/register">Register</Link>
              </div>
              <div>
              <LogoutButton />
            </div>
          </div>
          
        </div>
        </div>
      </header>

    </>
  )
}
export default Header