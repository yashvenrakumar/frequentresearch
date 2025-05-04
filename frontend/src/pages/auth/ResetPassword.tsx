import { useState } from "react";
// import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../components/SnackbarProvider";

const ResetPassword = () => {
  const { showSnackbar } = useSnackbar();
//   const { resetPassword } = useAuth(); // Assuming there's a resetPassword function

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validate = (): boolean => {
    let valid = true;
    const tempErrors = { password: "", confirmPassword: "" };

    if (!formData.password) {
      tempErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      tempErrors.password = "Must include an uppercase letter";
      valid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      tempErrors.password = "Must include a number";
      valid = false;
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      tempErrors.password = "Must include a special character";
      valid = false;
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      showSnackbar("Password reset successful!", "success");
    //   await resetPassword({ password: ""});
      setFormData({ password: "", confirmPassword: "" });
      setErrors({ password: "", confirmPassword: "" });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full"
      style={{ backgroundImage: `url(https://picsum.photos/2000/1600)` }}
    >
      <div className="bg-white/90 p-8 sm:p-10 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {["password", "confirmPassword"].map((field, idx) => (
            <div key={idx}>
              <label className="block text-gray-700 font-medium mb-2 capitalize">
                {field === "confirmPassword" ? "Confirm Password" : "Password"}
              </label>
              <input
                type="password"
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[field as keyof typeof errors]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } transition duration-200`}
                placeholder={`Enter your ${
                  field === "confirmPassword" ? "Confirm Password" : "Password"
                }`}
              />
              {errors[field as keyof typeof errors] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof typeof errors]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-black font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
