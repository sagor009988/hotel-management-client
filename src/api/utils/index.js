import axios from "axios";

// image upload
export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGEBB_API_KEY
      }`,
      formData 
    );
    const imageData = data.data.display_url;
    return imageData;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Optionally handle or rethrow the error
  }
};
