import { useEffect, useState } from "react";
import styled from "styled-components";
import service from "./service/service";

function App() {
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [order, setOrder] = useState(undefined);
  useEffect(() => {
    const loadData = async () => {
      setOrder(await service.getOrder(setLoading));
    };
    loadData();
    setInterval(() => {
      setUpdate(!update);
      console.log('updated');
    }, 1000000);
  }, [update]);

  function handleDate(date) {
    const auxArr = date.split("T");
    const time = auxArr[1].slice(0, 5);
    return time;
  }

  return (
    <AppContainer>
      <InfoContainer>
        <h1>ENTREGAS PRIMA FIAT</h1>
        {order
          ? order?.map((a) => {
              const newDate = handleDate(a.deliveryDate);
              return (
                <InfoCard
                  key={a.id}
                  backgroundColor={
                    a.status === "TOBEDELIVERED"
                      ? "#FFFFFF"
                      : a.status === "DELAYED"
                      ? "#FDDC56"
                      : "#5ced73"
                  }
                >
                  <InfoBox>
                    <h2>Número do pedido:</h2>
                    <p>{a.orderNumber}</p>
                  </InfoBox>
                  <InfoBox>
                    <h2>Horário de Entrega:</h2>
                    <p>{newDate}</p>
                  </InfoBox>
                  <InfoBox>
                    <h2>Cliente:</h2>
                    <p>{a.customer}</p>
                  </InfoBox>
                  <InfoBox>
                    <h2>Modelo:</h2>
                    <p>{a.model}</p>
                  </InfoBox>
                  <InfoBox>
                    <h2>Cor:</h2>
                    <p>{a.color}</p>
                  </InfoBox>
                  <InfoBox>
                    <h2>Chassi:</h2>
                    <p>{a.chassi}</p>
                  </InfoBox>
                  <InfoBox>
                    <h2>Vendedor:</h2>
                    <p>{a.seller}</p>
                  </InfoBox>
                  <InfoBox>
                    <h2>Status</h2>
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
          : "Loading"}
      </InfoContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: BLACK;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial;
`;

const InfoContainer = styled.div`
  background-color: rgb(163, 54, 69);
  padding: 5vh;
  height: 80%;
  width: 90%;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  overflow: scroll;

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
    color: #ffffff;
  }
`;

const InfoCard = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 15%;
  width: 100%;
  background-color: ${props => props.backgroundColor};
  margin-bottom: 2vh;
  border-radius: 30px;
`;

const InfoBox = styled.div`
  width: 12.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  h2 {
    margin-bottom: 5px;
    font-size: 2vh;
  }
  p {
    font-size: 3vh;
    font-weight: 600;
  }
`;

export default App;
