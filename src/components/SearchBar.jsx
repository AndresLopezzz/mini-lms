import React, { useState } from 'react';
import { courses } from '../data/courses';

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      onSearchResults([]); // Si no hay término de búsqueda, devolver array vacío
      return;
    }
    
    // Buscar en título, descripción y tags
    const results = courses.filter(course => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        course.title.toLowerCase().includes(searchTermLower) ||
        course.description.toLowerCase().includes(searchTermLower) ||
        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchTermLower)))
      );
    });
    
    onSearchResults(results);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Buscar cursos por título, descripción o etiquetas"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;