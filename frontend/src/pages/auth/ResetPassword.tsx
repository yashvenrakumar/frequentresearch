import { useState } from "react";
import { useSnackbar } from "../../components/SnackbarProvider";
import { useResetPassword } from "../../hooks/useResetPassword";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const getPasswordStrength = (
  password: string
): "Weak" | "Moderate" | "Strong" => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;

  if (strength <= 2) return "Weak";
  if (strength === 3) return "Moderate";
  return "Strong";
};

const ResetPassword = () => {
  const { showSnackbar } = useSnackbar();

  const { resetPassword } = useResetPassword();
  // const [form, setForm] = useState({
  // username: "",
  // currentPassword: "",
  // newPassword: "",
  // });
  const userProfile = useSelector((state: RootState) => state.userAuth.profile);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState<
    "Weak" | "Moderate" | "Strong"
  >("Weak");

  const validate = (): boolean => {
    let valid = true;
    const tempErrors = { currentPassword: "", newPassword: "" };

    if (!formData.currentPassword) {
      tempErrors.currentPassword = "Current password is required";
      valid = false;
    }

    if (!formData.newPassword) {
      tempErrors.newPassword = "New password is required";
      valid = false;
    } else {
      const strength = getPasswordStrength(formData.newPassword);
      setPasswordStrength(strength);

      if (formData.newPassword.length < 6) {
        tempErrors.newPassword = "Password must be at least 6 characters";
        valid = false;
      } else if (!/[A-Z]/.test(formData.newPassword)) {
        tempErrors.newPassword = "Must include an uppercase letter";
        valid = false;
      } else if (!/[0-9]/.test(formData.newPassword)) {
        tempErrors.newPassword = "Must include a number";
        valid = false;
      } else if (!/[!@#$%^&*]/.test(formData.newPassword)) {
        tempErrors.newPassword = "Must include a special character";
        valid = false;
      }
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      resetPassword({
        username: userProfile?.username ?? "",
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      showSnackbar("Password reset successful!", "success");
      setFormData({ currentPassword: "", newPassword: "" });
      setErrors({ currentPassword: "", newPassword: "" });
      setPasswordStrength("Weak");
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
          {["currentPassword", "newPassword"].map((field, idx) => (
            <div key={idx}>
              <label className="block text-gray-700 font-medium mb-2">
                {field === "currentPassword"
                  ? "Current Password"
                  : "New Password"}
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
                  field === "currentPassword" ? "current" : "new"
                } password`}
              />
              {field === "newPassword" && (
                <p
                  className={`mt-1 text-sm font-medium ${
                    passwordStrength === "Strong"
                      ? "text-green-600"
                      : passwordStrength === "Moderate"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Strength: {passwordStrength}
                </p>
              )}
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
