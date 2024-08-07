import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import useUserActions from "../utils/hooks/useUserActions";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const location = useLocation();
  const isCartPath = location.pathname == "/cart";
  const isMobiles = location.pathname == "/mobiles";
  const isSearched = location?.search.split("?")[1]?.includes("search");

  const [cartNumber, setCartNumber] = useState(0);
  // console.log(navigator.userAgent);
  const { user } = useUserActions();
  // console.log(user);

  const navItems = [
    {
      id: 1,
      name: "Home",
      route: "/",
    },
    {
      id: 2,
      name: "Mobiles",
      route: "/mobiles",
    },
    {
      id: 3,
      name: "About Us",
      route: "/about-us",
    },
    {
      id: 4,
      name: "Contact Us",
      route: "/contact-us",
    },
  ];

  const updateCartNumber = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartNumber(cart.length);
  };

  useEffect(() => {
    updateCartNumber();

    const handleStorageChange = () => {
      updateCartNumber();
    };

    const handleUpdateCart = () => {
      updateCartNumber();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("updateCart", handleUpdateCart);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("updateCart", handleUpdateCart);
    };
  }, []);

  if (location.pathname === "/login" || location.pathname === "/sign-up") {
    return;
  }

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-300 flex flex-col">
        {/* Navbar */}
        <div className="navbar container justify-between">
          <div className="lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square bg-transparent border-border border-none rounded-md hover:bg-border/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex px-2">
            {/* Navbar Logo */}
            <div className="flex gap-4 items-center cursor-pointer ">
              <Link to={"/"} className="hover:scale-[1.03] transition-all">
                <Logo />
              </Link>
              <div
                className={
                  isSearched || isMobiles
                    ? "hidden"
                    : "noLink z-50 hidden lg:block"
                }
              >
                <SearchBar />
              </div>
            </div>
          </div>
          <div>{user && <UserDropdown></UserDropdown>}</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu font-semibold menu-horizontal">
              {/* Navbar menu content here */}
              {navItems.map((nav) => (
                <li key={nav.id}>
                  <NavLink
                    className={
                      "navLink px-3 max-h-8 hover:bg-transparent hover:text-[#ef00d3]"
                    }
                    to={nav.route}
                  >
                    {nav.name}
                  </NavLink>
                </li>
              ))}
              {!user && (
                <li>
                  <div className="noLink h-8 flex ">
                    <>
                      <Link to={"/login"}>
                        <Button className={"btn-sm"}>Login</Button>
                      </Link>
                      <Link to={"/sign-up"}>
                        <Button className={"btn-sm btn-secondary"}>
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  </div>
                </li>
              )}
              <li>
                <Link
                  className={`${
                    isCartPath
                      ? "bg-primary-red hover:bg-primary-red text-white"
                      : "bg-border text-black hover:text-white"
                  } cartLink ml-1 w-8 h-8 p-0 flex justify-center rounded-md border-0  hover:bg-primary-red`}
                  to={"/cart"}
                >
                  <CartIcon cartValue={cartNumber} />
                </Link>
              </li>
              <li>
                <div className="noLink h-8 flex m-0 justify-center items-center">
                  {user && <UserDropdown />}
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* content */}
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay z-50"
        ></label>
        <ul className="menu z-50 w-[70%] sm:w-[40%] font-semibold bg-base-200 min-h-full p-2">
          <li>
            <Link to={"/"} className="noLink">
              <Logo />
            </Link>
          </li>
          <li>
            <div
              className={
                isSearched || isMobiles ? "hidden" : "noLink z-50 w-full"
              }
            >
              <SearchBar id="navSearch2" />
            </div>
          </li>
          {navItems.map((nav) => (
            <li className="z-40 my-1" key={nav.id}>
              <NavLink
                className={"navLink hover:bg-transparent hover:text-[#ef00d3]"}
                to={nav.route}
              >
                {nav.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              className={"navLink hover:bg-transparent hover:text-[#ef00d3]"}
              to={"/cart"}
            >
              <CartIcon cartValue={cartNumber} />
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink
                  className={
                    "navLink hover:bg-transparent hover:text-[#ef00d3]"
                  }
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    "navLink hover:bg-transparent hover:text-[#ef00d3]"
                  }
                  to={"/sign-up"}
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
