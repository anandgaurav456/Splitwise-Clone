import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:1234/",
  // baseURL: "http://192.168.0.107:1234/",
  timeout: 4000,
});

// export default function setAuthorizationToken(token) {
//   if (token) {
//     instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete instance.defaults.headers.common["Authorization"];
//   }
// }
