// import React, { useState, useEffect } from "react";
// import "./MarkerForm.css";

// const MarkerForm = ({ onSubmit, onCancel, initialData }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [date, setDate] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   useEffect(() => {
//     if (initialData) {
//       setTitle(initialData.title || "");
//       setDescription(initialData.description || "");
//       setCategory(initialData.category || "");
//       setDate(initialData.date || "");
//       setImage(initialData.image || null);
//     } else {
//       setTitle("");
//       setDescription("");
//       setCategory("");
//       setDate("");
//       setImage(null);
//     }
//   }, [initialData]);

//   useEffect(() => {
//     if (!image) {
//       setPreview("");
//       return;
//     }
//     if (typeof image === "string") {
//       setPreview(image);
//     } else {
//       setPreview("");
//     }
//   }, [image]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       title,
//       description,
//       category,
//       date,
//       image,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="marker-form-overlay">
//       <form className="marker-form" onSubmit={handleSubmit}>
//         <h2>{initialData ? "Edit Story" : "Add Story"}</h2>

//         <label>Title</label>
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <label>Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <label>Category</label>
//         <input
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />

//         <label>Date</label>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <label>Image</label>
//         <input type="file" accept="image/*" onChange={handleImageChange} />

//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//             style={{
//               width: "100%",
//               borderRadius: "8px",
//               marginTop: "10px",
//             }}
//           />
//         )}

//         <div className="form-buttons">
//           <button type="submit">{initialData ? "Update" : "Submit"}</button>
//           <button type="button" onClick={onCancel}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MarkerForm;


import React, { useState, useEffect } from "react";
import "./MarkerForm.css";

const MarkerForm = ({ onSubmit, onCancel, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setCategory(initialData.category || "");
      setDate(initialData.date || "");
      setImage(initialData.image || null);
      if (initialData.image) {
        setPreview(initialData.image);
      }
    } else {
      setTitle("");
      setDescription("");
      setCategory("");
      setDate("");
      setImage(null);
      setPreview("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      category,
      date,
      image,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="marker-form-overlay">
      <form className="marker-form" onSubmit={handleSubmit}>
        <h2>{initialData ? "Edit Story" : "Add Story"}</h2>

        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="marker-image-preview"
          />
        )}

        <div className="form-buttons">
          <button type="submit">
            {initialData ? "Update" : "Submit"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarkerForm;
