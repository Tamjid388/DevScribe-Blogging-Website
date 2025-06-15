import { AllPosts } from "@/Components/AllPosts/AllPosts";
import useCurrentUser from "./hooks/useCurrentUser";


export default function Home() {
  
  return (
    <div className="">
     
      <AllPosts />
    </div>
  );
}
