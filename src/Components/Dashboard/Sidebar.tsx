import Link from "next/link"


 const Sidebar = () => {
  return (
    <div>
<ul className="menu bg-base-300 rounded-box w-full space-y-2">
  <li className="border border-gray-200 bg-white">
    <Link href={'/Dashboard/Posts'}>Posts</Link>
    </li>
  <li className="border border-gray-200 bg-white">
    <Link href={'/Dashboard/Posts'}>Comments</Link>
    </li>
  <li className="border border-gray-200 bg-white">
    <Link href={'/Dashboard/Posts'}>Analytics</Link>
    </li>


</ul>
    </div>
  )
}
export default Sidebar