import axios from "axios";

const url = "http://127.0.0.1:4000";

async function postOrder(order, setLoading) {
  setLoading(true);
  try {
    await axios.post(`${url}/order`, order);
    alert("Enviado com sucesso!");
    setLoading(false);
  } catch (error) {
    alert("Algo deu errado!");
    setLoading(false);
  }
}

async function deliverOrder(orderId, setLoading) {
  setLoading(true);
  try {
    const order = await axios.get(`${url}/order/${orderId}`);
    console.log(order);
    if (!order[0].id) {
      throw new Error("número de pedido inválido");
    }
    await axios.put(`${url}/delivered/${order[0].id}`);
    alert("Pedido entregue com suceso!");
    setLoading(false);
  } catch (error) {
    if (error.response.data.message === "No result for this search!") {
      alert("Pedido já foi remarcado/entregue ou não existe");
    }
    if (error.response.data.name === "InvalidInputError") {
      alert(error.response.data.message);
    }
    setLoading(false);
  }
}

async function delayOrder(orderId, setLoading, date) {
  setLoading(true);
  try {
    const order = await axios.get(`${url}/order/${orderId}`);
    if (!order || order.data[0]?.id === undefined) {
      throw new Error("número de pedido inválido");
    }
    await axios.put(`${url}/delay/${order.data[0].id}?newDate=${date}`);
    alert("Pedido remarcado com suceso!");
    setLoading(false);
  } catch (error) {
    if (error.response.data.message === "No result for this search!") {
      alert("Pedido já foi remarcado/entregue ou não existe");
    }
    if (error.response.data.name === "InvalidInputError") {
      alert(error.response.data.message);
    }
    console.log(error.response);
    setLoading(false);
  }
}

const service = {
  postOrder,
  deliverOrder,
  delayOrder,
};

export default service;
