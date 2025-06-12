import Maincontent from "@/Components/createpost/maincontent/Maincontent"


 const CreateNewPost = () => {
  return (
<div className="pb-12 h-screen">
      <div className="grid grid-cols-12   mt-2 py-4">


  {/* Main Content */}
  <div className="col-span-10 bg-white   p-4">
<Maincontent/>
  </div>

  {/* Right Sidebar */}
  <div className="col-span-2  p-4">
   <p className="text-2xl font-bold"> Right Sidebar</p>
  </div>
</div>
<div>
    {/* <button className="btn btn-primary">Publish </button> */}
    {/* <button className="btn btn-outline btn-primary">Save Draft</button> */}
</div>
</div>
  )
}
export default CreateNewPost