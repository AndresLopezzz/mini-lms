import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "../data/userStorage";
import { useUser } from "../context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student"); // Por defecto, estudiante
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const users = await getUsers();
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        setError("Este correo electrónico ya está registrado");
        return;
      }
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      await saveUsers(users);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      login(newUser);
      navigate("/home");
    } catch (err) {
      setError("Error al registrar usuario");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-md w-full p-8 space-y-6 bg-white/60 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Crear cuenta
          </h2>
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Inicia sesión
            </a>
          </p>
        </div>

        {error && (
          <div
            className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg"
            role="alert"
          >
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-inner hover:shadow-inner"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-inner hover:shadow-inner"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-inner hover:shadow-inner"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-inner hover:shadow-inner"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de usuario
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="student-role"
                    name="role"
                    type="radio"
                    value="student"
                    checked={role === "student"}
                    onChange={() => setRole("student")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="student-role"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Estudiante
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="teacher-role"
                    name="role"
                    type="radio"
                    value="teacher"
                    checked={role === "teacher"}
                    onChange={() => setRole("teacher")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="teacher-role"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Profesor
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
