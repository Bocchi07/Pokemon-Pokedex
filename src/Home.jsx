import react from "react";
import PokemonLogo from "./assets/Icons/Logo.png"
import Sample1 from "./assets/Images/sample.jpg"
import Sample2 from "./assets/Images/sample2.png"
import Hero from "./assets/Images/loading-images.gif"

function Home(){

 return(
 	<div className="h-[100dvh] w-[100dvw] grid grid-cols-2 p-8 pb-14">
 		<div className = "text-left flex flex-col">
 			{/*<h1 className>Pokemon</h1>*/}
	 		<div className="h-[20%]">
	 			<img src={PokemonLogo} alt = "pokemon_logo" className = "w-52 " />
	 		</div>

 			<div className = "flex-1 pt-20">
 				<div className = "">
 					<h3 className = "text-4xl font-extrabold mb-4">Gotta Search 'Em All!</h3>
	 				<p className = "mb-4">Pokemon, also known as Pocket Monster in Japan, is a japanese media franchie managed by the Pokemon Companu, a company</p>
	 				<button className = "bg-blue-500 text-white text-base px-4 py-2 rounded-full">Explore Pokedex</button>
 				</div>
 			</div>

 			<div className = "h-[20%] grid grid-cols-2 pr-20 gap-x-2 flex ">
 				<div className = "">
 					<img src={Sample1} alt="" className = "h-[80%] mt-auto"/>
 				</div>
 				<div className = "">
 					<img src={Sample2} alt="" className = ""/>
 				</div>
 			</div>
 		</div>

 		<div className = "">
 			<div className =" h-[90%] ">
 				<img src={Hero} alt="" className = "h-[90%] m-auto"/>
 			</div>
 			<div className = "bg-green-400 h-[10%]"></div>
 		</div>
 	</div>

 )
}

export default Home;

