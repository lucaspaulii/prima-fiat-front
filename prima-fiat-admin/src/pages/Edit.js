import { useEffect, useState } from "react";
import { MainContainer } from "./Main.js";

export default function Edit(params) {
  const [action, setAction] = useState(undefined);
  const [deliveryDate, setDeliveryDate] = useState(undefined);
  const [orderNumber, setOrderNumber] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(action);
  }, [action]);

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
        <button type="submit" disabled={loading ? true : false}>{loading ? true : "Enviar"}</button>
      </form>
    </MainContainer>
  );
}
