import { useState } from "react";
import service from "../services/services.js";
import { MainContainer } from "./Main.js";

export default function Edit(params) {
  const [action, setAction] = useState(undefined);
  const [deliveryDate, setDeliveryDate] = useState(undefined);
  const [orderNumber, setOrderNumber] = useState(undefined);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (action === "delay") {
      if (!deliveryDate) {
        alert("remarque a data de entrega");
        return;
      }
      service.delayOrder(orderNumber, setLoading, deliveryDate);
    }
    if (action === "deliver") {
      service.deliverOrder(orderNumber, setLoading);
      alert("Pedido entregue com suceso!");
      setLoading(false);
    }
    setTimeout(() => {
      clearAll();
    }, [1000]);
  }

  function clearAll() {
    setAction("deliver");
    setDeliveryDate("");
    setOrderNumber("");
  }

  return (
    <MainContainer>
      <form onSubmit={handleSubmit}>
        <p>Número do Pedido:</p>
        <input
          type="number"
          placeholder="Preencha aqui!"
          required
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        ></input>
        <p>O que você deseja fazer?</p>
        <div>
          <div>
            <input
              type="radio"
              id="deliver"
              name="action"
              value="deliver"
              onChange={(e) => setAction(e.target.value)}
            ></input>
            <label for="deliver">Concluir entrega</label>
          </div>
          <div>
            <input
              type="radio"
              id="delay"
              name="action"
              value="delay"
              onChange={(e) => setAction(e.target.value)}
            ></input>
            <label for="delay">Remarcar entrega</label>
          </div>
        </div>
        <input
          type="datetime-local"
          placeholder="Preencha aqui!"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          hidden={action === "delay" ? false : true}
        ></input>
        <button type="submit" disabled={loading ? true : false}>
          {loading ? "Loading..." : "Enviar"}
        </button>
      </form>
    </MainContainer>
  );
}
