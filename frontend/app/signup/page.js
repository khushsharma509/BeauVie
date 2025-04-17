"use client";
import { useState } from "react";
import { fetchAPI } from "../utils/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = await fetchAPI("/user/register", {
      method: "POST",
      body: JSON.stringify({ email, name, password }),
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.replace("/profile");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
