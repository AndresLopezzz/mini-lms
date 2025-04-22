import { useUser } from "../context/UserContext";

const Header = () => {
  const { user, logout } = useUser();
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-3xl shadow-lg mb-8 flex flex-col md:flex-row md:items-center md:justify-between text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Mini LMS</h1>
        <span className="block text-lg font-medium">
          Bienvenido{user && user.name ? `, ${user.name}` : ""}!
        </span>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-4">
        <span className="inline-block bg-white/20 px-4 py-2 rounded-xl text-base font-semibold">
          {user && user.role === "teacher" ? "Profesor" : "Estudiante"}
        </span>
        {user && (
          <>
            <img
              src={
                user.photoUrl ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user.name || "U") +
                  "&background=random"
              }
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full border-2 border-white shadow"
            />
            <button
              onClick={logout}
              className="ml-2 px-4 py-2 bg-white/30 hover:bg-white/50 text-white font-semibold rounded-xl transition"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
