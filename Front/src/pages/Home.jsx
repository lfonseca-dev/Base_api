import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

function Home() {
    const location = useLocation();
    localStorage.setItem('lastaccess', location.pathname)

    const username = localStorage.getItem('loggedUsername');

    return (
        <div className="min-h-screen bg-linear-to-r from-whitw-900 to-white-800">
            <NavBar />
            <div className="px-8 py-6">
                <h1 className="text-3xl font-bold text-black">
                    {username}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mt-6">

                <div className="bg-red-400 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-black text-sm">Users</h2>
                    <p className="text-2xl font-bold text-white">12</p>
                </div>

                <div className="bg-red-400 p-6 rounded-2xl shadow-xl ">
                    <h2 className="text-black text-sm">Task</h2>
                    <p className="text-2xl font-bold text-green-700">8</p>
                </div>

                <div className="bg-red-400 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-black text-sm">Banidos</h2>
                    <p className="text-2xl font-bold text-blue-900">4</p>
                </div>

            </div>

            <div className="px-8 mt-10 space-y-4 flex flex-col justify-center items-center gap-6">

                <h1 className="text-black text-2xl font-bold">DASHBOARD</h1>

                
            </div>
        </div>
    );
}

export default Home;