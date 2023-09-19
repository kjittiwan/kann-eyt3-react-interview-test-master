import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../Store/store";
import { loginUser } from "../Store/userSlice";

type FieldType = {
  username: string;
  password: string;
};

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const handleLogin = async (values: FieldType) => {
    try {
      const response = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(response)) {
        const res = response.payload;
        if (res) {
          navigate(`/${res.username}/dashboard`);
          console.log("res.payload", res);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="main-container-home">
      <div className="mock-credentials">
        <h3>Mock Credentials</h3>
        <p>Username: admin</p>
        <p>Password: password123</p>
      </div>
      <div className="content-container">
        <h1 className="title">Log In</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          autoComplete="off"
          className="Form"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            validateStatus={user.error ? "error" : ""}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            validateStatus={user.error ? "error" : ""}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="Form-Button">
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
        {user.error && <div className="error-message">{user.error}</div>}
      </div>
    </div>
  );
}
