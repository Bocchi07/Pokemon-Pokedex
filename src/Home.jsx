import react from "react";
import React, { useState, useEffect } from "react";
import PokemonLogo from "./assets/Images/Pokemon_logo.png"
import Sample1 from "./assets/Images/sample.jpg"
import Sample2 from "./assets/Images/sample2.png"
import Hero from "./assets/Images/hero.png"
import Hero1 from "./assets/Images/pikachu.png"
import ImgSlider from "./assets/Images/img-slider.png"
import ImgSlider1 from "./assets/Images/img-slider1.png"
import ImgSlider2 from "./assets/Images/img-slider2.png"
import ImgSlider3 from "./assets/Images/img-slider3.png"
import ImgSlider4 from "./assets/Images/img-slider-4.png"
import ImgSlider5 from "./assets/Images/img-slider-5.png"
import ImgSlider6 from "./assets/Images/img-slider6.png"
import ImgSlider7 from "./assets/Images/img-slider-7.png"
import "./App.css";

import { Link } from 'react-router-dom';
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoGithub } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GrFormNextLink, GrFormPreviousLink  } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";

function Home({handleBar}){
  const images = [ImgSlider, ImgSlider1, ImgSlider2, ImgSlider3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

       const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

    const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


 return(
 	<div >
	 	<div className="home-mobile-view h-[100dvh]">
	 	   	<div className="home-glass">
	 	   		<div className="text-left translate-y-4 text-base text-white font-semibold  flex items-center gap-x-2 p-4">
	{/*	 		 	<GiHamburgerMenu className="cursor-pointer" onClick={handleBar}/>
		 			<p>Menu</p>*/}
	 			</div>

		 		<div className="home-box text-white p-4  w-full   rounded-xl">
		 			<img src={PokemonLogo} alt="" className="w-60 mx-auto mt-10"/>

		{/* 			<div >
		 				<form action="" onSubmit={searchedPokemon} className="flex">
			 				<input
			 					type="text"
			 					placeholder="Search Pokemon"
			 					className="py-3 shadow-md flex-1 h-13 rounded-xl text-sm text-black"
			 					value={searchPokemon}
	               				onChange={handleSearch}
			 				/>
			 				<CiSearch className="w-12 bg-orange-500 text-white py-3 font-extrabold mx-2 h-12 rounded-xl cursor-pointer text-sm"/>
		 				</form>
		 			</div>*/}

		 			<p className="text-left mt-4 text-sm">Explore the world of Pokémon like never before! With our interactive Pokedex, you can search for your favorite Pokémon, learn about their unique abilities, stats, and evolution paths, and stay updated on the latest trends in the Pokémon universe. Whether you're a seasoned trainer or just starting your journey, our Pokedex is your ultimate guide to every Pokémon adventure.</p>
		 			<p className="text-left mt-4 text-sm"><strong>Popular Searches:</strong> Discover fan favorites like Pikachu, Charizard, Bulbasaur, Mewtwo, Eevee, Snorlax, Gengar, Lucario, Greninja, and more!</p>
		 			<Link to="/pagination"><button type="button" className="bg-orange-500 h-12 py-3 px-5 w-full mt-10 text-white rounded-lg font-bold">Start Exploring!</button></Link>
		 		</div>
	 	   	</div>

	 	</div>


	 <div className="home-container h-[100dvh] relative p-4">
 		<div className ="home-first-container relative text-left  gap-x-4 z-10">
 			{/*<h1 className>Pokemon</h1>*/}
	 		<div className="mb-auto">
	 			<img src={PokemonLogo} alt = "pokemon_logo" className = "w-36 " />
	 		</div>

 			<div className = "sec-home-section z-20 mb-auto mt-10">
 				<div className = "z-20">
 					<h3 className = " font-extrabold mb-4 z-30 ">Discover Every Pokémon!</h3>
	 				<p className = "mb-4 home-description">Explore our interactive Pokedex to find detailed stats, abilities, and evolution paths for all Pokémon. Perfect for trainers of all levels!</p>
	 				<button className = "bg-blue-600 text-white text-sm px-5 py-2 h-10 rounded-full "><Link to="/pagination">Explore the Pokedex</Link></button>
 				</div>
 			</div>

	<div className="slider-container z-30 relative inner-shadow items-center gap-x-2 p-2">
      {/* Display images based on current page */}
      {currentPage === 1 && (
        <>
          <div>
            <img src={ImgSlider1} alt="First Image" className="first-img rounded-2xl" />
          </div>
          <div>
            <img src={ImgSlider} alt="Second Image" className="sec-img rounded-2xl" />
          </div>
        </>
      )}

      {currentPage === 2 && (
        <>
          <div>
            <img src={ImgSlider4} alt="Third Image" className="first-img rounded-2xl" />
          </div>
          <div>
            <img src={ImgSlider3} alt="Fourth Image" className=" sec-img rounded-2xl" />
          </div>
        </>
      )}

      {currentPage === 3 && (
        <>
          <div>
            <img src={ImgSlider6} alt="Third Image" className="first-img rounded-2xl" />
          </div>
          <div>
            <img src={ImgSlider7} alt="Fourth Image" className="sec-img rounded-2xl" />
          </div>
        </>
      )}

      {/* Navigation Controls */}
      <h4 className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-x-2 text-sm font-semibold">

       {/* Previous Button */}
        {currentPage > 1 && (
          <span>
            <GrFormPreviousLink onClick={handlePrevious} className="cursor-pointer" />
          </span>
        )}
        {currentPage} of {totalPages}
        {/* Next Button */}
        {currentPage < totalPages && (
          <span>
            <GrFormNextLink onClick={handleNext} className="cursor-pointer" />
          </span>
        )}
      </h4>
    </div>

 		</div>

 		<div className = "z-30">
 			<div className =" h-[90%]">
 				<img src={Hero} alt="" className = "hero h-[90%] min-h[50%] m-auto z-30"/>
 			</div>
 			<div className = " flex justify-end gap-x-2 items-end p-2">
		           <a href="https://www.instagram.com/kafka_beta/" target="_blank">
		           	 <AiFillInstagram className="cursor-pointer text-xl translate-y-1"/>
		           </a>
		           <a href="" target="_blank">
		            <IoLogoGithub className="text-xl translate-y-1"/>
		           </a>
		           <a href="https://www.facebook.com/jeaven.anda.9/" target="_blank">
		           	 <FaFacebook className="cursor-pointer text-xl translate-y-1"/>
		           </a>
		           <a href="https://www.linkedin.com/in/jeaven-anda-426b6b312/?originalSubdomain=ph" target="_blank">
		           	<FaLinkedin className="cursor-pointer text-xl translate-y-1"/>
		           </a>
 			</div>
 		</div>

 		<img src={Hero1} alt="" className = "w-[23rem] fixed -right-20 top-20 second-hero  z-10"/>
 		<div className="fixed top-1/2 left-[90%] w-[100vw] h-[80rem] bg-orange-400 transform -translate-x-1/2 rotate-[10deg] -translate-y-1/2  z-0"></div>
 	</div>
 </div>



 )
}

export default Home;

