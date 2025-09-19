import LoginServiceMutation from "@/services/Authentication/LoginServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, message } from "antd";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [inputClicked, setInputClicked] = useState({
    userName: false,
    password: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    const loginData = {
      phone: userName,
      password: password
    };
    console.log("Login Data:", loginData);
    handleMutationLogin.mutate({ phone: loginData.phone, password: loginData.password })
  };

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const handleMutationLogin = useMutation({
    mutationFn: LoginServiceMutation,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['login'] })
      if (data?.data.newUser?.role !== "Admin") {
        message.error("You can’t access this page")
        navigate('/login', { replace: true });
      }else{
        if (data?.success) {
        localStorage.setItem('token', data?.data?.token);
        localStorage.setItem('userdetails', JSON.stringify(data?.data?.newUser));
        localStorage.setItem("token_expiry", String(Date.now() + 24 * 60 * 60 * 1000));
        navigate('/', { replace: true });
        // message.success("You Have Login Successfully")
      }
      }
      
    },

    onError: (error) => {
      console.log(error)
    },
  })


  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[550px] bg-white rounded-2xl flex justify-center items-center border-2 border-[#acb3b9] overflow-hidden">
        <div className="w-full lg:w-[50%] h-full flex flex-col items-center justify-center gap-[20px] ">
          <div className="flex items-center text-[22px] mt-[40px] mb-[20px] font-semibold gap-[10px]">
            <span className="text-gray-600">Login to </span>
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">Smart Soceity</span>
          </div>

          {/* userName */}
          <div
            className="relative flex justify-start items-center w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, userName: true })}
          >

            <input
              type="text"
              id="userName"
              className="w-[100%] h-[100%] px-[20px] rounded-2xl outline-none"
              required
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Phone Number"
              value={userName}
            />
          </div>

          {/* password */}
          <div
            className="relative flex justify-start items-center w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-[100%] h-[100%] px-[20px] rounded-2xl outline-none"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              value={password}
            />
            {!showPassword ? (
              <IoEyeOutline
                className="absolute w-[25px] h-[25px] right-[20px] cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <IoEyeOffSharp
                className="absolute w-[25px] h-[25px] right-[20px] cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>

          {/* <div
            className="w-[90%] px-[20px] cursor-pointer text-gray-600 hover:text-black"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password
          </div> */}

          {/* Login Button */}
          <Button
            className="!w-[70%] !bg-gray-900 hover:!bg-black !text-white !rounded-2xl !h-[50px] !font-semibold !text-[18px] !cursor-pointer !mt-[15px]"
            onClick={handleLogin}
            loading={handleMutationLogin.isPending}
          >
            Login
          </Button>

          {/* <p className="cursor-pointer text-gray-700">
            Don’t have an account ?{" "}
            <span
              className="border-b-2 pb-[3px] hover:text-gray-950"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p> */}
        </div>

        {/* Right section */}
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center flex-col bg-[#000000] shadow-2xl shadow-black rounded-l-[30px] gap-[10px]">
          <h1 className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-[40px] font-bold">
            Smart Soceity
          </h1>
          <p className="text-[16px] text-white font-semibold">
            Not just a platform , your digital lifestyle
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
