import React from "react";
import { Button, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const DeleteBtn = ({ data = (values?: any) => {} }) => {
  const [visible, setVisible] = React.useState(false);
  const [editVisible, setEditVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showEditModal = () => {
    setEditVisible(true);
  };

  const editHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setEditVisible(false);
        data(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const editHandleCancel = () => {
    setEditVisible(false);
  };

  return (
    <>
      <Button onClick={showModal}>
        <DeleteOutlined />
      </Button>
      <Button type="primary" onClick={showEditModal}>
        <EditOutlined />
      </Button>
      <Modal
        title={"O'chirish"}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"o'chirish"}
        okType={"danger"}
        cancelText={"bekor qilish"}
      >
        <h2>Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz?</h2>
        <p>
          Agar siz ushbu ma'lumotlarni o'chirib tashlasangiz, qayta tiklanmaydi
        </p>
      </Modal>
      <Modal
        title={"Tahrirlash"}
        visible={editVisible}
        onOk={editHandleOk}
        onCancel={editHandleCancel}
        okText={"tahrirlash"}
        cancelText={"bekor qilish"}
      >
        <Form
          form={form}
          layout="vertical"
          name="name"
          initialValues={{
            modifier: "public",
          }}
        >
          <FieldHelpers
            label="Nom Uz"
            name="name"
            message="Iltimos Nom Uz qatorini to'ldiring!"
          />
          <FieldHelpers
            label="Nom Ru"
            name="nameRu"
            message="Iltimos Nom Ru qatorini to'ldiring!"
          />
        </Form>
      </Modal>
    </>
  );
};

export const FieldHelpers = ({
  label='',
  name='',
  required = true,
  message='',
  inp = true,
  type = 'text',
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: message,
        },
      ]}
    >
      {inp ? <Input type={type} /> : <Input.Password />}
      
    </Form.Item>
  );
};