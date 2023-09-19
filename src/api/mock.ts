import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

export default function applyMockAdapter(axiosInstance: AxiosInstance) {
  const validCredentials = {
    username: "admin",
    password: "password123",
  };
  const mock = new MockAdapter(axiosInstance);

  mock.onPost("api/login").reply((config) => {
    const requestData = JSON.parse(config.data);
    if (
      requestData.username === validCredentials.username &&
      requestData.password === validCredentials.password
    ) {
      return [200, { message: "Login successful" }];
    } else {
      return [401, { message: "Invalid username or password" }];
    }
  });
}
