// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import baseURL from '../apiConfig';
// import EditItemForm from './EditItemForm';

// const ItemList = () => {
//   const [items, setItems] = useState([]);
//   const [editItem, setEditItem] = useState(null);

//   useEffect(() => {
//     // Fetch items from the backend
//     axios
//       .get(`${baseURL}/api/items`)
//       .then((response) => setItems(response.data))
//       .catch((error) => console.error('Error fetching items:', error));
//   }, []);

//   const handleEditItem = (item) => {
//     setEditItem(item); // Set the editItem state when the user clicks "Edit"
//   };

//   // Function to delete an item from the list and the database
//   const handleDeleteItem = (itemId) => {
//     axios
//       .delete(`${baseURL}/api/items/${itemId}`)
//       .then(() => {
//         setItems(items.filter((item) => item._id !== itemId));
//       })
//       .catch((error) => console.error('Error deleting item:', error));
//   };

//   return (
// <div className="p-4">
//       <h2 className="text-3xl font-bold mb-4">Item List</h2>
//       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {items.map((item) => (
//           <li
//             key={item._id}
//             className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 transform hover:scale-105"
//           >
//             <div className="p-6">
//               <h3 className="text-xl font-semibold mb-3">{item.name}</h3>
//               <p className="text-gray-600">{item.description}</p>
//             </div>
//             <div className="bg-gray-100 py-3 px-6 flex justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//                 onClick={() => handleEditItem(item)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
//                 onClick={() => handleDeleteItem(item._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       {editItem && <EditItemForm item={editItem} setEditItem={setEditItem} />}
//     </div>
//   );
// };

// export default ItemList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../apiConfig';
import EditItemForm from './EditItemForm';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/items`);
      setItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleEditItem = (item) => {
    setEditItem(item);
  };

  // Function to delete an item from the list and the database
  const handleDeleteItem = (itemId) => {
    axios
      .delete(`${baseURL}/api/items/${itemId}`)
      .then(() => {
        setItems(items.filter((item) => item._id !== itemId));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  return (
<div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Item List</h2>
      {isLoading ? (
        <p className="text-center font-bold text-gray-600">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-center font-bold text-red-600">No items found</p>
      ) : (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <li
            key={item._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 transform hover:scale-105"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div className="bg-gray-100 py-3 px-6 flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => handleEditItem(item)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => handleDeleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      )}
      {editItem && <EditItemForm item={editItem} setEditItem={setEditItem} />}
    </div>
  );
};

export default ItemList;
