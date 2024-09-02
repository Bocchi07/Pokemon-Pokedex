import React, {useState, useEffect} from 'react'
import "../App.css"
import Logo from "../assets/Images/Pokemon_logo.png";
import { IoLogoGithub } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { TbArrowBigLeftLine } from "react-icons/tb";

function Header({handleMenuBar, backIsActive, setBackIsActive, closePage}) {
 const [isScrollingDown, setIsScrollingDown] = useState(false);
 const [lastScrollTop, setLastScrollTop] = useState(0);
 const [theme, setTheme] = useState("nord");
  const [themeIsActive, setThemeIsActive] = useState(false)

 useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);

 const handleThemeIsActive = () => {
    setThemeIsActive(t => !t ? true : false );
  }

 const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

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



  return(
    <header  className= {`header w-100%  h-16 fixed top-0 left-0 right-0 z-40 flex justify-between  shadow-sm px-4 ${isScrollingDown ? "hidden" : ""}`}>
        <div className=" w-[40%] flex justify-center ">
          <img src = {Logo} className="mr-auto pokemon-logo"/>
        </div>

        <div className="nav-list items-center justify-center flex-1">
          <ul className="flex gap-x-5 text-sm ml-auto mr-10 justify-center align-center mr-12 font-semibold">
            <li onClick={closePage} className={`gap-x-2 items-center w-20 mr-4 my-auto ${backIsActive ? 'flex' : 'hidden'}`}><TbArrowBigLeftLine />Back</li>

            <li><Link to="/">Home</Link></li>
            <li><Link to="/pagination">Pagination</Link></li>
            <li><Link to="/items">Items</Link></li>
            <li className="relative">
              <details>
                <summary  onClick={handleThemeIsActive} className="flex gap-x-1 items-center">Themes <RiArrowDownSLine className={`${themeIsActive ? "rotate-180" : "rotate-0"} transition-all`}/></summary>

                <div  className="theme-container text-white absolute top-12 w-60 right-1/2  shadow-md p-2 rounded-md flex flex-col gap-y-1">
                  <h2 className="text-left text-sm mb-2 p-1">Select a theme</h2>

                  <div onClick={() => handleThemeChange("cupcake")} className="text-black bg-slate-100 h-full rounded-full p-1 flex gap-x-2 items-center text-xs">
                    <div className=" border-[1px] border- h-6 w-6 rounded-full bg-white "></div>
                    <h3>Light</h3>
                  </div>

                  <div onClick={() => handleThemeChange("dim")} className="text-black bg-slate-100 h-full rounded-full p-1 flex gap-x-2 items-center text-xs">
                    <div className="white h-6 w-6 rounded-full bg-slate-800 "></div>
                    <h3>Dark</h3>
                  </div>

                  <div onClick={() => handleThemeChange("retro")} className="text-black bg-slate-100 h-full rounded-full p-1 flex gap-x-2 items-center text-xs">
                    <div className="white h-6 w-6 rounded-full bg-yellow-300"></div>
                    <h3>Retro</h3>
                  </div>

                  <div onClick={() => handleThemeChange("nord")} className="text-black bg-slate-100 h-full rounded-full p-1 flex gap-x-2 items-center text-xs">
                    <div className="white h-6 w-6 rounded-full  bg-slate-400"></div>
                    <h3>Nord</h3>
                  </div>

                  <div onClick={() => handleThemeChange("luxury")} className="text-black bg-slate-100 h-full rounded-full p-1 flex gap-x-2 items-center text-xs">
                    <div className="white h-6 w-6 rounded-full  bg-amber-800"></div>
                    <h3>Coffee</h3>
                  </div>

                  <div onClick={() => handleThemeChange("lemonade")} className="text-black bg-slate-100 h-full rounded-full p-1 flex gap-x-2 items-center text-xs">
                    <div className="white h-6 w-6 rounded-full  bg-yellow-200"></div>
                    <h3>Lemonade</h3>
                  </div>
                </div>
              </details>
            </li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="menu-bar w-[20%] justify-end gap-x-4 items-center mr-4">
          <RxHamburgerMenu className="text-xl cursor-pointer" onClick={handleMenuBar}/>
        </div>

    </header>
  )}


export default Header;