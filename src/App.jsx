import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
// import petImg from './img/pet.jpg'

import { Button, Navbar, Nav, Container, Row, Col } from "react-bootstrap";

import data from "./data";
import Detail from "./routes/Detail";

import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let [btnCount, setBtnCount] = useState(1);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              DETAIL
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">Home</Link>
      <Link to="/detail">DETAIL</Link> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((item, index) => {
                    let imageUrl =
                      "https://codingapple1.github.io/shop/shoes" +
                      (index + 1) +
                      ".jpg";
                    return (
                      <Card key={index} item={item} imageUrl={imageUrl}></Card>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  if (btnCount >= 3) {
                    alert("상품없음 ");
                  } else {
                    setBtnCount(btnCount + 1);

                    axios
                      .get(
                        "https://codingapple1.github.io/shop/data" +
                          (btnCount + 1) +
                          ".json"
                      )
                      .then((res) => {
                        ///...은 괄호를 벗겨준대
                        let copy = [...shoes, ...res.data];
                        setShoes(copy);
                      })
                      .catch(() => {
                        console.log("실패");
                      });

                    //두개 한번에 할떄
                    // Promise.all([axios.get(''), axios.get('')])
                    // .then(() => {

                    // })
                  }
                }}
              >
                더보기
              </button>
            </>
          }
        ></Route>
        <Route
          path="/detail/:id"
          element={<Detail shoes={shoes}></Detail>}
        ></Route>

        {/* Nested Routes */}
        <Route path="/about" element={<About></About>}>
          <Route path="member" element={<div>멤버임</div>}></Route>
          <Route path="location" element={<div>위치정보임</div>}></Route>
        </Route>

        <Route path="*" element={<div>없는페이지</div>}></Route>
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  console.log(props.imageUrl);
  let navigate = useNavigate();
  return (
    <div className="col-md-4">
      <img
        src={props.imageUrl}
        width="80%"
        onClick={() => {
          navigate("/detail/" + props.item.id);
        }}
      />
      <h4>{props.item.title}</h4>
      <p>{props.item.content}</p>
    </div>
  );
}

export default App;
