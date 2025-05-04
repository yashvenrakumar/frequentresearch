import { useState } from "react";
import { updateUploadImage } from "../redux/slice/userAuthSlice";
import { useDispatch } from "react-redux";
import { UploadImageResponse } from "../interface/reserPassword";
import { useSnackbar } from "../components/SnackbarProvider";

// Custom Hook for uploading an image using fetch
const useUploadImage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<UploadImageResponse | null>(null);
  const { showSnackbar } = useSnackbar();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:5000/api/v1/users/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            // Content-Type is automatically set to multipart/form-data by fetch
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data: UploadImageResponse = await response.json();
      if (data.data) {
        setImageUrl(data); // Assuming the server returns the image URL in 'filePath'
      }
      showSnackbar("Image uploaded successfully!", "success");
      dispatch(updateUploadImage(data)); // Dispatch the action to update the Redux store
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        showSnackbar(err.message, "error");
      setError(err.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error, imageUrl };
};

export default useUploadImage;
