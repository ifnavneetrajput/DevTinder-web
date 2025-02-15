import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import PropTypes from "prop-types";
import UserCard from './UserCard'

const EditProfile = ({ user }) => {

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [toast , setToast] = useState(false)
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const editProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true)
       setTimeout(() => {
         setToast(false);
       }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  EditProfile.propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      age: PropTypes.number,
      gender: PropTypes.string,
      photoUrl: PropTypes.string.isRequired,
      about: PropTypes.string,
    }).isRequired,
  };

 

  return (
    <div className="flex justify-center min-h-screen">
      {toast && (
        <div className="toast toast-top toast-end my-8">
          <div className="alert alert-success">
            <span>profile saved successfully.</span>
          </div>
        </div>
      )}
      <div className=" flex justify-center items-center my-2">
        <div className="card bg-gray-200 w-96 shadow-xl x">
          <div className="card-body ">
            <h2 className="card-title">Profile</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">FirstName</span>
              </div>
              <input
                type="text"
                value={firstName}
                placeholder="enter firstname"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="label">
                <span className="label-text">LastName</span>
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="enter lastName"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />

              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                value={age}
                placeholder="enter age"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                value={gender}
                placeholder="enter Gender"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setGender(e.target.value)}
              />
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="text"
                value={about}
                placeholder="enter about"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAbout(e.target.value)}
              />
              <div className="label">
                <span className="label-text">photoUrl</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                placeholder="enter photoUrl"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <p className="text-red-600">{error}</p>
            <div className="card-actions justify-center my-3">
              <button className="btn btn-primary" onClick={editProfile}>
                save profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  );
};

export default EditProfile;
