import { Button, Card, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import AuthScreenWrapper from "./AuthScreenWrapper";

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <AuthScreenWrapper>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: "600px" }}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
      >
        <Card
          title="Forgot Password?"
          styles={{
            header: {
              textAlign: "center",
              fontSize: 26,
            },
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className="v-h-center">
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </div>
          <p className="text-center mt-3">
            Go to back{" "}
            <Link to={"/login"}>
              <strong>Login</strong>
            </Link>
          </p>
        </Card>
      </Form>
    </AuthScreenWrapper>
  );
};

export default ForgotPassword;
