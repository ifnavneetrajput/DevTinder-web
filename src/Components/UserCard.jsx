
const UserCard = ({user}) => {
  const { firstName, lastName, age, gender, photoUrl ,about } = user;
  console.log(firstName)
  return (
    <div className="card bg-base-100 w-80 h-96  shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName +" " + lastName}</h2>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">ignored</button>
          <button className="btn btn-primary">interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard