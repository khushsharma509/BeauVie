import Navbar from "../Navbar";
import "../../styles/makeup.css";
import Accordion from "react-bootstrap/Accordion";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Card2 from "../Makeup/Card";
import { Appcontext } from "../../context/AppContext";
import swal from "sweetalert";
import ProductNotFound from "../Makeup/productNotFound";
import BackHome from "../Makeup/BackHome";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const skincareTypes = [
  { id: 1, name: "Cleansers" },
  { id: 2, name: "Serums" },
  { id: 3, name: "Moisturisers" },
  { id: 4, name: "Sunscreens" },
  { id: 5, name: "Masks & Peels" },
  { id: 6, name: "Toners" }
];

const sortvalue = ["Price: Low To High", "Price: High To Low"];

export default function FinalSkincarePage() {
  const [sortV, setSortV] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fParams, filterParams } = useContext(Appcontext);
  const [type, setType] = useState(null);
  const [filtereddata, setFiltereddata] = useState([]);

  useEffect(() => {
    if (sortV === "Price: Low To High") {
      setLoading(true);
      const sorted = [...filtereddata].sort((a, b) => Number(a.price) - Number(b.price));
      setFiltereddata(sorted);
      setLoading(false);
    } else if (sortV === "Price: High To Low") {
      setLoading(true);
      const sorted = [...filtereddata].sort((a, b) => Number(b.price) - Number(a.price));
      setFiltereddata(sorted);
      setLoading(false);
    }
  }, [sortV]);

  useEffect(() => {
    if(type==null) return;
    setLoading(true);
    const Returnfetchuser = () => {
      return fetch(`${BASE_URL}/api/products?category=2&subcategory=${type}`)
        .then((res) => res.json());
    };

    Returnfetchuser().then((res) => {
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
      <BackHome name={"Skincare"} />
      <div style={{ display: "flex", width: "95%", margin: "auto" }}>
        <div style={{ width: "313px", height: "auto" }}>
          <div
            style={{
              marginBottom: "20px",
              paddingTop: "5px",
              width: "313px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "rgb(185 185 185 / 25%) 0px 0px 9px",
            }}
          >
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header style={{ fontWeight: "bolder" }}>
                  Sort By: {sortV}
                </Accordion.Header>
                <Accordion.Body>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {sortvalue.map((el) => (
                      <div
                        key={el}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "5px",
                        }}
                      >
                        <input
                          className="radiofilter"
                          type="radio"
                          value={el}
                          name="sort"
                          onChange={() => setSortV(el)}
                        />
                        <label style={{ marginLeft: "20px", fontSize: "16px" }}>{el}</label>
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className="filter1">
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <b>Filters</b>
              <span style={{ color: "#FC2779", cursor: "pointer" }} onClick={() => window.location.reload()}>
                Reset
              </span>
            </div>
            <Accordion flush>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Product Type</Accordion.Header>
                <Accordion.Body>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {skincareTypes.map((el) => (
                      <div key={el.id} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                        <input
                          className="radiofilter"
                          type="radio"
                          value={el.id}
                          name="subcategory"
                          onChange={(e) => setType(Number(e.target.value))}
                        />
                        <label style={{ marginLeft: "20px", fontSize: "12px" }}>{el.name}</label>
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

        <div className="prod_data">
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => (
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
                    <Placeholder style={{ marginTop: "5px", marginBottom: "5px" }} xs={5} />
                  </Placeholder>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={8} />
                  </Placeholder>
                  <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
                    <Placeholder.Button variant="dark" style={{ width: "42px", height: "42px" }} />
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
      <div style={{ color: "lightgray", marginTop: "190px" }}>
        _______________________________________________________________________________________________________________________________________________________________________________
      </div>
      <Footer />
    </>
  );
}
