import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  Spin,
  Checkbox,
  Upload
} from 'antd';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { UploadFile, RcFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { UPLOADS_URL} from '../../constants/api';
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addCategory, { isLoading: adding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();

  // useEffect(() => {
  //   if (isEditMode && categoryData) {
  //     form.setFieldsValue({
  //       name: categoryData?.name || '',
  //       description: categoryData?.description || '',
  //     });
  //   }
  // }, [categoryData, isEditMode, form]);


  useEffect(() => {
  if (isEditMode && categoryData) {
    form.setFieldsValue({
      name: categoryData?.name,
      description: categoryData?.description,
    });

    if (categoryData.category_image) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: UPLOADS_URL + categoryData.category_image, // 👈 backend URL
        },
      ]);
    }
  }
}, [categoryData, isEditMode, form]);
  const handleSaveClick = () => {
    form.submit();
  };

  interface CategoryFormValues {
    name: string;
    category_image: string;
    description?: string;
    xpro?: boolean;
  }

const props = {
  beforeUpload: (file: RcFile) => {
    const previewUrl = URL.createObjectURL(file as unknown as Blob);
    const newFile: UploadFile = {
      uid: file.uid,
      name: file.name,
      status: "done",
      url: previewUrl,
      originFileObj: file,
    };
    setFileList([newFile]);
    return false; // prevent auto upload
  },
  onRemove: () => {
    setFileList([]);
    return true;
  },
  fileList,
  accept: "image/*",
  maxCount: 1,
  listType: "picture-card" as const,
};
  const onFinish = async (values: CategoryFormValues) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      if (values.description) formData.append('description', values.description);
      if (typeof values.xpro !== 'undefined') formData.append('xpro', String(values.xpro));

      if (fileList.length > 0) {
        const file = fileList[0].originFileObj as File | undefined;
        if (file) {
          formData.append('category_image', file);
        }
      }

      const response = isEditMode
        ? await updateCategory({ id, body: formData })
        : await addCategory(formData);

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
    } catch (error: unknown) {
      console.error("❌ Error in onFinish:", error);
      let errorMessage = 'Something went wrong!';
      interface ErrorWithData {
        data?: {
          message?: string;
        };
      }
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as ErrorWithData).data?.message === 'string'
      ) {
        errorMessage = (error as ErrorWithData).data!.message!;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
    }
  };


  console.log({fileList});


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
        <Form form={form} initialValues={categoryData} layout="vertical" onFinish={onFinish}>
          <Row gutter={24}>
            <Col xs={24} md={16} lg={12}>
              <Form.Item name="xpro" valuePropName="checked">
                <Checkbox className="custom-checkbox big-checkbox">Add this product in ProXshop</Checkbox>
              </Form.Item>
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

              <Form.Item name="category_image" label="Category Image">
                <Upload {...props}>
                  {fileList.length === 0 && (
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  )}
                </Upload>
              </Form.Item>

              {/* {fileList.length > 0 && fileList[0]?.url && (
                <div style={{ marginBottom: 16 }}>
                  <img
                    src={fileList[0].url}
                    alt="Preview"
                    style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #f0f0f0' }}
                  />
                </div>
              )} */}

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
