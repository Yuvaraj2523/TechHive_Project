// src/components/AddItemForm.js
import React, { useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";

const AddItemForm = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreateItem = async () => {
    try {
      await axios.post("/api/items", { name, description });
      fetchItems();
      setName("");
      setDescription("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md" >
        <h2 className="text-2xl font-bold mb-6">Add New Item</h2>
        {isLoading ? (
          <p className="text-center text-gray-600">Adding item...</p>
        ) : (
          <>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded resize-none"
            rows="5"
            required
          />
        </div>
        </>
        )}
        <div className="flex justify-end">
          <button onClick={handleCreateItem}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>

    
  );
};

export default AddItemForm;
