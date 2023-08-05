import React, { useEffect, useState } from 'react';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import EditItemForm from './components/EditItemForm';
import axios from 'axios';
import baseURL from './apiConfig';

function App() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/items`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  // Function to add a new item to the list
  const handleAddItem = (newItem) => {
    axios
      .post(`${baseURL}/api/items`, newItem)
      .then((response) => {
        setItems([...items, response.data]);
      })
      .catch((error) => console.error('Error creating item:', error));
  };

  // Function to update an existing item in the list
  const handleUpdateItem = (updatedItem) => {
    axios
      .put(`${baseURL}/api/items/${updatedItem._id}`, updatedItem)
      .then((response) => {
        setItems(items.map((item) => (item._id === updatedItem._id ? response.data : item)));
        setEditItem(null);
      })
      .catch((error) => console.error('Error updating item:', error));
  };

  // Function to delete an item from the list
  const handleDeleteItem = (itemId) => {
    axios
      .delete(`${baseURL}/api/items/${itemId}`)
      .then(() => {
        setItems(items.filter((item) => item._id !== itemId));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl text-blue-600 font-bold mb-4 pl-3">MERN CRUD App</h1>
    <div className="grid grid-cols-2 gap-1 border border-blue-400 rounded border-2 p-5">
     <div>
     {/* Display the list of items */}
        <ItemList items={items} setEditItem={setEditItem} handleDeleteItem={handleDeleteItem} />
      </div>
      <div>
        {/* Show the AddItemForm when there's no editItem */}
        {!editItem ? <AddItemForm handleAddItem={handleAddItem} /> : null}

        {/* Show the EditItemForm when there's an editItem */}
        {editItem ? (
          <EditItemForm item={editItem} handleUpdateItem={handleUpdateItem} setEditItem={setEditItem} />
        ) : null}
      </div>
    </div>
  </div>
);
}

export default App;
