import React, { useState, useEffect } from 'react';
import "../../App.css"
import axios from 'axios';

function Item({setLoading}) {
  const [itemList, setItemList] = useState();
  const [loadMore, setLoadMore] = useState(false)
  const [limit, setLimit] = useState(100)

  const handleLoadMore = () => {
    setLimit(prevLimit => prevLimit + 100)
  }

  useEffect(() => {
  const fetchData = async () => {
    setLoadMore(true);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/item?offset=0&limit=${limit}`);
      const url = response.data.results.map(res => res.url);

      const urlRes = url.map((d) => axios.get(d));
      const urlPromise = await Promise.all(urlRes);

      const items = urlPromise.map((res) => {
        let { sprites, name, category, flavor_text_entries } = res.data;

        const cleanedEffectEntry = flavor_text_entries[1].text
          .replace(/\n/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const itemCategorize = () => {
          const categoryName = category.name;
          let categoryClass = '';

          if (categoryName.includes('ball')) {
            categoryClass = "Pokeball";
          } else if (categoryName.includes('cure') || categoryName.includes('healing') || categoryName.includes('revival') || categoryName.includes('pp-recovery')) {
            categoryClass = "Medicine";
          } else if (categoryName.includes('spelunking') || name.includes('flute') || name.includes('fossil') || categoryName.includes('loot') || categoryName.includes('collectibles') || categoryName.includes('mulch')) {
            categoryClass = "General Item";
          } else if (categoryName.includes('evolution')) {
            categoryClass = 'Hold Items';
          } else if (categoryName.includes('stat-boost')) {
            categoryClass = 'Battle Items';
          } else if (categoryName.includes('baking-only') || name.includes('berry')) {
            categoryClass = 'Berries';
          } else {
            categoryClass = category.name[0].toUpperCase() + category.name.slice(1);
          }

          return categoryClass;
        };

        return {
          sprites: sprites.default,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          category: itemCategorize(),
          effect_entries: cleanedEffectEntry,
        };
      });

      await setItemList(items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadMore(false);
    }
  };

  fetchData();
}, [limit]);


  return (
    <div className="mt-20 z-20 bg-white m-4 p-4 relative rounded-md shadow-xl">
      <h1 className="text-3xl font-bold">Pokémon item list</h1>

      <p className="opacity-80 text-base my-4 bg-slate-100 text-left p-4 rounded-md">Discover a variety of items available in the Pokémon world, from Poké Balls to Potions. Each item has a unique effect, helping you catch Pokémon, heal your team, or gain an edge in battle. Browse through the categories to learn how these items can help you on your journey to becoming a Pokémon Master!</p>

     <table className="table w-full p-4">
          <thead>
            <tr className="">
              <th className="th bg-violet-50 max-w-[5%] w-[20%] p-2 ">ID</th>
              <th className="th bg-violet-50 max-w-[30%] w-[20%] p-2 ">Name</th>
              <th className="th bg-slate-100 max-w-[30] w-[20%]">Category</th>
              <th className="th bg-slate-100 w-full">Effect</th>
            </tr>
          </thead>

          <tbody>
            {
              itemList && itemList.map((data, index) => {
                return (
                   <tr className="tr-content pb-2" key={index}>
                      <td className="td text-xs font-semibold opacity-70">#{String(index + 1).padStart(4, '0')}</td>

                      <td className=" border-0 p-2 text border-bottom-black flex items-center">
                        <img src={data.sprites} alt="img_not_found" />
                        <p className="font-semibold ">{data.name}</p>
                      </td>

                      <td className="td name">{data.category}</td>
                      <td className="td description text-left text-sm">{data.effect_entries}</td>
                   </tr>
                  )
              })
            }

          </tbody>
        </table>

    {
      loadMore ?  <button disabled type="button" className="mx-auto bg-blue-400 py-2 px-4 rounded-md text-sm text-white mt-4 cursor-wait">
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                      </svg>
                      Loading items...
                  </button>

               :  <button onClick={handleLoadMore} className="load-more-items mx-auto py-2 px-4 rounded-md text-sm text-white mt-4">Load More</button>
    }

    </div>
  )
}

export default Item;



// const Item = () => {
//   const [items, setItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     axios.get('https://pokeapi.co/api/v2/item?offset=0&limit=2180')
//       .then(response => {
//         setItems(response.data.results);
//       })
//       .catch(error => console.log(error));
//   }, []);

//   const categories = {
//     "items": items.filter(item => item.name.includes('item')),
//     "medicine": items.filter(item => item.name.includes('medicine')),
//     "pokeballs": items.filter(item => item.name.includes('ball')),
//     "tms": items.filter(item => item.name.includes('tm')),
//     "berries": items.filter(item => item.name.includes('berry')),
//     "mail": items.filter(item => item.name.includes('mail')),
//     "battle": items.filter(item => item.name.includes('battle')),
//     "key": items.filter(item => item.name.includes('key'))
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSelectedItem(null);
//   };

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//   };

//   return (
//     <div>
//       <h1 className="z-30 mt-20">Pokémon Items</h1>
//       <div>
//         {Object.keys(categories).map((category, index) => (
//           <button key={index} onClick={() => handleCategoryClick(category)}>
//             {category.charAt(0).toUpperCase() + category.slice(1)}
//           </button>
//         ))}
//       </div>
//       {selectedCategory && !selectedItem && (
//         <ItemList items={categories[selectedCategory]} onItemClick={handleItemClick} />
//       )}
//       {selectedItem && (
//         <div>
//           <h2>{selectedItem.name}</h2>
//           {/* Fetch and display more detailed info about the selected item here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Item;
