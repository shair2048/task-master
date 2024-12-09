import axios from "axios";
// import NetInfo from "@react-native-community/netinfo";

// NetInfo.fetch().then((state) => {
//   if (state.type === "wifi" && state.details && state.details.ipAddress) {
//     console.log("Địa chỉ IP:", state.details.ipAddress);
//   } else {
//     console.log("Không phải kết nối Wi-Fi hoặc không có IP");
//   }
// });

const api = axios.create({
  baseURL: "http://192.168.1.89:3000/api",
  timeout: 5000,
});

export default api;
