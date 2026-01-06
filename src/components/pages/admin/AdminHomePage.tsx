
export default function AdminHomePage() {
  
  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold mb-4 text-orange-300"> Admin Board</h1>
        <div className="bg-white p-6 rounded">
          <p className="text-gray-600">
            This is the admin panel
          </p>
          <ul className="list-disc ml-6 mt-4 text-gray-700">
            <li>Vehicle types</li>
            <li>Makes & models</li>
            <li>Fuel types</li>
            <li>Moderate advertisements</li>
          </ul>
        </div>
      </div>
    </>
  )
}