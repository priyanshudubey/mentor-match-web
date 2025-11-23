import React, { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}feed`, {
        withCredentials: true,
      });
      console.log("Printing response: ", res.data);
      dispatch(addFeed(res?.data?.user));
    } catch (err) {
      return err.message;
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center my-4">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
