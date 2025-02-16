import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connections";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store)=>store.connections)
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="text-center justify-center my-10">
      <div className="text-bold text-center text-3xl">Connections</div>
      {connections?.map((connection) => {
        const { _id,firstName, lastName, photoUrl, age, gender, about } = connection
        
        return (
          <div
            key={_id}
            className="flex m-5 mx-auto p-4 border rounded-lg bg-base-300 w-1/2 "
          >
            <div>
              {" "}
              <img alt="photo" className="w-20 h-20 " src={photoUrl} />
            </div>
            <div className="text-left mx-4">
              <h1 className="text-bold text-3xl">{firstName + " " + lastName}</h1>
              {age && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
         
        
      })}

    </div>
  );
};

export default Connections;
