import React, { useEffect, useState } from "react";
import styles from "./AddListItems.module.css";
import Loader from "../../components/Loader/Loader.js";
// import axios from "axios";
import Cookies from "js-cookie";
import EditDeletePost from "../../components/EditDeletePost/EditDeletePost";
import UserProfile from "../../components/userProfile/UserProfile";
export default function AddListItems() {

  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  

  useEffect(() => {
    const userIdFromCookie = Cookies.get("userId");
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
      setIsLoading(false)
    }
  }, []);

  return (
    <>
    {isLoading? (<Loader /> ):(
      <section
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent:'space-around'
        }}
      >
        
        <section className={styles.userProfile} style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",height:'100%' }}>
              <UserProfile />
        </section>
        <section className={styles.FromAdd} style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",height:'100%' }}>
              <EditDeletePost  />
        </section>
        
      </section>
      
      )}
    </>
    
  );
}
