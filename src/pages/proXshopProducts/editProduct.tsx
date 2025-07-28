import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  Upload
} from 'antd';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useGetAllCategoriesQuery } from '../../redux/services/categorySlice';
import { useAddProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from '../../redux/services/productSlice';
import { UPLOADS_URL } from '../../constants/api';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;


const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const id = useParams().id

  const { data: productData, isLoading: isProductLoading } = useGetProductByIdQuery({ id }, { skip: !id })
  const [updateProduct, { isLoading: isUpdateLoading }] = useUpdateProductMutation()
  const [addProduct, { isLoading }] = useAddProductMutation()
  const { data: categoryData } = useGetAllCategoriesQuery({})


  const [removedImages, setRemovedImages] = useState<string[]>([]);


  const handleSave = () => {
    form.submit();
  };

  const handleCancel = () => setIsModalVisible(false);

  const categories = categoryData?.categories?.map((category: any) => ({
    label: category.name,
    value: category._id,
  }))
  const onFinish = async (values: any) => {

    const formData = new FormData();

    // Append form fields
    Object.entries(values).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        formData.append(`${key}`, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    // Append uploaded images
    fileList.forEach((file) => {
      formData.append('image', file.originFileObj);
    });

    if (removedImages.length > 0) {
      removedImages.forEach((image) => {
        formData.append('removedImages', image);
      });
    }

    // // show form data map on it
    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });



    try {
      const response: any = id ? await updateProduct({ id, body: formData }) : await addProduct(formData)
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Operation completed successfully!",
          text: "Thank You!",
        })
        navigate('/product-management')
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response?.error?.data?.message || response?.error?.data?.errors[0].msg || "Something went wrong!",
        })
      }
    } catch (error: any) {
      console.log("🚀 ~ onFinish ~ error:", error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data?.message || "Something went wrong!",
      })

    }

  };

  const handleRemoveImage = (path: string) => {
    setRemovedImages(prev => [...prev, path]);
  };


  return (
    <div className="page-container">
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <ArrowLeft
              onClick={() => navigate('/product-management')}
              style={{ cursor: 'pointer', color: 'var(--text-primary)' }}
            />
            <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>
              Add Product
            </Title>
          </Space>
        </Col>
      </Row>

      {isProductLoading ? <div>Loading...</div> :
        <div style={{ backgroundColor: "rgba(128, 128, 128, 0.20)", padding: "10px", borderRadius: "8px" }}>
          <Form form={form} initialValues={productData} layout="vertical" onFinish={onFinish}>

            {/* Form Section */}
            <Row gutter={24}>
              <Col xs={24} lg={16}>
                <div className="form-section">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="name" label="Product Name">
                        <Input defaultValue={""} className="custom-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="length" label="Length">
                        <Input type='number' defaultValue={0} className="custom-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="description" label="Product Description">
                        <TextArea rows={7} defaultValue={""} placeholder="Enter Product Description" className="custom-textarea" />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item name="color" label="Color">
                            <Input defaultValue={""} placeholder="Enter color" className="custom-input" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item name="price" label="Price">
                            <Input defaultValue={0} className="custom-input" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <label>Images</label>
                      <Upload.Dragger
                        className="custom-uploader"
                        maxCount={10}
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                        beforeUpload={() => false}
                      >
                        <p className="ant-upload-drag-icon">
                          <UploadCloud size={24} />
                        </p>
                        <p className="ant-upload-text">Drag & Drop or Click to Upload</p>
                      </Upload.Dragger>


                      {productData?.images?.map((imgPath: string, index: number) => (
                        removedImages.includes(imgPath) ? null :
                          <div
                            key={index}
                            style={{
                              position: 'relative',
                              display: 'inline-block',
                              marginRight: 10,
                              marginBottom: 10,
                            }}
                          >
                            <img
                              crossOrigin='anonymous'
                              src={UPLOADS_URL + imgPath}
                              alt={`img-${index}`}
                              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                            />
                            <DeleteOutlined
                              onClick={() => handleRemoveImage(imgPath)}
                              style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                color: 'red',
                                fontSize: 16,
                                background: '#fff',
                                borderRadius: '50%',
                                padding: 4,
                                cursor: 'pointer',
                                boxShadow: '0 0 4px rgba(0,0,0,0.3)',
                              }}
                            />
                          </div>
                      ))}
                    </Col>




                    <Col span={12}>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item name="discountPrice" label="Discount Price">
                            <Input type='number' defaultValue={0} className="custom-input" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="stock" label="Product stock">
                        <Input type='number' defaultValue={1} placeholder="Enter Stock" className="custom-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="weight" label="Weight">
                        <Input type='number' defaultValue={0} placeholder="Enter Weight" className="custom-input" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="xpro" valuePropName="checked">
                        <Checkbox className="custom-checkbox">Add this product in ProXshop</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col xs={24} lg={8}>
                <div className="sidebar-section">
                  <Form.Item name="categoryId" label="Categories" initialValue={productData?.category || []}>
                    <Checkbox.Group
                      className="custom-checkbox-group"
                      options={categories}
                    />
                  </Form.Item>
                  <div style={{ marginTop: 8 }}>
                    <a onClick={() => navigate('/add-categories')}>Create New</a>
                  </div>
                </div>

                <div className="tag-section">
                  <Form.Item name="tags" label="Tags" initialValue={['Hair Tie', 'Extensions', 'Hair Extensions clip']}>
                    <Select
                      mode="tags"
                      style={{ width: '100%', height: "auto" }}
                      placeholder="Enter tag name"
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>



            {/* Save Button */}
            <div className="footer-save-button">
              <Button loading={isLoading || isUpdateLoading} disabled={isLoading || isUpdateLoading} type="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Form>

        </div>
      }

      {/* Save Confirmation Modal */}
      <Modal
        title="Confirm Save Changes"
        open={isModalVisible}
        onCancel={handleCancel}
        // onOk={handleConfirm}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to save these changes?</p>
        <p>Changes will be applied and you'll be redirected to the products page.</p>
      </Modal>
    </div>
  );
};

export default EditProduct;
