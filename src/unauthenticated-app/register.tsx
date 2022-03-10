import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";
import { Longbutton } from "unauthenticated-app";
export const RegisterScreen = () => {
  const { register, user } = useAuth();

  // 点击提交按钮事件
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Longbutton htmlType={"submit"} type="primary">
          注册
        </Longbutton>
      </Form.Item>
    </Form>
  );
};
