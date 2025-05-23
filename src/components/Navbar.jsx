import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/home" className="text-2xl font-bold text-indigo-600">
                Mini LMS
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/courses"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Cursos
              </Link>
              {user && (
                <Link
                  to="/my-courses"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Mis Cursos
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {user.name || user.email}
                </span>
                <button
                  onClick={logout}
                  className="bg-white text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium border"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-white text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium border"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
