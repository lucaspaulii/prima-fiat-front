import axios from "axios";

const url = "https://primafiat.onrender.com";

async function getOrder(setLoading) {
  setLoading(true);
  try {
    const orders = await axios.get(`${url}/orders`);
    setLoading(false);
    return orders.data;
  } catch (error) {
    if (error.response.status === 404) {
      setLoading("Não há entregas para hoje!");
    } else {
      alert("Algo deu errado!");
      setLoading(false);
    }
  }
}

const service = {
  getOrder,
};

export default service;
