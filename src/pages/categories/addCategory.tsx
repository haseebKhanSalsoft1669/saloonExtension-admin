import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  Spin
} from 'antd';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation
} from '../../redux/services/categorySlice';
import Swal from 'sweetalert2';

const { Title } = Typography;

const AddCategory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [form] = Form.useForm();
  const { data: categoryData, isLoading: categoryLoading } = useGetCategoryByIdQuery({ id }, { skip: !isEditMode });

  const [addCategory, { isLoading: adding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (isEditMode && categoryData) {
      form.setFieldsValue({
        name: categoryData?.name || '',
        description: categoryData?.description || '',
      });
    }
  }, [categoryData, isEditMode, form]);

  const handleSaveClick = () => {
    form.submit();
  };

  const onFinish = async (values: any) => {
    try {
      const response: any = isEditMode
        ? await updateCategory({ id, values })
        : await addCategory(values);

      if (response?.data?.success) {
        Swal.fire({
          icon: 'success',
          title: response?.data?.message || 'Success!',
          text: 'Thank you!',
        });
        navigate('/categories');
      } else {
        throw response?.error || {};
      }
    } catch (error: any) {
      console.error("❌ Error in onFinish:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.data?.message || 'Something went wrong!',
      });
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <ArrowLeft
              onClick={() => navigate('/categories')}
              style={{
                cursor: 'pointer',
                color: 'var(--text-primary)',
              }}
            />
            <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>
              {isEditMode ? 'Edit Category' : 'Add Category'}
            </Title>
          </Space>
        </Col>
      </Row>

      {/* Form */}
      {categoryLoading && isEditMode ? (
        <Spin />
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={24}>
            <Col xs={24} md={16} lg={12}>
              <Form.Item
                name="name"
                label="Category Name"
                rules={[{ required: true, message: 'Please enter a category name' }]}
              >
                <Input placeholder="Name here" />
              </Form.Item>

              <Form.Item name="description" label="Category Description">
                <Input placeholder="Description here" />
              </Form.Item>

              <Button
                type="primary"
                onClick={handleSaveClick}
                loading={adding || updating}
                disabled={adding || updating}
              >
                {isEditMode ? 'Update Category' : 'Add Category'}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default AddCategory;
