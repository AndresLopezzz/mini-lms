import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { courses } from "../data/courses";

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser && !user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bienvenido a Mini LMS
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explora nuestra selección de cursos y comienza tu viaje de
              aprendizaje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Mini LMS. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
