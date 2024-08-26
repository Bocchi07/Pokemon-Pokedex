import React, {useEffect, useState} from 'react'

function FilterItem() {
	useEffect(() => {
		const filter = async() => {
			const response = await axios.get("https://pokeapi.co/api/v2/item?offset=0&limit=2180");
			// const promise = response.
			console.log(res);
		}
	})

	return (
		<select className="w-44 h-10 px-3 text-sm rounded-md bg-white border-0 border-slate-100 shadow-md cursor-pointer mb-8">
			<option value="">Items</option>

		</select>
	)
}

export default FilterItem