import React, { useState, useEffect } from 'react';
import "../../App.css";
import axios from 'axios';
import "../../App.css"

function Item() {
  const [itemList, setItemList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inputList, setInputList] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("- All -");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); // State to track the current offset
  const limit = 100; // Limit for each fetch

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/item?offset=${offset}&limit=${limit}`);
        const url = response.data.results.map(res => res.url);
        const categoriesSet = new Set();

        const urlRes = url.map((d) => axios.get(d));
        const urlPromise = await Promise.all(urlRes);

        const items = urlPromise.map((res) => {
          let { id, sprites, name, category, flavor_text_entries } = res.data;

          // Check if flavor_text_entries exists and has more than 1 entry
          const cleanedEffectEntry = (flavor_text_entries && flavor_text_entries[1] && flavor_text_entries[1].text)
            ? flavor_text_entries[1].text.replace(/\n/g, " ").replace(/\s+/g, " ").trim()
            : ""; // Default to an empty string if flavor_text_entries doesn't have a valid entry

          const itemCategorize = () => {
            const categoryName = category.name;
            let categoryClass = '';

            if (categoryName.includes('ball')) {
              categoryClass = "Pokeballs";
            } else if (categoryName.includes('cure') || categoryName.includes('healing') || categoryName.includes('revival') || categoryName.includes('pp-recovery')) {
              categoryClass = "Medicine";
            } else if (categoryName.includes('spelunking') || name.includes('flute') || name.includes('fossil') || categoryName.includes('loot') || categoryName.includes('collectibles') || categoryName.includes('mulch')) {
              categoryClass = "General items";
            } else if (categoryName.includes('evolution')) {
              categoryClass = 'Hold items';
            } else if (categoryName.includes('stat-boost')) {
              categoryClass = 'Battle items';
            } else if (categoryName.includes('baking-only') || name.includes('berry')) {
              categoryClass = 'Berries';
            } else {
              categoryClass = category.name[0].toUpperCase() + category.name.slice(1);
            }

            categoriesSet.add(categoryClass); // Add to the set of categories
            return categoryClass;
          };

          return {
            id, // Add real ID here
            sprites: sprites.default,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            category: itemCategorize(),
            effect_entries: cleanedEffectEntry,
          };
        });

        setCategories(prevCategories => Array.from(new Set([...prevCategories, ...categoriesSet])).sort());
        setItemList(prevItems => [...prevItems, ...items]);
        setFilteredList(prevItems => [...prevItems, ...items]);
      } catch (error) {
        console.error("Failed to fetch items:", error); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  useEffect(() => {
    const filtered = itemList.filter(item =>
      item.name.toLowerCase().includes(inputList.toLowerCase()) &&
      (selectedCategory === "- All -" || item.category === selectedCategory)
    );
    setFilteredList(filtered);
  }, [inputList, selectedCategory, itemList]);

  const handleInputItem = (e) => {
    setInputList(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + limit); // Increase offset to load more items
  };

const renderList = filteredList.map((data, index) => (
  <tr className="tr-content pb-2 hover:bg-violet-50 transition-colors" key={`${data.id}-${index}`}>
    <td className="td text-xs font-semibold opacity-70 id-table">#{String(data.id).padStart(4, '0')}</td>
    <td className="name-table-section border-0 p-2 text border-bottom-black flex flex-wrap  items-center">
      <img src={data.sprites} alt="img_not_found" className=""/>
      <p className="font-semibold text-sm text-blue-500">{data.name}</p>
    </td>
    <td className="td name text-sm p-1">{data.category}</td>
    <td className="td description text-left text-sm p-2">{data.effect_entries}</td>
  </tr>
));

  return (
    <div className="mt-20 z-20  p-4 relative rounded-md shadow-xl" >
      <h1 className="text-3xl font-bold">Pokémon item list</h1>

      <p className="opacity-100 text-base my-4 text-left p-4 rounded-md">
        Discover a variety of items available in the Pokémon world, from Poké Balls to Potions. Each item has a unique effect, helping you catch Pokémon, heal your team, or gain an edge in battle. Browse through the categories to learn how these items can help you on your journey to becoming a Pokémon Master!
      </p>

      <div className="mb-8 flex space-x-4 items-center justify-center ">
        <form onSubmit={(e) => e.preventDefault()} className="table-form gap-y-4 flex justify-start gap-x-4 pace-x-2 text-center ">
          <div>
            <label htmlFor="input-filter" className="font-semibold mr-4">Filter:</label>
            <input
              type="text"
              placeholder="Search Item"
              value={inputList}
              onChange={handleInputItem}
              id="input-filter"
              className="bg-white text-sm py-3 px-4 rounded-md border-[1px] border-slate-200"
            />
          </div>

          <div>
             <label htmlFor="categorize-item" className="mr-4 font-semibold">Category:</label>
             <select value={selectedCategory} onChange={handleCategoryChange} id="categorize-item" className="bg-white text-sm py-3 px-4 rounded-md border-[1px] border-slate-200">
                <option value="- All -">- All -</option>
                {categories.map((category, index) => (
                  <option value={category} key={index}>{category}</option>
                ))}
            </select>
          </div>

        </form>
      </div>

      <table className="table w-full p-4">
        <thead>
          <tr>
            <th className="th bg-violet-50 max-w-[5%] w-[20%] p-2 id-table">ID</th>
            <th className="th bg-violet-50 max-w-[30%] w-[20%] p-2 ">Name</th>
            <th className="th bg-slate-100 max-w-[30] w-[20%]">Category</th>
            <th className="th bg-slate-100 w-full">Effect</th>
          </tr>
        </thead>
        <tbody>
          {renderList}
        </tbody>
      </table>

      {loading && (
        <button disabled type="button" className="mx-auto bg-blue-400 py-2 px-4 rounded-md text-sm text-white mt-4 cursor-wait">
          <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67225 50 9.67225C27.4013 9.67225 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.553C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7233 75.2124 7.41289C69.5422 4.10251 63.2754 1.94025 56.7222 1.05126C51.7666 0.367145 46.7398 0.447208 41.8198 1.27806C39.3163 1.69394 37.8234 4.19778 38.4605 6.62326C39.0975 9.04874 41.5791 10.4717 44.0587 10.1071C47.8519 9.53664 51.7191 9.48827 55.5404 10.0007C60.8643 10.7506 65.9921 12.5849 70.6331 15.3932C75.274 18.2015 79.3347 21.9262 82.5849 26.362C85.1228 29.8409 87.1335 33.6516 88.5306 37.639C89.3241 39.8287 91.5425 40.9716 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
          Loading...
        </button>
      )}

      {!loading && (
        <button onClick={handleLoadMore} className="mx-auto bg-blue-400 py-2 px-4 rounded-md text-sm text-white mt-4 hover:bg-blue-500 transition-colors">
          Load More
        </button>
      )}
    </div>
  );
}

export default Item;
