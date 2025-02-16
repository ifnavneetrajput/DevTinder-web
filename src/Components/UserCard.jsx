import PropTypes from "prop-types";
const UserCard = ({ user }) => {
  if(!user) return
  const { firstName, lastName, age, gender, photoUrl, about } = user;


  return (
    <div className="card bg-base-100 w-80   shadow-xl">
      <figure>
        <img
          className=""
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age &&<h3>{ age +","+ gender}</h3>}
        
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary bg-red-400">ignored</button>
          <button className="btn btn-primary bg-pink-800">interested</button>
        </div>
      </div>
    </div>
  );
}
UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired, 
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number, 
    gender: PropTypes.string, 
    photoUrl: PropTypes.string.isRequired, 
    about: PropTypes.string, 
  }).isRequired,
};

export default UserCard