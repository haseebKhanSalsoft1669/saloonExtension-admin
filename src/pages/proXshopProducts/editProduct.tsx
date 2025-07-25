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
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useGetAllCategoriesQuery } from '../../redux/services/categorySlice';
import { useAddProductMutation } from '../../redux/services/productSlice';

const { Title } = Typography;
const { TextArea } = Input;


const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const [form] = Form.useForm();

  const handleSave = () => {
    form.submit();
  };

  const handleCancel = () => setIsModalVisible(false);

  const [addProduct, { isLoading }] = useAddProductMutation()
  const { data: categoryData } = useGetAllCategoriesQuery({})

  const categories = categoryData?.categories?.map((category: any) => ({
    label: category.name,
    value: category._id,
  }))

  const onFinish = async (values: any) => {
    // console.log('Form Values:', values);
    // console.log('Uploaded Images:', fileList);

    const formData = new FormData();

    // Append form fields
    Object.entries(values).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    });

    // Append uploaded images
    fileList.forEach((file) => {
      formData.append('image', file.originFileObj);
    });


    try {
      const response: any = await addProduct(formData)
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: response?.data?.message || "Operation completed successfully!",
          text: "Thank You!",
        })
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

      <div style={{ backgroundColor: "rgba(128, 128, 128, 0.20)", padding: "10px", borderRadius: "8px" }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>

          {/* Form Section */}
          <Row gutter={24}>
            <Col xs={24} lg={16}>
              <div className="form-section">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="name" label="Product Name">
                      <Input defaultValue="Raw Bundles 20" className="custom-input" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="length" label="Length">
                      <Input type='number' defaultValue="0" className="custom-input" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="description" label="Product Description">
                      <TextArea rows={7} placeholder="Enter Product Description" className="custom-textarea" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item name="color" label="Color">
                          <Input placeholder="Enter color" className="custom-input" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="price" label="Price">
                          <Input defaultValue="$189.00" className="custom-input" />
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
                  </Col>


                  <Col span={12}>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item name="discountPrice" label="Discount Price">
                          <Input placeholder="$0.00" className="custom-input" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="addTax" valuePropName="checked">
                          <Checkbox className="custom-checkbox">Add tax for this product</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  {/* <Col span={12}>
                    <Form.Item name="sku" label="SKU">
                      <Input placeholder="Enter SKU" className="custom-input" />
                    </Form.Item>
                  </Col> */}
                  <Col span={12}>
                    <Form.Item name="stock" label="Product stock">
                      <Input type='number' placeholder="Enter Stock" className="custom-input" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="weight" label="Weight">
                      <Input type='number' placeholder="Enter Weight" className="custom-input" />
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
                <Form.Item name="categoryId" label="Categories" >
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
            <Button loading={isLoading} disabled={isLoading} type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>

      </div>
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
