import React, { useState, useContext } from "react";
import Logo from "@/public/images/stylersDark.png";
import { Dialog } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import {auth, googleProvider} from "@/utils/firebaseAuth"
import { DataContext } from "@/context/datacontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//------for login and sign up ---------
const acInitialValue = {
    login :{
        view : 'login',
    },
    signup :{
        view : 'signup',
    },
}

// -------for Collection Signup Value-----------
const signupInititalValue = {
    fullName : '',
    username : '',
    email : '',
    password : '',
    mobile : '',

};
const loginInititalValue = {
    username : '',
    password : '',
};




const login = ({ open, setOpen }) => {
  const [ac, ToggleAc] = useState(acInitialValue.login);
  const [signup, setSignup] = useState(signupInititalValue);
  const [login, setLogin] = useState(loginInititalValue);

  const {account, setAccount} = useContext(DataContext);

  //-----------Closing Dialog-----------
  const handleClose = () => {
    setOpen(false);
    ToggleAc(acInitialValue.login)
  };

  

  
  // ------------Handling google sign in ----------------
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const user = auth.currentUser;
      setOpen(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  

  //----------Toggle function for login and signup--
  const toggleSignUp = () => {
    ToggleAc(acInitialValue.signup)
  }

  // ---------Hanlding onInputChange-------------------
  const oninputChange = (e) => {
    setSignup({...signup,[e.target.name]: e.target.value});
  }

  // ----------Handling Signup--------------------
  const handleSignup = async() => {
    const res = await axios.post("/api/user/auth", {signup: signup})
    if(!res){
        return;
    }
    handleClose();
    setAccount(signup.fullName);
};

    // ---------------Hanlding onValueChange----------------
    const onValueChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    };

  //-----------Handeling Login--------------------
  const loginHanlder = async() => {
    const res = await axios.get(`/api/user/auth?login=${login.username}&&password=${login.password}`)
    if(res.status===200){
        handleClose();
        setAccount(res.data[0].fullName.split(' ')[0]);
    }
    else{
        toast('Error in login')
    }
  };



  return (
    <>
      <Dialog open={open} onClose={handleClose} className="rounded-lg">
        <div className="w-full flex flex-col gap-6 bg-gradient-to-b from-slate-100 to-slate-950 text-white">
          <div className="w-full flex justify-center items-center p-2 mt-4 h-12">
            <Image src={Logo} alt="stylers" className="w-40" />
          </div>

          
            {ac.view==='login' ? 
            <>
            <div className="w-96 flex justify-center items-center flex-col gap-4 text-black">
              <input
              
                onChange={(e) => onValueChange(e)}
                name="username"
                required
                type="email"
                placeholder="Enter Email/Mobile Number"
                className="w-56 p-2 rounded-lg"
              />
              <input
              
                onChange={(e) => onValueChange(e)}
                name="password"
                required
                type="password"
                placeholder="Enter Password"
                className="w-56 p-2 rounded-lg"
              />
            </div>
            <div className="flex justify-center">
              <button onClick={()=>loginHanlder()} className="bg-blue-500 text-lg shadow-lg rounded-lg text-white font-semibold p-1 px-2">
                Login
              </button>
            </div>
            <div className="flex justify-center font-serif">
              <button onClick = {signInWithGoogle} className="text-lg flex shadow-lg shadow-white items-center px-4 rounded-md">Sign In With 
                <img
                  src="https://cdn-icons-png.flaticon.com/256/5968/5968863.png"
                  className="W-16 h-16 ml-2"  
                />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>----------- OR -----------</p>
              <button className="mt-2 bg-blue-100 text-black p-1 px-2 w-44 font-semibold rounded-lg text-lg">
                Request OTP
              </button>
            </div>
            <div className="flex justify-center items-center mb-4">
              <button className="hover:text-blue-300" onClick={()=>toggleSignUp()}>
                New on Stylers ?
              </button>
            </div>
            
            </>
            :
            <>
                <div className="w-96 flex justify-center items-center flex-col gap-4 text-black">
              <input
                
                onChange={(e) => oninputChange(e)}
                required
                type="name"
                name="fullName"
                placeholder="Enter Full Name"
                className="w-56 p-2 rounded-lg"
              />
              
              <input
                
                onChange={(e) => oninputChange(e)}
                required
                type="name"
                name="username"
                placeholder="Enter username"
                className="w-56 p-2 rounded-lg"
              />
              <input
                
                onChange={(e) => oninputChange(e)}
                required
                type="email"
                name="email"
                placeholder="Enter Email Id"
                className="w-56 p-2 rounded-lg"
              />
              <input
                
                onChange={(e) => oninputChange(e)}
                required
                type="email"
                name="password"
                placeholder="Enter Password"
                className="w-56 p-2 rounded-lg"
              />
              <input
                
                onChange={(e) => oninputChange(e)}
                required
                type="number"
                name="mobile"
                placeholder="Enter Mobile Number"
                className="w-56 p-2 rounded-lg"
              />
              
            </div>
            <div className="flex justify-center">
              <button onClick={()=>handleSignup()} className="bg-blue-500 text-lg shadow-lg rounded-lg text-white font-semibold p-1 px-2">
                Continue
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>----------- OR -----------</p>
              <button className="mt-2 bg-blue-100 text-black p-1 px-2 mb-6 font-semibold rounded-lg text-lg">
                Existing User? Login
              </button>  
            </div>

            </>
            
            }
          </div>
          
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default login;
