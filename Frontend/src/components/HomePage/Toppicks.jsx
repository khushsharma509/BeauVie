import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const brandData = [
    {
      img: "/images/top2.jpeg",
      title: "HAIR",
      route: "/haircare",
    },
    {
      img: "/images/top1.jpeg",
      title: "BEAUTY",
      route: "/makeup",
    },
    {
      img: "/images/top3.jpeg",
      title: "SKIN",
      route: "/skincare",
    },
    {
      img: "/images/top5.jpeg",
      title: "BATH & BODY",
      route: "/bathbody",
    },
    {
      img: "/images/top4.jpeg",
      title: "FRAGRANCE",
      route: "/fragarance",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f5cbb2",
        padding: "60px 20px",
        textAlign: "center",
        fontFamily: "'Helvetica Neue', sans-serif",
      }}
    >
      <h2
        style={{
          fontWeight: "700",
          fontSize: "36px",
          marginBottom: "10px",
          letterSpacing: "1px",
        }}
      >
       BEAUTY FOR EVERY YOU
      </h2>
      <p
        style={{
          fontSize: "20px",
          color: "#333",
          maxWidth: "700px",
          margin: "0 auto 40px",
          lineHeight: "1.5",
        }}
      >
        The ultimate beauty vision—haircare, makeup, skincare & fragrance—crafted for every body and every tone.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {brandData.map((brand, index) => (
          <div
            key={index}
            onClick={() => {
              if (brand.route) {
                console.log(`Navigating to: ${brand.route}`);
                navigate(brand.route);
              }
            }}
            style={{
              width: "220px",
              cursor: brand.route ? "pointer" : "default",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={brand.img}
              alt={brand.title}
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
            <h4
              style={{
                marginTop: "15px",
                fontSize: "18px",
                letterSpacing: "1px",
                fontWeight: "600",
                color: "#222",
              }}
            >
              {brand.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
