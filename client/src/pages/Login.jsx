import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LogIn() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: ""
  });

  // input field ma change huda state update garna
  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // login form submit huda user authenticate:
  const logInUserSubmission = async (event) => {
    event.preventDefault();

    try {
      // login request after sending email and password in backend
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        loginUser
      );

      // login successful bhaye token ra username localStorage ma save garne
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      toast.success(response.data.message || "Login Successful!");

      // redirect dashboard after login
      navigate("/");
    } catch (error) {
      // after response from backend
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "An error occurred";

        // wrong credential ya user navayeko case handle:
        if (status === 404 || status === 401 || status === 400) {
          toast.error(message);
        } else {
          toast.error("Something went wrong!");
        }

        navigate("/login");
      }
      // server bata response nai aayena bhane
      else if (error.request) {
        toast.error(
          "No response from server. Please try again later."
        );
      }
      // aru kunai error aaye
      else {
        toast.error("Error: " + error.message);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={logInUserSubmission}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-sm flex items-center justify-center gap-2">
              <p className="text-center text-sm text-gray-600 max-w">Don't have an account?</p>
              <Link
                to="/register"
                className="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;