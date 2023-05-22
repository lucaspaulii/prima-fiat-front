import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Header from "./Header";
import service from "./service/service";

function App() {
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [order, setOrder] = useState(undefined);
  const [time, setTime] = useState();
  const [nearest, setNearest] = useState();

  useEffect(() => {
    setUpdate(!update);
  }, [time]);

  useEffect(() => {
    const loadData = async () => {
      setOrder(await service.getOrder(setLoading));
    };
    loadData();
    const nearestId = findNearestDate(order);
    setNearest(nearestId);
  }, [update]);

  function handleDate(date) {
    const auxArr = date.split("T");
    const time = auxArr[1].slice(0, 5);
    return time;
  }

  function findNearestDate(obj) {
    if (obj) {
      let smallestDiff = +Infinity;
      let nextId;
      for (let i = 0; i < order.length; i++) {
        const newDate = handleDate(obj[i].deliveryDate);
        const intNewDate = dateToInteger(newDate);
        const intNow = dateToInteger(time);
        if (
          intNewDate - intNow < smallestDiff &&
          intNewDate - intNow > 0 &&
          obj[i].status == "TOBEDELIVERED"
        ) {
          smallestDiff = intNewDate - intNow;
          nextId = obj[i].id;
        }
      }
      return nextId;
    }
  }

  function dateToInteger(date) {
    if (!date) {
      return 0;
    }
    const auxArr = date.split(":");
    const int = Number(auxArr[0]) + Number(auxArr[1]) / 60;
    return int;
  }

  function checkNext(id) {
    if (id === nearest) {
      return true;
    } else {
      return false;
    }
  }

  function hasPassed(deliveryTime) {
    const int = dateToInteger(deliveryTime);
    const intNow = dateToInteger(time);
    if (int - intNow < 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <AppContainer>
      <Header time={time} setTime={setTime} />
      <InfoContainer>
        <InfoHeader>
          <HeaderText boxWidth={"6%"}>Horário</HeaderText>
          <HeaderText boxWidth={"23%"}>Cliente</HeaderText>
          <HeaderText boxWidth={"12%"}>Modelo</HeaderText>
          <HeaderText boxWidth={"11%"}>Cor</HeaderText>
          <HeaderText boxWidth={"23%"}>Chassi</HeaderText>
          <HeaderText boxWidth={"14%"}>Vendedor</HeaderText>
          <HeaderText boxWidth={"11%"}>Status</HeaderText>
        </InfoHeader>
        {order ? (
          order?.map((a) => {
            const newDate = handleDate(a.deliveryDate);
            const isNext = checkNext(a.id);
            const isPast = hasPassed(newDate);
            return (
              <InfoCard
                key={a.id}
                backgroundColor={
                  a.status === "DELIVERED"
                    ? "#bbedbe"
                    : a.status === "DELAYED"
                    ? "#faebbd"
                    : "#ffffff"
                }
                isNext={isNext}
                brightness={isPast ? "1" : "1"}
                margin={isNext ? "2vh 0 4vh 0" : "0 0 2vh 0"}
              >
                <InfoBox boxWidth={"6%"}>
                  <p>{newDate}</p>
                </InfoBox>
                <InfoBox boxWidth={"23%"}>
                  {/*<p>{a.customer}</p>*/}
                  <p>Rodrigo da Silva Costa</p>
                </InfoBox>
                <InfoBox boxWidth={"12%"}>
                  {/*<p>{a.model}</p>*/}
                  <p>Chronos</p>
                </InfoBox>
                <InfoBox boxWidth={"11%"}>
                  {/*<p>{a.color}</p>*/}
                  <p>Vermelho</p>
                </InfoBox>
                <InfoBox boxWidth={"23%"}>
                  {/*<p>{a.chassi}</p>*/}
                  <p>LVVDA11A75D029813</p>
                </InfoBox>
                <InfoBox boxWidth={"14%"}>
                  <p>{a.seller}</p>
                </InfoBox>
                <InfoBox boxWidth={"11%"}>
                  <p>
                    {a.status === "TOBEDELIVERED"
                      ? "À ENTREGAR"
                      : a.status === "DELAYED"
                      ? "REMARCADO"
                      : "ENTREGUE"}
                  </p>
                </InfoBox>
              </InfoCard>
            );
          })
        ) : (
          <h1>{loading}</h1>
        )}
      </InfoContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 45%,
    rgba(100, 100, 100) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: "Roboto", sans-serif;
  overflow: hidden;
`;

const InfoContainer = styled.div`
  background-color: rgba(300, 300, 300, 0.6);
  box-sizing: border-box;
  padding: 2vh;
  height: 70%;
  width: 95%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  overflow: scroll;
  border-radius: 10px;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  h1 {
    margin-bottom: 3vh;
    font-size: 4vh;
    font-weight: bolder;
    color: #000000;
  }
`;

const InfoHeader = styled.div`
  display: flex;
  width: 100%;
  font-size: 25px;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
  p:first-child {
    border-left: 5px solid #666;
  }
`;

const HeaderText = styled.p`
  width: ${(props) => props.boxWidth};
  text-align: center;
  border-right: 5px solid #666;
`

const InfoCard = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 14%;
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  ${(props) =>
    props.isNext === true &&
    css`
      outline: 10px outset #444444;
      animation-name: ${animation};
      animation-fill-mode: backwards;
      animation-duration: 5s;
      animation-iteration-count: infinite;
    `}
  filter: brightness(${(props) => props.brightness});
  margin: ${(props) => props.margin};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  border-radius: 1vw;
`;

const InfoBox = styled.div`
  width: ${(props) => props.boxWidth};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  p {
    width: 100%;
    font-size: 3.7vh;
    font-weight:600;
    text-align: center;
  }
`;

const animation = keyframes`
 0% { outline: 0.1px solid green; }
 50% { outline: 10px solid green; }
 100% { outline: 0.1px solid green; }
`;

export default App;
