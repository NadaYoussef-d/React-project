import axios from "axios";

export async function GetAllCategoryItems() {
  const cats = await axios.get("http://localhost:3002/category");
  return cats;
}
