// Everything that talks to the backend server lives in this file.

// The address of the backend. Change it here if the server moves.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DEFAULT_GRADIENT = "linear-gradient(135deg, #4338ca, #7c3aed)";

// ----- Saving the login in the browser -----

export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    return null;
  }
}

export function getSavedUser() {
  try {
    if (!localStorage.getItem("token")) return null;
    return JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function saveSession(token, user) {
  try {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    // storage not available, the login will last until the page is refreshed
  }
}

export function clearSession() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    // ignore storage errors
  }
}

// ----- Sending requests to the server -----

// request("/api/blogs")                                    -> GET
// request("/api/blogs", { method: "POST", body, auth: true }) -> POST with the login token
export async function request(
  path,
  { method = "GET", body, auth = false } = {},
) {
  const headers = {};

  if (body) {
    headers["Content-Type"] = "application/json";
  }
  if (auth && getToken()) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    throw new Error(
      "Cannot reach the server. Make sure the backend is running.",
    );
  }

  let data = {};
  try {
    data = await response.json();
  } catch (error) {
    // the server sent no JSON, keep the empty object
  }

  if (!response.ok) {
    const problem = new Error(data.message || "Something went wrong.");
    problem.status = response.status;
    throw problem;
  }

  return data;
}

// Turn a blog from the server into the shape the blog cards expect
export function formatBlog(blog) {
  const date = new Date(blog.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return {
    ...blog,
    meta: `${blog.category} • ${date}`,
    gradient: DEFAULT_GRADIENT,
  };
}
