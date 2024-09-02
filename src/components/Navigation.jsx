import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import "../App.css"

import { CgPokemon } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { GiSquareBottle } from "react-icons/gi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { BiExit } from "react-icons/bi";
import { RiColorFilterLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";

function Navigation({menuIsActive, handleMenuBar, closePage}) {
   const [theme, setTheme] = useState("nord");
   const [themeIsActive, setThemeIsActive] = useState(false)

   useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

   const handleThemeChange = (newTheme) => {
      setTheme(newTheme);
  };

  const handleThemeIsActive = () => {
    setThemeIsActive(t => !t ? true : false );
  }

	return (
	<div className={`${!menuIsActive ? 'hidden' : 'active'} overflow-hidden transition-all menu-bar transition-all fixed top-20 right-[1rem] w-[90vw] text-white shadow-2xl z-20 p-4 rounded-md z-50`} >
       <ul className="w-full  overflow-hidden">
       {/*<li className="absolute -top-1 -right-1 gap-x-2 hover:opacity-100 opacity-60 pt-3 p-2 text-2xl ml-auto rounded-md" onClick={handleMenuBar}><IoMdCloseCircle/></li>*/}
       <Link to="/"> <li className="flex items-center w-full gap-x-2 hover:bg-violet-50 hover:text-black p-2 rounded-full" onClick={handleMenuBar}><span><IoHomeOutline /></span>Home</li></Link>
       <Link to="/pagination"> <li className="flex items-center gap-x-2 hover:bg-violet-50 p-2 rounded-full hover:text-black" onClick={handleMenuBar}><span><CgPokemon /></span>Pagination</li></Link>
       <Link to="/items"><li className="flex items-center gap-x-2 hover:bg-violet-50 p-2 rounded-full hover:text-black" onClick={handleMenuBar}><span><GiSquareBottle /></span>Items</li></Link>
       <Link to="/about"> <li className="flex items-center gap-x-2 hover:bg-violet-50 p-2 rounded-full hover:text-black" onClick={handleMenuBar}><span><FaRegCircleQuestion /></span>About</li></Link>
       <li className="flex ">
              <details>
                <summary onClick={handleThemeIsActive} className="flex items-center gap-x-2 p-2"><RiColorFilterLine /> Themes <RiArrowDownSLine  className={`${themeIsActive ? "rotate-180" : "rotate-0"} transition-all`}/></summary>

                <div className="ml-6 text-white flex flex-col gap-y-1 mb-2 transition-all w-full">
                  <h2 className="flex justify-start text-sm -ml-2 p-1">Select a theme</h2>

                  <div onClick={() => handleThemeChange("cupcake")} className="text-white h-full rounded-full p-1 flex gap-x-2 items-center text-xs hover:bg-violet-50  hover:text-black w-full">
                    <div className=" border-[1px] border- h-6 w-6 rounded-full bg-white "></div>
                    <h3>Light</h3>
                  </div>

                  <div onClick={() => handleThemeChange("dim")} className="text-white h-full rounded-full p-1 flex gap-x-2 items-center text-xs hover:bg-violet-50  hover:text-black w-full">
                    <div className="white h-6 w-6 rounded-full bg-slate-800 "></div>
                    <h3>Dark</h3>
                  </div>

                  <div onClick={() => handleThemeChange("retro")} className="text-white h-full rounded-full p-1 flex gap-x-2 items-center text-xs hover:bg-violet-50  hover:text-black w-full">
                    <div className="white h-6 w-6 rounded-full bg-yellow-300"></div>
                    <h3>Retro</h3>
                  </div>

                  <div onClick={() => handleThemeChange("nord")} className="text-white h-full rounded-full p-1 flex gap-x-2 items-center text-xs hover:bg-violet-50  hover:text-black w-full">
                    <div className="white h-6 w-6 rounded-full  bg-slate-400"></div>
                    <h3>Nord</h3>
                  </div>

                  <div onClick={() => handleThemeChange("luxury")} className="text-white h-full rounded-full p-1 flex gap-x-2 items-center text-xs hover:bg-violet-50  hover:text-black w-full">
                    <div className="white h-6 w-6 rounded-full  bg-amber-800"></div>
                    <h3>Coffee</h3>
                  </div>

                  <div onClick={() => handleThemeChange("lemonade")} className="text-white h-full rounded-full p-1 flex gap-x-2 items-center text-xs hover:bg-violet-50  hover:text-black w-full">
                    <div className="white h-6 w-6 rounded-full  bg-yellow-200"></div>
                    <h3>Lemonade</h3>
                  </div>
                </div>
              </details>
            </li>
        <li className="flex items-center gap-x-2 hover:bg-violet-50 p-2 rounded-full hover:text-black" onClick={() => {
            closePage();
            handleMenuBar();
          }} ><span><BiExit className="rotate-180"/></span>Back to Page</li>
      </ul>
    </div>
	)
}

export default Navigation