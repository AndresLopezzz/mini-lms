# Mini Sistema LMS - Proyecto de Desarrollo Web con React

## 📚 Descripción del Proyecto

Este proyecto consiste en la creación de un **LMS (Learning Management System)** básico, desarrollado con **React**, como parte de una clase de Desarrollo Web. Un LMS permite gestionar cursos, usuarios y actividades académicas, y este proyecto se enfoca en implementar un sistema funcional y claro con fundamentos sólidos de React y una estructura profesional.

## 🎯 Objetivos

- Aplicar conceptos fundamentales de **React.js** incluyendo `useState`, `useContext`, y `useEffect`.
- Usar **React Router** para gestionar rutas protegidas y navegación basada en el estado del usuario.
- Emplear **Tailwind CSS** para estilizar la aplicación de manera moderna y responsive.
- Simular un entorno de aprendizaje con usuarios que puedan registrarse, iniciar sesión y ver cursos.
- Organizar el proyecto con buenas prácticas y arquitectura modular.

---

## 🛠️ Tecnologías Utilizadas

- **React** con Vite
- **React Router DOM** (para navegación y rutas protegidas)
- **Tailwind CSS** (para estilos rápidos y responsivos)
- **Context API** (para manejar el estado global del usuario)
- **JavaScript (ES6+)**
- **CSS personalizado** (App.css, index.css)
- **Estructura de archivos modular y escalable**

---

## ✨ Funcionalidades Implementadas

### ✅ Autenticación básica
- Formularios de **Login** y **Registro** funcionales.
- Uso de `Context API` para manejar el estado del usuario (simulado sin backend).
- Persistencia del usuario activo durante la sesión.

### ✅ Navegación protegida
- Implementación de rutas privadas usando un componente `ProtectedRoute`.
- Redirección a `/login` si un usuario intenta acceder a una ruta sin autenticarse.

### ✅ Página principal (`Home.jsx`)
- Breve introducción al sistema.
- Acceso a login o cursos según el estado del usuario.

### ✅ Listado de Cursos (`Courses.jsx`)
- Muestra una lista de cursos simulados desde un archivo `courses.js`.
- Cada curso se presenta con un componente reutilizable `CourseCard`.

### ✅ Contexto de usuario
- Archivo `UserContext.jsx` con estado global de sesión.
- Métodos para iniciar y cerrar sesión disponibles desde cualquier componente.

### ✅ Estilos responsivos
- Tailwind CSS aplicado en todos los componentes y páginas.
- Navbar estilizada y condicional según sesión del usuario.

---

## 🔜 Próximas Mejoras (Roadmap)

- [ ] Validación de formularios de login y registro.
- [ ] Página de detalle del curso (`CourseDetail.jsx`)
- [ ] Formulario para crear nuevos cursos (`CreateCourse.jsx`)
- [ ] Lógica de quizzes básicos (`Quiz.jsx`)
- [ ] Simulación de inscripción a cursos
- [ ] Manejo de roles (estudiante / profesor)

---

## 🙌 Conclusión

Este proyecto demuestra la capacidad de construir un sistema funcional con buenas prácticas de desarrollo frontend usando React. Aunque se trata de una simulación sin backend, la arquitectura permite escalar fácilmente a un sistema completo con conexión a API REST o GraphQL. Se trabajaron los aspectos clave requeridos por la clase, como rutas, hooks, Tailwind, y organización limpia del código.

---
