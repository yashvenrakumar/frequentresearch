 import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { updateStep } from "../../redux/slice/userAuthSlice";
import { ProfileForm } from "../../interface/userRegistration";
import { useRegisterUser } from "../../hooks/useRegisterUser";

const StepFour = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.userAuth.profile) as Partial<ProfileForm>;
  const profileDemo = useSelector((state: RootState) => state.userAuth.profile);

const {register}=useRegisterUser()
  const handleSubmit = () => {
     register(profileDemo as ProfileForm)
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 4: Summary</h2>
        <p className="text-sm text-gray-500">Review all the information you've provided before submission.</p>
      </div>

      <div className="space-y-4">
        {/* You can break this into sections if needed */}
        {Object.entries(profile).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b pb-2">
            <span className="capitalize font-medium text-gray-600">{key.replace(/([A-Z])/g, " $1")}</span>
            <span className="text-gray-800">{value ? value.toString() : "—"}</span>
          </div>
        ))}
      </div>

      <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={() => dispatch(updateStep(3))}
          className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm transition duration-200"
        >
          ← Back to Preferences
        </button>
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
        >
          Submit Profile →
        </button>
      </div>
    </div>
  );
};

export default StepFour;
