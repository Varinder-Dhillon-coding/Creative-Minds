import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";

export default function Post() {
  const [post, setPost] = useState({ description: "" }); // making an object post where it holds the description
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  const submitpost = async (e) => {
    //function to submit posts
    e.preventDefault();

    if (!post.description) {
      toast.error("Description is empty! 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error("Description too long! 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if(post?.hasOwnProperty("id")){
      const docRef = doc(db, "posts", post.id);
      const updatedData =  {...post,timestamp:serverTimestamp()};
      await updateDoc(docRef,updatedData);
      toast.success(
        "Post updated ✍️",{
        autoClose : 1500,
        position: toast.POSITION.TOP_CENTER,}
      )
      route.push("/dashboard");
     }else {
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      toast.success(
        "Post has been made 🚀",{
        autoClose : 1500,
        position: toast.POSITION.TOP_CENTER,}
      )
      route.push("/");
    }
  };
  const checkUser = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
    if (routeData.id) {
      setPost({ description: routeData.description,id: routeData.id });
    }
  };
  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="Post-content">
      <h2>{routeData.id ? "Update your post" : "Create new post"}</h2>
      <form className="Post-content-div" onSubmit={submitpost}>
        <p>Description</p>
        <textarea
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
          name="post-content"
          id="post"
          cols="50"
          rows="10"
        ></textarea>
        <p className={post.description.length > 300 ? "red-color" : ""}>
          {post.description.length}/300
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
