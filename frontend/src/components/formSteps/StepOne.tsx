import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordStrength from "../PasswordStrength";
import useCheckUsername from "../../hooks/useCheckUsername";
import { RootState } from "../../redux/rootReducer";
import { updateProfileInfo, updateStep } from "../../redux/slice/userAuthSlice";
import { validatePassword } from "../../utils/validation";
import { useSnackbar } from "../SnackbarProvider";
import useUploadImage from "../../hooks/useUploadImage";

const StepOne: React.FC = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const { uploadImage } = useUploadImage();
 
  const userProfile = useSelector((state: RootState) => state.userAuth.profile);
  const imageUpload = useSelector((state: RootState) => state.userAuth.uploadImage);

  const [username, setUsername] = useState<string>(userProfile?.username || "");
  const [password, setPassword] = useState<string>(userProfile?.currentPassword || "");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { checkUsername, isLoading, error, response } = useCheckUsername();
  const [usernameStatus, setUsernameStatus] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setUsernameStatus(null);
      return;
    }

    const handler = setTimeout(() => {
      checkUsername(username);
    }, 500);

    return () => clearTimeout(handler);
  }, [username]);

  useEffect(() => {
    if (response) {
      setUsernameStatus(response.data.available ? "Available" : "Username already taken");
    }
  }, [response]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024 && ["image/jpeg", "image/png"].includes(file.type)) {
      setImagePreview(URL.createObjectURL(file));
       uploadImage(file);
    } else {
      showSnackbar("Invalid file. Must be JPG/PNG and under 2MB.", "error");
    }
  };

  const handleSubmit = () => {
    if (usernameStatus === "Available" && password.length >= 6) {
      dispatch(updateProfileInfo({
        username,
        currentPassword: password,
        newPassword: password,
        profilePhoto: imageUpload?.data || "https://demo.com/png",
      }));
      dispatch(updateStep(2));
      showSnackbar("Personal Info saved successfully!", "success");
    } else {
      showSnackbar("Please select an available username and valid password.", "error");
    }
  };

  useEffect(() => {
    setPasswordStrength(validatePassword(password));
  }, [password]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-3xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 1: Personal Information</h2>
      <p className="text-sm text-gray-500 mb-4">
        Please provide your basic personal information to proceed.
      </p>

      {/* Profile Photo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo * {imageUpload?.data }</label>
        <div className="flex items-center gap-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="h-20 w-20 rounded-full object-cover border border-gray-300 shadow"
            />
          ) : (
            <div className="h-20 w-20 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
             { imageUpload?.data? <img
              src={  imageUpload?.data || "https://demo.com/png"}
              alt="Profile Preview"
              className="h-20 w-20 rounded-full object-cover border border-gray-300 shadow"
            />:<div>No Image</div>}
             
           
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="your_unique_username"
        />
        {isLoading ? (
          <p className="mt-1 text-sm text-gray-500">Checking username...</p>
        ) : usernameStatus ? (
          <p
            className={`mt-1 text-sm ${
              usernameStatus === "Available" ? "text-green-600" : "text-red-600"
            }`}
          >
            {usernameStatus}
          </p>
        ) : null}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              const val = e.target.value;
              setPassword(val);
              setPasswordStrength(validatePassword(val));
            }}
            className="w-full border border-gray-300 rounded-md p-2 pr-10 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <PasswordStrength level={passwordStrength} />
          <span
            className={`font-medium ${
              passwordStrength < 2
                ? "text-red-500"
                : passwordStrength < 4
                ? "text-yellow-500"
                : "text-green-600"
            }`}
          >
            {passwordStrength < 2 ? "Weak" : passwordStrength < 4 ? "Average" : "Strong"}
          </span>
        </div>
      </div>

      {/* Next Button */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StepOne;
