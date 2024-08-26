import react from "react";
import PokemonLogo from "./assets/Images/Pokemon_logo.png"
import Sample1 from "./assets/Images/sample.jpg"
import Sample2 from "./assets/Images/sample2.png"
import Hero from "./assets/Images/loading-images.gif"

function Home(){

 return(
 	<div className="h-[100dvh] grid grid-cols-2 relative p-4">
 		<div className = "text-left grid grid-rows-3 gap-x-4 z-10">
 			{/*<h1 className>Pokemon</h1>*/}
	 		<div className="">
	 			<img src={PokemonLogo} alt = "pokemon_logo" className = "w-36 " />
	 		</div>

 			<div className = "">
 				<div className = "">
 					<h3 className = "text-4xl font-extrabold mb-4">Discover Every Pokémon!</h3>
	 				<p className = "mb-4">Explore our interactive Pokedex to find detailed stats, abilities, and evolution paths for all Pokémon. Perfect for trainers of all levels!</p>
	 				<button className = "bg-black text-white text-sm px-4 py-2 rounded-full">Explore the Pokedex</button>
 				</div>
 			</div>

 			<div className = " grid grid-cols-2 pr-20 gap-x-2 flex ">
 				<div className = "">
 					<img src={Sample1} alt="" className = "h-[80%] mt-auto"/>
 				</div>
 				<div className = "">
 					<img src={Sample2} alt="" className = ""/>
 				</div>
 			</div>
 		</div>

 		<div className = "z-10">
 			<div className =" h-[90%] ">
 				<img src={Hero} alt="" className = "h-[90%] m-auto"/>
 			</div>
 			<div className = "bg-green-400 h-[10%]"></div>
 		</div>

 		<div className="absolute top-1/2 left-[80%] w-[100vw] h-[100dvh] bg-orange-500 transform -translate-x-1/2 -translate-y-1/2 rotate-[10deg] z-0"></div>
 	</div>

 )
}

export default Home;

