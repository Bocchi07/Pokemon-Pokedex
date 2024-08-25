import React, {useState, useEffect} from 'react'
import "../App.css"
import Logo from "../assets/Images/Pokemon_logo.png";
import { IoLogoGithub } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

function Header() {
 const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setIsScrollingDown(true);
      } else {
        // Scrolling up
        setIsScrollingDown(false);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // Avoid negative scrollTop
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);


  return (
    <header className= {`header w-100%  h-16 fixed top-0 left-0 right-0 z-30 flex justify-between align-center shadow-sm px-4 ${isScrollingDown ? "hidden" : ""}`}>
        <div className=" w-[20%] flex justify-center">
          <img src = {Logo} className="h-full"/>
        </div>

        <div className="flex items-center justify-center flex-1">
          <ul className="flex gap-x-6 text-sm justify-center align-center ">
            <li>Home</li>
            <li>Pagination</li>
            <li>Items</li>
            <li>About</li>
          </ul>
        </div>

        <div className="w-[20%] flex justify-end gap-x-4 items-center mr-8">
          <IoLogoGithub />
{/*          <FaFacebook />
          <CgMail />*/}
        </div>
    </header>
  )}


export default Header;