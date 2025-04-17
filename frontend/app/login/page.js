"use client";
import { useState } from "react";
import { fetchAPI } from "../utils/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await fetchAPI("/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.replace("/profile");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
