import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "../../components/SnackbarProvider";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, user, loading, error } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
  });

  const validate = (): boolean => {
    let valid = true;
    const tempErrors: Errors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      valid = false;
    }

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
      await register(formData);

        // ✅ Clear form after successful registration
        setFormData({ name: "", email: "", password: "" });
        setErrors({ name: "", email: "", password: "" });
    }
  };

  useEffect(()=>{
    if(error){
      showSnackbar(error??"failed   " , "error");
    }
   

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  useEffect(() => {
    if (user) {
      showSnackbar("Registration successful", "success");

       navigate("/login");
    }
  }, [user, navigate, showSnackbar]); // ✅ Correct dependencies

  return (  
    <div
      className="min-h-screen flex items-center justify-center w-full"
      style={{ backgroundImage: `url(https://picsum.photos/2000/1600)` }}
    >
      <div className="bg-white/90 p-8 sm:p-10 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {["name", "email", "password"].map((field, idx) => (
            <div key={idx}>
              <label className="block text-gray-700 font-medium mb-2 capitalize">
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[field as keyof Errors]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } transition duration-200`}
                placeholder={`Enter your ${field}`}
              />
              {errors[field as keyof Errors] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof Errors]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-black font-bold rounded-lg transition duration-300`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* ✅ "Already have an account?" Section */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?  
              <button
                onClick={() => navigate("/login")}
                className="ml-2 text-blue-600 font-bold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
