//=======>>>>> BELOW IS THE ORIGINAL CODE FROM THE TUTORIAL <<<<<=======
// // src/components/EditItemForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import baseURL from '../apiConfig';

// const EditItemForm = ({ item, setEditItem }) => {
//   const [name, setName] = useState(item.name);
//   const [description, setDescription] = useState(item.description);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`${baseURL}/api/items/${item._id}`, { name, description })
//       .then((response) => console.log('Item updated:', response.data))
//       .catch((error) => console.error('Error updating item:', error));
//   };

//   return (
//     <form className="bg-white shadow-lg rounded-lg p-6" onSubmit={handleSubmit}>
//       <h2 className="text-3xl font-bold mb-6">Edit Item</h2>
//       <div className="mb-4">
//         <label htmlFor="name" className="block font-bold mb-2">
//           Name:
//         </label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="description" className="block font-bold mb-2">
//           Description:
//         </label>
//         <input
//           type="text"
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//           required
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="button"
//           className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
//           onClick={() => setEditItem(null)}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
//         >
//           Update Item
//         </button>
//         </div>
//     </form>
//   );
// };

// export default EditItemForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../apiConfig';

const EditItemForm = ({ item, setEditItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // If you want to pre-fill the form with the existing item data
    setName(item.name);
    setDescription(item.description);
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItem = {
      name,
      description,
    };

    try {
      const response = await axios.put(`${baseURL}/api/items/${item._id}`, updatedItem);
      console.log('Item updated:', response.data);

      // You may also want to update the item in the parent component's state
      // or refresh the item list after successful update

      setEditItem(null); // Close the edit form after successful update
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <form className="bg-white shadow-lg rounded-lg p-6" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold mb-6">Edit Item</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-2">
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
      <div className="mb-4">
        <label htmlFor="description" className="block font-bold mb-2">
          Description:
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
          onClick={() => setEditItem(null)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Update Item
        </button>
      </div>
    </form>
  );
};

export default EditItemForm;
