import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer"; // ✅ Correct import
import { updateStep, updateProfileInfo } from "../../redux/slice/userAuthSlice";
import { useSnackbar } from "../SnackbarProvider";

const StepTwo = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userAuth.profile);
  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    profession: userProfile?.profession || "",
    companyName: userProfile?.companyName || "",
    addressLine1: userProfile?.addressLine1 || "",
  });
  const [otherProfession, setOtherProfession] = useState(
    userProfile?.profession || "Other"
  );

  const onChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Optional: Sync local changes to Redux
  useEffect(() => {
    dispatch(updateProfileInfo(formData));
    if (formData.profession === "Other") {
      dispatch(updateProfileInfo({ profession: otherProfession }));
    }
  }, [formData, dispatch]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Step 2: Professional Details
        </h2>
        <p className="text-sm text-gray-500">
          Tell us about your current professional status.
        </p>
      </div>

      {/* Profession */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profession *
        </label>
        <select
          value={formData.profession}
          onChange={(e) => onChange("profession", e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select your profession</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Other Profession (Conditional) */}
      {formData.profession === "Other" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Please specify your profession *
          </label>
          <input
            type="text"
            value={otherProfession}
            onChange={(e) => {
              setOtherProfession(e.target.value);
            }}
            placeholder="e.g. Consultant, Teacher"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Company Name (Conditional) */}
      {formData.profession === "Entrepreneur" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            placeholder="e.g. Alpha Tech Pvt Ltd"
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Address Line 1 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 1 *
        </label>
        <input
          type="text"
          value={formData.addressLine1}
          onChange={(e) => onChange("addressLine1", e.target.value)}
          placeholder="123 Main Street"
          className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={() => dispatch(updateStep(1))}
          className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm transition duration-200"
        >
          ← Back
        </button>
        <button
          onClick={() => {
            if (
              formData.profession === "Entrepreneur" ||
              formData.companyName === ""
            ){
              showSnackbar("Enter company name", "warning");
            }
            if (
              formData.profession === "" ||
              formData.addressLine1 === ""
            ) {
              showSnackbar("Please fill all the required fields", "error");
            } else {
              dispatch(updateStep(3));
              dispatch(updateProfileInfo(formData));
              if (formData.profession === "Other") {
                dispatch(updateProfileInfo({ profession: otherProfession }));
              }
              showSnackbar(
                "Professional Details saved successfully!",
                "success"
              );
            }
          }}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
