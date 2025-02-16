import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  if(!user) return
  const { _id,firstName, lastName, age, gender, photoUrl, about } = user;
  const handleSendRequest = async (status,_id) => {
    try {
     await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(_id))
      

      
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="card bg-base-100 w-80   shadow-xl">
      <figure>
        <img className="" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && <h3>{age + "," + gender}</h3>}

        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary bg-red-400"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            ignored
          </button>
          <button
            className="btn btn-primary bg-pink-800"
            onClick={() => handleSendRequest("interested", _id)}
          >
            {" "}
            interested
          </button>
        </div>
      </div>
    </div>
  );
}
UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    age: PropTypes.number,
    gender: PropTypes.string,
    photoUrl: PropTypes.string.isRequired,
    about: PropTypes.string,
  }).isRequired,
};

export default UserCard