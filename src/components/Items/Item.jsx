import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './ItemList.jsx';

const Item = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/item?offset=0&limit=1000')
      .then(response => {
        setItems(response.data.results);
      })
      .catch(error => console.log(error));
  }, []);

  const categories = {
    "items": items.filter(item => item.name.includes('item')),
    "medicine": items.filter(item => item.name.includes('medicine')),
    "pokeballs": items.filter(item => item.name.includes('ball')),
    "tms": items.filter(item => item.name.includes('tm')),
    "berries": items.filter(item => item.name.includes('berry')),
    "mail": items.filter(item => item.name.includes('mail')),
    "battle": items.filter(item => item.name.includes('battle')),
    "key": items.filter(item => item.name.includes('key'))
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <h1 className="mt-20">Pokémon Items</h1>
      <div>
        {Object.keys(categories).map((category, index) => (
          <button key={index} onClick={() => handleCategoryClick(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      {selectedCategory && !selectedItem && (
        <ItemList items={categories[selectedCategory]} onItemClick={handleItemClick} />
      )}
      {selectedItem && (
        <div>
          <h2>{selectedItem.name}</h2>
          {/* Fetch and display more detailed info about the selected item here */}
        </div>
      )}
    </div>
  );
};

export default Item;
