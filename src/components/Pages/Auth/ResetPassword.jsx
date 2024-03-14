import React from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthScreenWrapper from "./AuthScreenWrapper";

const ResetPassword = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <AuthScreenWrapper>
      <Card
        title="Reset Password"
        styles={{
          header: {
            textAlign: "center",
            fontSize: 26,
          },
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          style={{ width: "600px" }}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              {
                required: true,
                message: "Please input your Old Password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your New Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("oldPassword") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The new password that you entered should not match to Old Password!"
                    )
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="v-h-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Confirm
            </Button>
          </div>
        </Form>
      </Card>
    </AuthScreenWrapper>
  );
};

export default ResetPassword;
