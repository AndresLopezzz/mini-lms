// Utilidad para simular lectura y escritura en users.json desde el frontend
// Solo funciona en desarrollo y para pruebas locales

const USERS_JSON_PATH = "/src/data/users.json";

export async function getUsers() {
  // Primero intenta leer de localStorage
  const localUsers = localStorage.getItem("users");
  if (localUsers) {
    try {
      return JSON.parse(localUsers);
    } catch {
      // Si hay error, sigue con users.json
    }
  }
  try {
    const res = await fetch(USERS_JSON_PATH + "?t=" + Date.now());
    if (!res.ok) throw new Error("No se pudo leer users.json");
    const users = await res.json();
    // Sincroniza localStorage con users.json
    localStorage.setItem("users", JSON.stringify(users));
    return users;
  } catch {
    return [];
  }
}

export async function saveUsers(users) {
  // Guarda en localStorage
  localStorage.setItem("users", JSON.stringify(users));
  // Intenta sincronizar con users.json si hay backend (opcional, aquí solo localStorage)
  // Para pruebas reales, se requeriría una API backend o un mock server.
  return true;
}

// Para desarrollo: sincroniza localStorage con users.json al iniciar
export async function syncUsersFromJson() {
  const users = await getUsers();
  localStorage.setItem("users", JSON.stringify(users));
}
