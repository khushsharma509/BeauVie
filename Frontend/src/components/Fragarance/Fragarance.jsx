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


const fragranceTypes = [
  { id: 1, name: "Women" },
  { id: 2, name: "Men" }
];

const sortvalue = ["Price: Low To High", "Price: High To Low"];

export default function FinalGiftingPage() {
  const [sortV, setSortV] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fParams, filterParams } = useContext(Appcontext);
  const [type, setType] = useState(null);
  const [filtereddata, setFiltereddata] = useState([]);

  useEffect(()=>{
    if(sortV=="Price: Low To High"){
      setLoading(true);
      let sorteddata=filtereddata.sort(function(a,b){
        return(
          Number(b.price)-Number(a.price)
        )
      })
     
      setFiltereddata(sorteddata);
      setLoading(false);
    }
    if(sortV=="Price: High To Low"){
      setLoading(true);
      let sorteddata=filtereddata.sort(function(a,b){
        return(
          Number(a.price)-Number(b.price)
        )
      })
     
      setFiltereddata(sorteddata);
      setLoading(false);
    }
   },[sortV])

  useEffect(() => {
    if(type==null) return;
    setLoading(true);
    const Returnfetchuser = () => {
      return fetch(`${BASE_URL}/api/products?category=5&subcategory=${type}`)
        .then((res) => res.json());
    };
    
    

    Returnfetchuser().then((res) => {
      setTimeout(() => {
        setFiltereddata(res.products || []);
        setLoading(false);
      }, 1000);
    });
    
    
    console.log(type);
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
              "url(https://d32baadbbpueqt.cloudfront.net/Collection/9e08d6b0-08e8-4894-acae-ad1fd84bc837.jpg)",
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
          src="https://d32baadbbpueqt.cloudfront.net/Collection/9e08d6b0-08e8-4894-acae-ad1fd84bc837.jpg"
          alt=""
          style={{ position: "relative", width: "979px", height: "270px" }}
        />
      </div>
      <BackHome name={"Gifting"} />
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
                  Sort By:{sortV}
                </Accordion.Header>
                <Accordion.Body>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    {sortvalue.map((el) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                            marginBottom: "5px",
                          }}
                        >
                          <input
                            className="radiofilter"
                            type="radio"
                            value={el}
                            name="gender"
                            onChange={() => {
                              setSortV(el);
                            }}
                          />
                          <label
                            style={{
                              marginLeft: "20px",
                              fontSize: "16px",
                              color: "#212121",
                            }}
                            htmlFor=""
                          >
                            {el}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div>
            <div className="filter1">
              <div
                style={{
                  width: "294px",
                  height: "64px",
                  paddingLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  fontWeight: "bold",
                }}
              >
                Filters{" "}
                <span
                  style={{
                    marginLeft: "5px",
                    overflow: "hidden",
                    fontSize: "12px",
                    color: "#212121",
                    fontWeight: "normal",
                  }}
                >
                {fragranceTypes.find((item) => item.id === type)?.name || "All Products"}


                </span>
                <span
                  style={{
                    color: "#FC2779",
                    marginLeft: "120px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Reset
                </span>
              </div>
              <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header style={{ fontWeight: "bolder" }}>
                    Product Type
                  </Accordion.Header>
                  <Accordion.Body>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {fragranceTypes.map((el) => (
  <div
    key={el.id}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      marginBottom: "5px",
    }}
  >
    <input
      className="radiofilter"
      type="radio"
      value={el.id}
      name="subcategory"
      onChange={(e) => setType(Number(e.target.value))}
    />
    <label
      style={{
        marginLeft: "20px",
        fontSize: "12px",
        color: "#212121",
      }}
    >
      {el.name}
    </label>
  </div>
))}


                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="prod_data">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el) => {
              return (
                <Card
                  style={{
                    width: "346px",
                    height: "420px",
                    borderRadius: "10px",
                  }}
                >
                  <Card.Img
                    style={{
                      width: "146px",
                      height: "222px",
                      margin: "auto",
                      marginTop: "10px",
                    }}
                    variant="top"
                    src="https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png"
                    animation="glow"
                  />
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={10} />
                    </Placeholder>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder
                        style={{ marginTop: "5px", marginBottom: "5px" }}
                        xs={5}
                      />
                    </Placeholder>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={8} />
                    </Placeholder>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "30px",
                      }}
                    >
                      <Placeholder.Button
                        variant="dark"
                        style={{
                          width: "42px",
                          height: "42px",
                        }}
                        xs={3}
                      />
                      <Placeholder.Button
                        style={{
                          width: "222px",
                          height: "44px",
                        }}
                        variant="dark"
                      />
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          ) : filtereddata.length == undefined || filtereddata.length == 0 ? (
            <ProductNotFound />
          ) : (
            filtereddata.map((el) => {
              return <Card2 carddata={el} id={el.id}/>;
            })
          )}
          {/* cards */}
        </div>
      </div>
      <div style={{ color: "lightgray", marginTop: "190px" }}>
        _______________________________________________________________________________________________________________________________________________________________________________
      </div>
      <Footer />
    </>
  );
}
