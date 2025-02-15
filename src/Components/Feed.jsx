import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store => store.feed))

  const getFeed = async () => {
    if(feed) return
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
    
    dispatch(addFeed(res?.data))
  }

  useEffect(() => {
    getFeed()
  },[])
  return (
    feed && (
      <>
        <div className="flex justify-center items-center">
          <UserCard user={feed[0]} />
        </div>
      </>
    )
  );
}

export default Feed