import React from "react";
import { supabase } from "../supabaseClient";

const UploadNotes = () => {
  // Define the uploadFile function
  const uploadFile = async (file) => {
    const bucketName = "notes-files"; // Name of your bucket
    const filePath = `notes/${file.name}`; // Path inside the bucket

    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      return;
    }

    console.log("File uploaded successfully:", data);
    // You can handle the response (e.g., generate a public URL or notify the user)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileInput = document.querySelector("#fileInput");
    const file = fileInput.files[0];

    if (file) {
      await uploadFile(file); // Call the function defined above
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" id="fileInput" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadNotes;
