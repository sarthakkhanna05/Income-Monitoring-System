import axios from "axios";
import "dotenv/config";

export const SignUpApi = async (data) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const response = await axios.post(`/api/auth/SignUp`, data, config);
  return response;
};
