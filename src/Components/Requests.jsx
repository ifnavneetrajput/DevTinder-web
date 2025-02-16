import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requests";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests)
  
     const handlestatus = async (status, _id) => {
       try {
       await axios.post(
           BASE_URL + "/request/review/" + status + "/" + _id,
           {},
           { withCredentials: true },

         );
         
          dispatch(removeRequests(_id));
         
       } catch (err) {
         console.log(err);
       }
     };

    const fetchRequests = async () => {
      try{const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
 
        dispatch(addRequests(res?.data?.data));
      }
      catch (err) {
        console.log(err)
      }
    };

    useEffect(() => {
      fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length === 0) return <h1 className="text-center text-bold text-3xl">No requests found</h1>

 
    

 
    return (
      <div className="text-center justify-center my-10">
        <div className="text-bold text-center text-3xl">Requests</div>
        {requests?.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

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
                <h1 className="text-bold text-3xl">
                  {firstName + " " + lastName}
                </h1>
                {age && <p>{age + " " + gender}</p>}
                <p>{about}</p>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary bg-red-400"
                  onClick={() => handlestatus("accepted", request._id)}
                >
                  accepted
                </button>
                <button
                  className="btn btn-primary bg-pink-800"
                  onClick={() => handlestatus("rejected", request._id)}
                >
                  rejected
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
};

export default Requests;
