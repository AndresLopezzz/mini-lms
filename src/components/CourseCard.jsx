import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-100">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {course.description}
        </p>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {course.instructor}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-500">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {course.duration}
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              {course.level}
            </span>
          </div>
        </div>
        <Link
          to={`/courses/${course.id}`}
          className="mt-4 block w-full text-center py-2 px-4 border border-transparent rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Ver Curso
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
