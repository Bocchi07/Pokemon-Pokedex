import React, {useState, useEffect} from 'react'
import "../App.css"
import Logo from "../assets/Images/Pokemon_logo.png";
import { IoLogoGithub } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";

function Header({handleMenuBar}) {
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
        <div className=" w-[40%] flex justify-center ">
          <img src = {Logo} className="mr-auto pokemon-logo"/>
        </div>

        <div className="nav-list items-center justify-center flex-1">
          <ul className="flex gap-x-6 text-sm justify-center align-center ml-auto mr-12 font-semibold">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pagination">Pagination</Link></li>
            <li><Link to="/items">Items</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="menu-bar w-[20%] justify-end gap-x-4 items-center mr-8">
          <RxHamburgerMenu className="text-xl cursor-pointer" onClick={handleMenuBar}/>
        </div>

    </header>
  )}


export default Header;