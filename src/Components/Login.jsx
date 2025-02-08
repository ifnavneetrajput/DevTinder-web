import { useState } from "react";
import axios from "axios";
const Login = () => {

  const [email, setemail] = useState("virat@gmail.com")
  const [password, setpassword] = useState("Virat@123")

  const handleSubmit = async() => {
   try{ const res = await axios.post("http://localhost:7777/login", {
      email,
      password
   }, {
     withCredentials: true
   })
     console.log(res)
   }
   catch (err) {
     console.log("error is " , err)
    }
  }
  
  return (
    <div className=" flex justify-center items-center my-2">
      <div className="card bg-gray-200 w-96 shadow-xl x">
        <div className="card-body ">
          <h2 className="card-title">Card title!</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">email</span>
            </div>
            <input
              type="text"
              value={email}
              placeholder="enter email"
              className="input input-bordered w-full max-w-xs"
              onChange={ (e)=>setemail(e.target.value)}
            />
            <div className="label">
              <span className="label-text">password</span>
            </div>
            <input
              type="text"
              value={password}
              placeholder="enter password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=>setpassword(e.target.value)}
            />
          </label>

          <div className="card-actions justify-center my-3">
            <button className="btn btn-primary " onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
