import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Detail(props) {
  let [alert, setAlert] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);

    //useEffect 동작전에 실행됨
    // : clean up function -> 다 삭제되고 다시 렌더링하고 싶을때

    // (참고) : mount시 실행안됨, unmount시 실행됨
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let { id } = useParams();

  let findId = props.shoes.filter((item) => item.id === Number(id));
  let imageUrl =
    "https://codingapple1.github.io/shop/shoes" + (findId[0].id + 1) + ".jpg";

  return (
    <div className="container">
      {alert === true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      {/* <YellowBtn bg="blue">버튼</YellowBtn> */}
      <div className="row">
        <div className="col-md-6">
          <img src={imageUrl} width="100%"></img>
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{findId[0].title}</h4>
          <p>{findId[0].content}</p>
          <p>{findId[0].price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg === "blue" ? "white" : "black")};
//   padding: 10px;
// `;

export default Detail;
