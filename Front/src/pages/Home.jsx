import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import logo from "../assets/logo.png";

function Home() {
    const location = useLocation();
    localStorage.setItem("lastaccess", location.pathname);

    const username = localStorage.getItem("loggedUsername");

    return (
        <div
            className="min-h-screen bg-center bg-no-repeat bg-[length:500px]"
            style={{ backgroundImage: `url(${logo})` }}
        >
            <div className="min-h-screen">
                <NavBar />

                <div className="px-8 py-6">
                    <h1 className="text-3xl font-bold text-white">
                        {username}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Home;