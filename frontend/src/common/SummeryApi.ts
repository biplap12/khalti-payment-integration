export const baseURL = "http://localhost:5000";

const SummaryApi = {
  register: {
    url: "/api/auth/register",
    method: "post",
  },
  login: {
    url: "/api/auth/login",
    method: "post",
  },
  me: {
    url: "/api/auth/me",
    method: "get",
  },
  khaltiInitiate: {
    url: "/api/khalti/initiate",
    method: "post",
  },
  products: {
    url: "/api/products",
    method: "get",
  },
  orders: {
    url: "/api/orders",
    method: "get",
  },
  khaltiVerify: {
    url: "/api/khalti/verify",
    method: "get",
  },
  logout: {
    url: "/api/auth/logout",
    method: "post",
  },
};
export default SummaryApi;
