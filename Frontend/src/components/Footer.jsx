import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim() !== "") {
      alert("Subscribed successfully!");
    } else {
      alert("Please enter your email!");
    }
  };

  return (
    <footer style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#000", color: "#fff" }}>
      {/* Email Subscription */}
      <div style={{ textAlign: "center", padding: "50px 20px", borderBottom: "1px solid #444" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "20px", fontWeight: "600" }}>
          Be the first to hear about all things BeauVie
        </h3>
        <p style={{ color: "#aaa", fontSize: "14px" }}>
          Stay connected for exclusive offers and latest updates, delivered straight to your inbox
        </p>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <input
            type="email"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "6px",
              border: "1px solid #666",
              width: "300px",
              maxWidth: "90%",
              outline: "none",
              fontSize: "14px",
              backgroundColor: "#111",
              color: "#fff",
            }}
          />
          <button
            onClick={handleSubscribe}
            style={{
              padding: "12px 20px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#fff",
              color: "#000",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "40px",
          padding: "50px 60px",
          fontSize: "14px",
          lineHeight: "1.8",
        }}
      >
        {/* Logo + Tagline */}
        <div>
          <h2 style={{ color: "#ff3c3c", fontSize: "24px", marginBottom: "10px" }}>BeauVie</h2>
          <p style={{ fontSize: "13px", color: "#ccc" }}>
            For every day, for every mood, for every you
          </p>
        </div>

        {/* BEAUVIE Info */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h4 style={{ fontWeight: "600", marginBottom: "14px" }}>BEAUVIE</h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              marginLeft: "-240px",
              color: "#ccc",
              display: "flex",
              flexDirection: "column",
              gap: "-20px",
            }}
          >
            <li>Who We Are</li>
            <li>For You</li>
            <li>Red</li>
            <li>Offers</li>
            <li>BEAUVIE Tribe</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h4 style={{ fontWeight: "600", marginBottom: "14px" }}>Customer Care</h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              marginLeft: "-240px",
              color: "#ccc",
              display: "flex",
              flexDirection: "column",
              gap: "-20px",
            }}
          >
            <li>Help Centre</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h4 style={{ fontWeight: "600", marginBottom: "14px" }}>Categories</h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              marginLeft: "-240px",
              color: "#ccc",
              display: "flex",
              flexDirection: "column",
              gap: "-20px",
            }}
          >
            <li>Makeup</li>
            <li>Skin</li>
            <li>Hair</li>
            <li>Fragrance</li>
            <li>Men</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h4 style={{ fontWeight: "600", marginBottom: "14px" }}>Contact Us</h4>
          <p style={{ marginBottom: "8px" }}>
            Call: <span style={{ color: "#ff3c3c" }}>1-800-890-3030</span>
          </p>
          <p style={{ marginBottom: "8px" }}>
            WhatsApp: <span style={{ color: "#ff3c3c" }}>79770 90909</span>
            <br />
            <span style={{ fontSize: "13px", color: "#aaa" }}>(All days, 8am–8pm)</span>
          </p>
          <p>
            Email: <span style={{ color: "#ff3c3c" }}>help@beauvie.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
