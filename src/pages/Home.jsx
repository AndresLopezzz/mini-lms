import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";
import { courses } from "../data/courses";
import Header from "../components/Header";

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("mis-cursos");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showInterestSelection, setShowInterestSelection] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Función para manejar la selección de intereses
  const handleInterestSelect = (tag) => {
    let newInterests;
    if (selectedInterests.includes(tag)) {
      newInterests = selectedInterests.filter((t) => t !== tag);
    } else if (selectedInterests.length < 3) {
      newInterests = [...selectedInterests, tag];
    } else {
      return; // No hacer nada si ya hay 3 intereses seleccionados
    }

    setSelectedInterests(newInterests);

    // Persistir intereses en localStorage
    if (user) {
      const userPrefs = JSON.parse(localStorage.getItem("userPrefs") || "{}");
      userPrefs[user.email] = {
        ...(userPrefs[user.email] || {}),
        interests: newInterests,
      };
      localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
    }
  };
  const [filteredRecommended, setFilteredRecommended] = useState([]);
  // Add loading state to show loading indicator while filtering courses
  const [isLoading, setIsLoading] = useState(false);
  {
    isLoading && <div>Loading...</div>;
  }

  // Obtener todos los tags únicos de los cursos
  const allTags = Array.from(new Set(courses.flatMap((course) => course.tags)));

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser && !user) {
      navigate("/login");
      return;
    }

    // Obtener cursos inscritos del usuario actual
    if (user) {
      const userCourses =
        JSON.parse(localStorage.getItem("userCourses") || "{}") || {};
      setEnrolledCourses(userCourses[user.email] || []);

      // Cargar intereses persistidos
      const userPrefs = JSON.parse(localStorage.getItem("userPrefs") || "{}");
      if (userPrefs[user.email]?.interests) {
        const savedInterests = userPrefs[user.email].interests;
        setSelectedInterests(savedInterests);

        // Cargar recomendaciones basadas en intereses guardados
        if (savedInterests.length > 0) {
          const recommended = courses.filter(
            (course) =>
              course.tags &&
              course.tags.some((tag) => savedInterests.includes(tag))
          );
          setFilteredRecommended(recommended);
        }
      }
    }
  }, [user, navigate]);

  const handleEnroll = (courseId) => {
    if (!user) return;
    const userCourses =
      JSON.parse(localStorage.getItem("userCourses") || "{}") || {};
    const current = userCourses[user.email] || [];
    if (!current.includes(courseId)) {
      const updated = [...current, courseId];
      userCourses[user.email] = updated;
      localStorage.setItem("userCourses", JSON.stringify(userCourses));
      setEnrolledCourses(updated);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-150 ${
              activeTab === "mis-cursos"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-200"
            }`}
            onClick={() => setActiveTab("mis-cursos")}
          >
            Mis cursos
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-150 ${
              activeTab === "recomendados"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-200"
            }`}
            onClick={() => {
              setActiveTab("recomendados");
              setShowInterestSelection(true);
              setSelectedInterests([]);
              setFilteredRecommended([]);
            }}
          >
            Cursos recomendados
          </button>
        </div>
        {activeTab === "mis-cursos" ? (
          <div>
            {enrolledCourses.length === 0 ? (
              <div className="text-center text-gray-500 text-lg">
                No estás inscrito en ningún curso.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses
                  .filter((c) => enrolledCourses.includes(c.id))
                  .map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
            )}
          </div>
        ) : showInterestSelection ? (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              ¿Qué te gustaría aprender?
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Selecciona hasta 3 intereses para recomendarte cursos:
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded-full border text-sm transition-all duration-150 ${
                    selectedInterests.includes(tag)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-indigo-600 border-indigo-300"
                  }`}
                  onClick={() => handleInterestSelect(tag)}
                  disabled={
                    !selectedInterests.includes(tag) &&
                    selectedInterests.length >= 3
                  }
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold disabled:opacity-50"
                disabled={selectedInterests.length === 0}
                onClick={() => {
                  setIsLoading(true);
                  const filtered = courses.filter(
                    (course) =>
                      course.tags &&
                      course.tags.some((tag) => selectedInterests.includes(tag))
                  );
                  setFilteredRecommended(filtered);
                  setShowInterestSelection(false);
                  setIsLoading(false);
                }}
              >
                Buscar y filtrar
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold"
                onClick={() => {
                  setShowInterestSelection(false);
                  setSelectedInterests([]);
                  setFilteredRecommended([]);
                  // Limpiar intereses persistidos
                  if (user) {
                    const userPrefs = JSON.parse(
                      localStorage.getItem("userPrefs") || "{}"
                    );
                    userPrefs[user.email] = {
                      ...(userPrefs[user.email] || {}),
                      interests: [],
                    };
                    localStorage.setItem(
                      "userPrefs",
                      JSON.stringify(userPrefs)
                    );
                  }
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : activeTab === "recomendados" ? (
          <div>
            {filteredRecommended.length === 0 ? (
              <div className="text-center text-gray-500 text-lg">
                Selecciona tus intereses y pulsa "Buscar y filtrar" para recibir
                recomendaciones personalizadas.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecommended
                  .filter((c) => !enrolledCourses.includes(c.id))
                  .map((course) => (
                    <div key={course.id} className="relative">
                      <CourseCard course={course} />
                      <button
                        className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-xl shadow hover:bg-indigo-700 transition"
                        onClick={() => handleEnroll(course.id)}
                      >
                        Inscribirse
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
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

          {/* Buscador global independiente */}
          <SearchBar
            onSearchResults={(results) => {
              setSearchResults(results);
              setShowSearchResults(results.length > 0);
            }}
          />

          {/* Mostrar resultados de búsqueda */}
          {showSearchResults && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Resultados de búsqueda
              </h2>
              {searchResults.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                  No se encontraron cursos que coincidan con tu búsqueda.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map((course) => (
                    <div key={course.id} className="relative">
                      <CourseCard course={course} />
                      {!enrolledCourses.includes(course.id) && (
                        <button
                          className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-xl shadow hover:bg-indigo-700 transition"
                          onClick={() => handleEnroll(course.id)}
                        >
                          Inscribirse
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mostrar todos los cursos si no hay búsqueda activa */}
          {!showSearchResults && activeTab !== "recomendados" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Todos los cursos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <div key={course.id} className="relative">
                    <CourseCard course={course} />
                    {!enrolledCourses.includes(course.id) && (
                      <button
                        className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-xl shadow hover:bg-indigo-700 transition"
                        onClick={() => handleEnroll(course.id)}
                      >
                        Inscribirse
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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
