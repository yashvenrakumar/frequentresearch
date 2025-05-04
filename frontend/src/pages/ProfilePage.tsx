import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const ProfilePage = () => {
  // Select the user profile directly from the state
  const user = useSelector(
    (state: RootState) => state.userAuth?.register?.data.user
  ); // Corrected the type

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 space-y-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <img
            src={user?.profilePhoto || "https://via.placeholder.com/150"}
            alt="Profile Photo"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              {user?.username}
            </h1>
            <p className="text-xl text-gray-600">{user?.profession}</p>
            <p className="text-lg text-gray-500">{user?.companyName}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Address</p>
              <p className="text-gray-800">{user?.addressLine1}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Location</p>
              <p className="text-gray-800">
                {user?.city}, {user?.state}, {user?.country}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Subscription Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Subscription Plan
              </p>
              <p className="text-gray-800">{user?.subscriptionPlan}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Newsletter Subscription
              </p>
              <p className="text-gray-800">
                {user?.newsletter ? "Subscribed" : "Not Subscribed"}
              </p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Account Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600">User ID</p>
              <p className="text-gray-800">{user?._id}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
            onClick={() => alert("Edit profile functionality")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
