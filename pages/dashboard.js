import { async } from "@firebase/util";
import {
  where,
  doc,
  collection,
  query,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import Thought from "../components/thoughts";
import { AiOutlineDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [allPosts, setAllposts] = useState([]);

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllposts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      return unsubscribe;
    });
  };

  const deleteData = async (id) => {
    console.log(id);
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      <div className="user-info">
        <img src={user?.photoURL} />
        <p>Name : {user?.displayName}</p>
        <p>Email : {user?.email}</p>
        <h2>{allPosts.length==0? "No posts" : [allPosts.length," Post"]} </h2>
      </div>
      <div className="dashboard-main-head">
        <h2>Your Posts</h2>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
      {allPosts?.map((posts) => (
        <Thought {...posts} key={posts.id}>
          <div className="actions">
            <button className="button-1" onClick={() => deleteData(posts.id)}>
              <AiOutlineDelete size={20}></AiOutlineDelete>Delete
            </button>
            <Link className="edit" href={{ pathname: "/post", query: posts }}>
              <button className="button-2">
                <RiEdit2Fill size={20}></RiEdit2Fill> Edit
              </button>
            </Link>
          </div>
        </Thought>
      ))}
    </div>
  );
}
