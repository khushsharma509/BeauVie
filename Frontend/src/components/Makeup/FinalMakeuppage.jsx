import Navbar from "../Navbar";
import "../../styles/makeup.css";
import Accordion from "react-bootstrap/Accordion";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Card2 from "./Card";
import { Appcontext } from "../../context/AppContext";
import ProductNotFound from "./productNotFound";
import BackHome from "./BackHome";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const makeupProdType = [
  { id: 1, name: "Foundation" },
  { id: 2, name: "Lipstick" },
  { id: 3, name: "Eyeliner" },
  { id: 4, name: "Mascara" },
  { id: 5, name: "Blush" },
  { id: 6, name: "Compact Powder" },
];

const sortvalue = ["Price: Low To High", "Price: High To Low"];

export default function FinalMakeupPage() {
  const [sortV, setSortV] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fParams, filterParams } = useContext(Appcontext);
  const [type, setType] = useState(null);
  const [filtereddata, setFiltereddata] = useState([]);

  useEffect(() => {
    if (sortV === "Price: Low To High") {
      const sorted = [...filtereddata].sort((a, b) => Number(a.price) - Number(b.price));
      setFiltereddata(sorted);
    } else if (sortV === "Price: High To Low") {
      const sorted = [...filtereddata].sort((a, b) => Number(b.price) - Number(a.price));
      setFiltereddata(sorted);
    }
  }, [sortV]);

  useEffect(() => {
    if(type==null) return;
    setLoading(true);
    const fetchProducts = () => {
      return fetch(`${BASE_URL}/api/products?category=2&subcategory=${type}`)
        .then((res) => res.json());
    };

    fetchProducts().then((res) => {
      setTimeout(() => {
        setFiltereddata(res.products || []);
        setLoading(false);
      }, 1000);
    });
  }, [type]);

  return (
    <>
      <Navbar />
      <div style={{ width: "100%", height: "135px" }}></div>
      <div>
        <div
          style={{
            filter: "blur(8px)",
            background:
              "url(https://d32baadbbpueqt.cloudfront.net/Collection/5610ef95-1b26-4e8a-9a92-4d74c762acfb.jpg)",
            webkitFilter: "blur(20px)",
            width: "100%",
            height: "270px",
            display: "flex",
            alignItems: "center",
            backgroundPosition: "50%",
            position: "absolute",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <img
          src="https://d32baadbbpueqt.cloudfront.net/Collection/5610ef95-1b26-4e8a-9a92-4d74c762acfb.jpg"
          alt=""
          style={{ position: "relative", width: "979px", height: "270px" }}
        />
      </div>
      <BackHome name={"Makeup"} />
      <div style={{ display: "flex", width: "95%", margin: "auto" }}>
        {/* Filter Sidebar */}
        <div style={{ width: "313px" }}>
          <div className="filter1">
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Sort By: {sortV}</Accordion.Header>
                <Accordion.Body>
                  {sortvalue.map((el) => (
                    <div key={el} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                      <input
                        type="radio"
                        value={el}
                        name="sort"
                        onChange={() => setSortV(el)}
                        className="radiofilter"
                      />
                      <label style={{ marginLeft: "20px" }}>{el}</label>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Product Type</Accordion.Header>
                <Accordion.Body>
                  {makeupProdType.map((el) => (
                    <div key={el.id} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                      <input
                        type="radio"
                        value={el.id}
                        name="subcategory"
                        onChange={(e) => setType(e.target.value)}
                        className="radiofilter"
                      />
                      <label style={{ marginLeft: "20px", fontSize: "12px" }}>{el.name}</label>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

        {/* Product Cards */}
        <div className="prod_data">
          {loading ? (
            [...Array(12)].map((_, i) => (
              <Card key={i} style={{ width: "346px", height: "420px", borderRadius: "10px" }}>
                <Card.Img
                  variant="top"
                  src="https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png"
                  style={{ width: "146px", height: "222px", margin: "auto", marginTop: "10px" }}
                />
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={10} />
                  </Placeholder>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={5} />
                  </Placeholder>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={8} />
                  </Placeholder>
                  <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
                    <Placeholder.Button variant="dark" xs={3} />
                    <Placeholder.Button variant="dark" style={{ width: "222px", height: "44px" }} />
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : filtereddata.length === 0 ? (
            <ProductNotFound />
          ) : (
            filtereddata.map((el) => <Card2 key={el.id} carddata={el} id={el.id} />)
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
