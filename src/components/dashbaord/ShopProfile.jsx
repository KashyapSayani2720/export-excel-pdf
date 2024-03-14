import React, { useState } from "react";

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
} from "antd";

const items = [
  {
    title: "Home",
  },
  {
    title: <a href="">List</a>,
  },
  {
    title: "Shop Profiles",
  },
];

const mockData = [
  {
    shopProfileName: "Shop1",
    apiKey: "api_key_1",
    apiSecret: "api_secret_1",
    shopURL: "https://shop1url.com",
    token: "token_1",
  },
  {
    shopProfileName: "Shop2",
    apiKey: "api_key_2",
    apiSecret: "api_secret_2",
    shopURL: "https://shop2url.com",
    token: "token_2",
  },
  {
    shopProfileName: "Shop3",
    apiKey: "api_key_3",
    apiSecret: "api_secret_3",
    shopURL: "https://shop3url.com",
    token: "token_3",
  },
  {
    shopProfileName: "Shop4",
    apiKey: "api_key_4",
    apiSecret: "api_secret_4",
    shopURL: "https://shop4url.com",
    token: "token_4",
  },
  {
    shopProfileName: "Shop5",
    apiKey: "api_key_5",
    apiSecret: "api_secret_5",
    shopURL: "https://shop5url.com",
    token: "token_5",
  },
  {
    shopProfileName: "Shop6",
    apiKey: "api_key_6",
    apiSecret: "api_secret_6",
    shopURL: "https://shop6url.com",
    token: "token_6",
  },
  {
    shopProfileName: "Shop7",
    apiKey: "api_key_7",
    apiSecret: "api_secret_7",
    shopURL: "https://shop7url.com",
    token: "token_7",
  },
  {
    shopProfileName: "Shop8",
    apiKey: "api_key_8",
    apiSecret: "api_secret_8",
    shopURL: "https://shop8url.com",
    token: "token_8",
  },
  {
    shopProfileName: "Shop9",
    apiKey: "api_key_9",
    apiSecret: "api_secret_9",
    shopURL: "https://shop9url.com",
    token: "token_9",
  },
  {
    shopProfileName: "Shop10",
    apiKey: "api_key_10",
    apiSecret: "api_secret_10",
    shopURL: "https://shop10url.com",
    token: "token_10",
  },
];

const ShopProfileCard = ({
  shopProfileName,
  shopURL,
  apiKey,
  apiSecret,
  token,
}) => {
  return (
    <Card
      className="flex-fill"
      styles={{
        body: {
          padding: 10,
        },
      }}
    >
      <div className="d-flex gap-3">
        <Image
          preview={false}
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
          src="https://dummyimage.com/600x600/000/fff&text=shop+image"
        />
        <div className="d-flex flex-column gap-1">
          <strong className="mb-0 ">{shopProfileName}</strong>
          <p className="mb-0 shop-profile-detail-font">{shopURL}</p>
          <p className="mb-0 shop-profile-detail-font">{apiKey}</p>
          <p className="mb-0 shop-profile-detail-font">{apiSecret}</p>
          <p className="mb-0 shop-profile-detail-font">{token}</p>
        </div>
      </div>
    </Card>
  );
};

const AddProfile = ({ isModalOpen, handleCancel, handleAddProfile }) => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  return (
    <Modal
      title="Create New Profile"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={"60%"}
    >
      <div>
        <Form
          key={"add profile"}
          {...formItemLayout}
          name="shopForm"
          initialValues={{ remember: true }}
          onFinish={handleAddProfile}
        >
          <div className="d-flex gap-3">
            <div className="w-100">
              <Form.Item
                label="API Key"
                name="apiKey"
                // rules={[
                //   { required: true, message: "Please input your API key!" },
                // ]}
              >
                <Input placeholder="Enter" />
              </Form.Item>

              <Form.Item
                label="API Secret"
                name="apiSecret"
                // rules={[
                //   { required: true, message: "Please input your API secret!" },
                // ]}
              >
                <Input placeholder="Enter" />
              </Form.Item>
            </div>
            <div className="w-100">
              <Form.Item
                label="Shop URL"
                name="shopURL"
                // rules={[
                //   { required: true, message: "Please input your shop URL!" },
                // ]}
              >
                <Input placeholder="Enter" />
              </Form.Item>

              <Form.Item
                label="Token"
                name="token"
                // rules={[{ required: true, message: "Please input your token!" }]}
              >
                <Input placeholder="Enter" />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <Button
              type="default"
              danger
              htmlType="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
const ShopProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddProfile = () => {};
  return (
    <div>
      <div className="dashboard-content-box">
        <div className="content-container">
          <div className="breadcrum-box">
            <div>
              <Breadcrumb items={items} />
            </div>
            <div className="active-breadcrum">Profile</div>
          </div>
          <div className="content-box">
            <Card
              title="User Profiles"
              extra={
                <Button type="primary" onClick={showModal}>
                  Create New
                </Button>
              }
            >
              <div className="d-flex flex-wrap gap-2 p-3 justify-content-start">
                {mockData.map((data) => (
                  <ShopProfileCard {...data} />
                ))}
              </div>
            </Card>

            <AddProfile
              handleAddProfile={handleAddProfile}
              handleCancel={handleCancel}
              isModalOpen={isModalOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
