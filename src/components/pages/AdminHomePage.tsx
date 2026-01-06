import {useAuth} from "../auth/useAuth.ts";

export default function AdminHomePage() {
  const {user} = useAuth();
  
  return (
    <>
      <div className="mt-50">
        <h1 className="text-2xl font-bold mb-4"> Admin Board</h1>
        <div className="bg-white p-6 rounded">
          <p className="mb-2">
            Hello {user?.username}
          </p>
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