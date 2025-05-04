// components/Login.tsx
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../components/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/common/ActionButton";
 
const Login = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { login, loginResponse } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let valid = true;
    const tempErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      tempErrors.email = "Invalid email address";
      valid = false;
    }

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

    setErrors(tempErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await login(formData);
    }
  };

  useEffect(() => {
    if (loginResponse?.success) {
      showSnackbar("Login successfully", "success");
      navigate("/");
    }
  }, [loginResponse, navigate, showSnackbar]);

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full"
      style={{ backgroundImage: `url(https://picsum.photos/2000/1600)` }}
    >
      <div className="bg-white/90 p-8 sm:p-10 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Login Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {["email", "password"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-2 capitalize">
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[field as keyof typeof errors]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } transition duration-200`}
                placeholder={`Enter your ${field}`}
              />
              {errors[field as keyof typeof errors] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof typeof errors]}
                </p>
              )}
            </div>
          ))}

          <ActionButton type="submit" text="Login" />
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?
            <ActionButton
              text="Register"
              onClick={() => navigate("/register")}
              className="ml-2 bg-transparent text-blue-600 hover:underline w-auto py-0"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
