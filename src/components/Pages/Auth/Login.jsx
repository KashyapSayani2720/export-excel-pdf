import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import AuthScreenWrapper from "./AuthScreenWrapper";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <AuthScreenWrapper>
      <Card
        title="Log in"
        styles={{
          header: {
            textAlign: "center",
            fontSize: 26,
          },
        }}
      >
        <Form
          style={{ width: "600px" }}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[
              {
                type: "email",
                message: "Please enter valid email!",
              },
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
          >
            <Input.Password type="password" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className="login-form-forgot" to={"/forgot-password"}>
              Forgot password
            </Link>
          </Form.Item>

          <div className="mt-2 v-h-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </div>
          <div className="mt-4 v-h-center">
            Do not have an account? Go to{" "}
            <Link to={"/register"}> Register</Link>
          </div>
        </Form>
      </Card>
    </AuthScreenWrapper>
  );
};

export default Login;
