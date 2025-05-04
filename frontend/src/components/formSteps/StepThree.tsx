import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { updateStep, updateProfileInfo } from "../../redux/slice/userAuthSlice";
import { ProfileForm } from "../../interface/userRegistration";
import { useSnackbar } from "../SnackbarProvider";
import { locationData } from "../../constants/locationData";
 
// Sample data for countries, states, and cities

const StepThree: React.FC = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userAuth.profile);
  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<
    Pick<
      ProfileForm,
      "country" | "state" | "city" | "subscriptionPlan" | "newsletter"
    >
  >({
    country: userProfile?.country || "",
    state: userProfile?.state || "",
    city: userProfile?.city || "",
    subscriptionPlan: userProfile?.subscriptionPlan || "",
    newsletter: userProfile?.newsletter || "false",
  });

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const onChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onCountryChange = (country: string) => {
    onChange("country", country);
    setStates(Object.keys(locationData[country]?.states || {}));
    setCities([]);
  };

  const onStateChange = (state: string) => {
    onChange("state", state);
    setCities(locationData[formData.country]?.states[state] || []);
  };

  useEffect(() => {
    dispatch(updateProfileInfo(formData));
  }, [formData, dispatch]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Step 3: Preferences
        </h2>
        <p className="text-sm text-gray-500">
          Complete your address and select your preferences.
        </p>
        <div className="text-sm">{userProfile?.country}, {userProfile?.state},{userProfile?.city}</div>

      </div>
      {/* Address Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <select
            value={formData.country}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Country</option>
            {Object.keys(locationData).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <select
            value={formData.state}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            disabled={!formData.country}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <select
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            disabled={!formData.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subscription Plan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subscription Plan
        </label>
        <select
          value={formData.subscriptionPlan}
          onChange={(e) => onChange("subscriptionPlan", e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Plan</option>
          <option value="Basic">Basic</option>
          <option value="Pro">Pro</option>
          <option value="Enterprise">Enterprise</option>
        </select>
      </div>

      {/* Newsletter */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={formData.newsletter === "true"}
          onChange={(e) => onChange("newsletter", e.target.checked.toString())}
          id="newsletter"
          className="h-5 w-5 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="newsletter" className="text-sm text-gray-700">
          Subscribe to Newsletter
        </label>
      </div>

      {/* Buttons */}
      <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={() => dispatch(updateStep(2))}
          className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm transition duration-200"
        >
          ← Back
        </button>
        <button
          onClick={() => {
             

            if (
              formData.country === "" ||
              formData.state === "" ||
              formData.city === "" ||
              formData.subscriptionPlan === "" ||
              formData.newsletter === ""
            ) {
              showSnackbar("Please fill all the required fields", "error");
            } else {
              dispatch(updateProfileInfo(formData));
              dispatch(updateStep(4));
              showSnackbar("Preferences saved successfully!", "success");
            }
          }}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StepThree;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/rootReducer";
// import { updateStep, updateProfileInfo } from "../../redux/slice/userAuthSlice";
// import { ProfileForm } from "../../interface/userRegistration";
// import { useSnackbar } from "../SnackbarProvider";

// const StepThree = () => {
//   const dispatch = useDispatch();
//   const userProfile = useSelector((state: RootState) => state.userAuth.profile);
//   const { showSnackbar } = useSnackbar();

//   const [formData, setFormData] = useState<
//     Pick<
//       ProfileForm,
//       "country" | "state" | "city" | "subscriptionPlan" | "newsletter"
//     >
//   >({
//     country: userProfile?.country || "",
//     state: userProfile?.state || "",
//     city: userProfile?.city || "",
//     subscriptionPlan: userProfile?.subscriptionPlan || "",
//     newsletter: userProfile?.newsletter || "false", // default to "false" as it's a string
//   });

//   const onChange = (key: keyof typeof formData, value: string) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const onSubmit = () => {
//     dispatch(updateProfileInfo(formData));
//   };

//   useEffect(() => {
//     dispatch(updateProfileInfo(formData));
//   }, [formData, dispatch]);

//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-3xl mx-auto space-y-8">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">
//           Step 3: Preferences
//         </h2>
//         <p className="text-sm text-gray-500">
//           Complete your address and select your preferences.
//         </p>
//       </div>

//       {/* Address Inputs */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Country *
//           </label>
//           <input
//             type="text"
//             value={formData.country}
//             onChange={(e) => onChange("country", e.target.value)}
//             placeholder="India"
//             className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             State *
//           </label>
//           <input
//             type="text"
//             value={formData.state}
//             onChange={(e) => onChange("state", e.target.value)}
//             placeholder="Uttar Pradesh"
//             className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             City *
//           </label>
//           <input
//             type="text"
//             value={formData.city}
//             onChange={(e) => onChange("city", e.target.value)}
//             placeholder="Lucknow"
//             className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       {/* Subscription Plan */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Subscription Plan
//         </label>
//         <select
//           value={formData.subscriptionPlan}
//           onChange={(e) => onChange("subscriptionPlan", e.target.value)}
//           className="w-full border border-gray-300 rounded-md p-3 bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="">Select Plan</option>
//           <option value="Basic">Basic</option>
//           <option value="Pro">Pro</option>
//           <option value="Enterprise">Enterprise</option>
//         </select>
//       </div>

//       {/* Newsletter */}
//       <div className="flex items-center space-x-3">
//         <input
//           type="checkbox"
//           checked={formData.newsletter === "true"}
//           onChange={(e) => onChange("newsletter", e.target.checked.toString())}
//           id="newsletter"
//           className="h-5 w-5 text-blue-600 border-gray-300 rounded"
//         />
//         <label htmlFor="newsletter" className="text-sm text-gray-700">
//           Subscribe to Newsletter
//         </label>
//       </div>

//       {/* Buttons */}
//       <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//         <button
//           onClick={() => dispatch(updateStep(2))}
//           className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm transition duration-200"
//         >
//           ← Back
//         </button>
//         <button
//           // onClick={onSubmit}
//           onClick={() => {
//             onSubmit();
//             dispatch(updateStep(4));
//             showSnackbar("Preferences saved successfully!", "success");
//           }}
//           className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StepThree;
