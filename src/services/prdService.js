import axios from "axios";

export async function GetAllProducts() {
  const prods = await axios.get("http://localhost:3002/products");
  return prods;
}
