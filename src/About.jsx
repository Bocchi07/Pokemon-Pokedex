import React from 'react'
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoGithub } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function About() {
	return (
		<div className="relative mt-20 mb-10 text-left bg-slate-50 z-40 h-full rounded-lg p-4 shadow-xl">
			<h1 className="z-10 text-center text-3xl font-extrabold mb-8">About This Pokédex</h1>


	<div >
		<h2 className="text-2xl font-bold mb-2 z-10">Philosophy</h2>

		<p className="mb-4 text-slate-800">Hey there! I'm a huge Pokémon fan and a beginner developer who wanted to dive deeper into the world of coding while celebrating my love for Pokémon. This Pokédex project started as a fun way to explore the amazing data available through the <strong className="text-blue-600 hover:text-red-500 hover:border-b-2 border-red-500"><a href="https://pokeapi.co/" target="_blank">PokéAPI</a></strong>. I wanted to create something that not only helps others discover and learn about Pokémon but also showcases how much I enjoy both Pokémon and coding.
		</p>

		<p className="text-slate-800"> Building this project has been an exciting adventure, combining my passion for Pokémon with my curiosity about web development. It's been a great way to learn, experiment, and grow my skills, and I hope this Pokédex reflects that enthusiasm. Whether you're here to find info on your favorite Pokémon or just to check out what a fellow fan has been up to, I hope you enjoy exploring it as much as I enjoyed building it!
		</p>
	</div>

	<div className="mt-8">
		<h2 className="text-2xl font-bold mb-2">Features</h2>

		<p className="text-slate-800">
		<ul className="ml-4">
			<li>• <span className="text-blue-600 "> Search and Filter:</span> Find Pokémon quickly using our intuitive search bar and filtering options.</li>
			<li>• <span className="text-blue-600 "> Detailed Information:</span> Learn about each Pokémon's type, abilities, and evolution.</li>
			<li>• <span className="text-blue-600 "> Responsive Design: </span>Access the Pokédex on any device, with a layout that adapts to different screen sizes.</li>
		</ul>

  		 </p>
	</div>

	<div className="mt-8 mb-20">
		<h2 className="text-2xl font-bold mb-2">Technologies Used:</h2>

		<p className="text-slate-800">
		<p className="mb-2">To develop the Pokedex project, we utilized a variety of advanced tools and technologies. Each component played a crucial role in creating a seamless and interactive experience. Here’s an overview of the primary technologies that made this project possible:
		</p>

		<ul className="ml-4">
			<li>• <span className="text-blue-600 "> ReactJS</span> (A JavaScript library for creating dynamic user interfaces)</li>
			<li>• <span className="text-blue-600 "> Tailwind CSS</span> (A utility-first framework for rapid, customizable styling)</li>
			<li>• <span className="text-blue-600 "> Git </span>(Manages source code changes and collaboration through version tracking)</li>
			<li>• <span className="text-blue-600 ">VSCode </span>(A versatile code editor with debugging, syntax highlighting, and code completion.)</li>
			<li>• <span className="text-blue-600 "> PokéAPI </span>(Provides detailed Pokémon data, including stats and abilities, for the Pokedex.)</li>
			<li>• <span className="text-blue-600 "> API Integration </span>(Fetches and displays real-time Pokémon data to keep the app current)</li>
		</ul>

  		 </p>


  <div className="mt-20 text-sm text-center bg-gray-200 absolute bottom-0 left-0 w-full p-4">
    <p>
        © 2024 Pokédex Central. Catch 'Em All with Us! 🌟 Explore the world of Pokémon and stay updated with the latest Pokédex entries. Questions or feedback? Contact me at <strong>jeavenanda07@gmail.com</strong>. Follow me on
        <span className="cursor-pointer  flex justify-center gap-x-1 items-center inline-flex ml-2">
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
        </span>
    </p>
</div>

	</div>



		</div>
	)
}

export default About