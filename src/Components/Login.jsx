import { useState } from "react";
import axios from "axios";
import { useDispatch, } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../utils/constants'
const Login = () => {
  const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [isLoginform , setIsLoginForm] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error ,setError]= useState("")

  const handleLogin = async() => {
   try{ const res = await axios.post(BASE_URL +"/login", {
      email,
      password
   }, {
     withCredentials: true
   })
     dispatch(addUser(res?.data))
    return  navigate("/feed")
     
   }
   catch (err) {
     setError(err?.response?.data || "something went wrong")
     console.log(err)
    }
  }
  const handleSignUp = async() => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, email, password }, { withCredentials: true })
      
      dispatch(addUser(res?.data?.data))
      return navigate("/feed");
      
    } catch (err) {
      console.log(err?.response?.data)
    }
  }

  const handleform = () => {
    setIsLoginForm(!isLoginform)
  }
  
  return (
    <div className=" flex justify-center items-center my-2">
      <div className="card bg-gray-200 w-96 shadow-xl x">
        <div className="card-body ">
          <h2 className="card-title text-center text-bold">{isLoginform?"Login":"Sign-Up"}</h2>
          <label className="form-control w-full max-w-xs">
            {!isLoginform && 
              <>
                <div className="label">
                  <span className="label-text">FirstName</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter firstname"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <div className="label">
                  <span className="label-text">LastName</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter lastname"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />{" "}
              </>
            }
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              value={email}
              placeholder="enter email"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setemail(e.target.value)}
            />
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              value={password}
              placeholder="enter password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setpassword(e.target.value)}
            />
          </label>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center my-3">
            <button className="btn btn-primary " onClick={isLoginform? handleLogin : handleSignUp}>
              {isLoginform ?"Login" :"Sign-up"}
            </button>
          </div>
          <p className="cursor-pointer text-bold" onClick={handleform}>{isLoginform ? "New to DevTinder ? sign-up" : "Already have an account ?  login"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
