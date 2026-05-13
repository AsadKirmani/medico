import api from "./api";
import TokenService from "./token.service";

// ─── DUMMY MODE ───────────────────────────────────────────────────────────────
// Set to true to bypass the backend and use hardcoded credentials for UI testing.
// Flip to false when connecting to the real backend.
const DUMMY_MODE = false;

const DUMMY_CREDENTIALS = { username: "admin", password: "admin123" };
const DUMMY_USER = {
  username: "admin",
  firstName: "Admin",
  lastName: "User",
  email: "admin@medico.com",
  roles: ["ROLE_ADMIN"],
  accessToken: "dummy-access-token",
  refreshToken: "dummy-refresh-token",
};
// ─────────────────────────────────────────────────────────────────────────────

const register = (username, email, password, firstName, lastName) => {
  if (DUMMY_MODE) {
    return Promise.resolve({ data: { message: "Dummy registration successful." } });
  }
  return api.post("/auth/signup", {
    username,
    email,
    password,
    firstName,
    lastName
  });
};

const login = (username, password) => {
  if (DUMMY_MODE) {
    if (
      username === DUMMY_CREDENTIALS.username &&
      password === DUMMY_CREDENTIALS.password
    ) {
      TokenService.setUser(DUMMY_USER);
      return Promise.resolve(DUMMY_USER);
    }
    return Promise.reject(new Error("Invalid credentials. Use admin / admin123"));
  }
  return api
    .post("/auth/signin", {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;