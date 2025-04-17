"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [tab, setTab] = useState("login"); // 'login' or 'signup'
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check authentication and fetch profile if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setProfile(data);
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          password: "",
        });
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      });
  }, []);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      setSuccess("Login successful!");
      // Fetch profile after login
      const profileRes = await fetch("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const profileData = await profileRes.json();
      setProfile(profileData);
      setForm({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        email: profileData.email || "",
        password: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.first_name || !form.last_name || !form.email || !form.password) {
      setError("Please provide all required fields");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      setSuccess("Signup successful! You are now logged in.");
      // Fetch profile after signup
      const profileRes = await fetch("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const profileData = await profileRes.json();
      setProfile(profileData);
      setForm({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        email: profileData.email || "",
        password: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setSuccess("Profile updated!");
    } catch (err) {
      setError("Could not update profile");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfile(null);
    setIsAuthenticated(false);
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
  };

  // Loading state
  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Not authenticated: show login/signup
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black bg-gray-50 p-4">
        <div className="bg-white p-8 rounded shadow w-full max-w-md">
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 font-montserrat rounded-l ${tab === "login" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
              onClick={() => { setTab("login"); setError(""); setSuccess(""); setForm({ first_name: "", last_name: "", email: "", password: "" }); }}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 font-montserrat rounded-r ${tab === "signup" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
              onClick={() => { setTab("signup"); setError(""); setSuccess(""); setForm({ first_name: "", last_name: "", email: "", password: "" }); }}
            >
              Sign Up
            </button>
          </div>
          {error && <div className="text-red-500 mb-3">{error}</div>}
          {success && <div className="text-green-600 mb-3">{success}</div>}
          {tab === "login" ? (
            <form onSubmit={handleLogin}>
              <label className="block mb-2 font-montserrat">Email</label>
              <input
                type="email"
                className="w-full mb-4 p-2 border rounded"
                placeholder="name@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <label className="block mb-2 font-montserrat">Password</label>
              <input
                type="password"
                className="w-full mb-4 p-2 border rounded"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <button className="w-full bg-black text-white py-2 rounded font-montserrat" type="submit">
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <label className="block mb-2 font-montserrat">First Name</label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                placeholder="First name"
                value={form.first_name}
                onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                required
              />
              <label className="block mb-2 font-montserrat">Last Name</label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                placeholder="Last name"
                value={form.last_name}
                onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                required
              />
              <label className="block mb-2 font-montserrat">Email</label>
              <input
                type="email"
                className="w-full mb-4 p-2 border rounded"
                placeholder="name@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <label className="block mb-2 font-montserrat">Password</label>
              <input
                type="password"
                className="w-full mb-4 p-2 border rounded"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <button className="w-full bg-black text-white py-2 rounded font-montserrat" type="submit">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Authenticated: show profile management
  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-3xl mb-6 font-playfair">Profile Management</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <form onSubmit={handleProfileUpdate}>
          <label className="block mb-2 font-montserrat">First Name</label>
          <input
            type="text"
            className="w-full mb-4 p-2 border rounded"
            value={form.first_name}
            onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
            required
          />
          <label className="block mb-2 font-montserrat">Last Name</label>
          <input
            type="text"
            className="w-full mb-4 p-2 border rounded"
            value={form.last_name}
            onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
            required
          />
          <label className="block mb-2 font-montserrat">Email</label>
          <input
            type="email"
            className="w-full mb-4 p-2 border rounded"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
            disabled
          />
          <button className="w-full bg-black text-white py-2 rounded font-montserrat" type="submit">
            Save Changes
          </button>
        </form>
        <button
          className="w-full mt-4 bg-gray-200 text-black py-2 rounded font-montserrat"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
