import Link from "next/link"


 const Sidebar = () => {
  return (
    <div>
<ul className="menu bg-base-200 rounded-box w-full">
  <li><Link href={'/Dashboard/Posts'}>Posts</Link></li>
  <li><Link href={'/Dashboard/Posts'}>Posts</Link></li>
  <li><Link href={'/Dashboard/Posts'}>Posts</Link></li>
  <li><Link href={'/Dashboard/Posts'}>Posts</Link></li>

</ul>
    </div>
  )
}
export default Sidebar