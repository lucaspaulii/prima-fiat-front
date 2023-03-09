import axios from "axios";

const url = "http://127.0.0.1:4000";

async function getOrder(setLoading) {
  setLoading(true);
  try {
    const orders = await axios.get(`${url}/orders`);
    setLoading(false);
    return orders.data;
  } catch (error) {
    alert("Algo deu errado!");
    setLoading(false);
  }
}

const service = {
  getOrder,
};

export default service;
