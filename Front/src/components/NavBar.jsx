import { Link } from "react-router-dom";

function NavBar() {

    return (
        <nav className="w-full bg-linear-to-r from-white via-zinc-50 to-red-500 shadow-xl px-8 py-4 flex items-center justify-between">

            <Link to="/home">
                <img
                src="https://faulim.com.br/pt/wp-content/uploads/2025/01/logo-site-colorido.png"
                    alt="Faulim Logo"
                    className="h-12 object-contain hover:scale-105 transition duration-300"
                />
            </Link>

            <div className="flex gap-16">

                <Link to="/home"
                    className="
                    text-black font-medium relative transition duration-300
                    hover:text-white
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-0.5 after:bg-red-700
                    after:transition-all after:duration-300
                    hover:after:w-full
                ">
                    Home
                </Link>

                <Link to="/perfil"
                    className="
                    text-black font-medium relative transition duration-300
                    hover:text-white
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-0.5 after:bg-red-700
                    after:transition-all after:duration-300
                    hover:after:w-full
                ">
                    Perfil
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;