import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Main(params) {
  const [orderNumber, setOrderNumber] = useState(undefined);
  const [deliveryDate, setDeliveryDate] = useState(undefined);
  const [customer, setCustomer] = useState(undefined);
  const [model, setModel] = useState(undefined);
  const [color, setColor] = useState(undefined);
  const [chassi, setChassi] = useState(undefined);
  const [seller, setSeller] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(deliveryDate);
  }, [deliveryDate]);

  return (
    <MainContainer>
      <form>
        <p>Número do Pedido:</p>
        <input
          type="number"
          placeholder="Preencha aqui!"
          required
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        ></input>
        <p>Data de Entrega:</p>
        <input
          type="datetime-local"
          placeholder="Preencha aqui!"
          required
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        ></input>
        <p>Cliente:</p>
        <input
          type="text"
          placeholder="Preencha aqui!"
          required
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        ></input>
        <p>Modelo:</p>
        <input
          type="text"
          placeholder="Preencha aqui!"
          required
          value={model}
          onChange={(e) => setModel(e.target.value)}
        ></input>
        <p>Cor:</p>
        <input
          type="text"
          placeholder="Preencha aqui!"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
        ></input>
        <p>Chassi:</p>
        <input
          type="text"
          placeholder="Preencha aqui!"
          required
          value={chassi}
          onChange={(e) => setChassi(e.target.value)}
        ></input>
        <p>Vendedor:</p>
        <input
          type="text"
          placeholder="Preencha aqui!"
          required
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        ></input>
        <button type="submit" disabled={loading ? true : false}>{loading ? true : "Enviar"}</button>
      </form>
    </MainContainer>
  );
}

export const MainContainer = styled.div`
  margin-top: 80px;
  height: (100vh - 80px);
  width: 100vw;
  form {
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  p {
    margin: 5px;
    font-weight: 700;
    font-size: 18px;
  }
  input {
    height: 35px;
    width: 500px;
    padding-left: 10px;
    font-size: 16px;
    text-align: center;
    margin-bottom: 15px;
    border: none;
    border-radius: 5px;
  }
  button {
    margin-top: 20px;
    height: 80px;
    width: 200px;
    border-radius: 5px;
    border: none;
    background-color: #000;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
  }
  label {
    margin-top: -7px;
    margin-bottom: 20px;
    font-size: 18px;
  }
  div {
    margin: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    div {
        width: 250px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
  }
`;
