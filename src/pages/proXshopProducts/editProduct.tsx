/* eslint-disable */
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
import { ArrowLeft, UploadCloud, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import QuillEditor from '../../components/quillEditor';
import { UPLOADS_URL } from '../../constants/api';
import { useGetAllCategoriesQuery } from '../../redux/services/categorySlice';
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation
} from '../../redux/services/productSlice';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const xproValue = Form.useWatch("xpro", form);
  const id = useParams().id;

  const { data: productData, isLoading: isProductLoading } = useGetProductByIdQuery({ id }, { skip: !id });
  const [updateProduct, { isLoading: isUpdateLoading }] = useUpdateProductMutation();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { data: categoryData } = useGetAllCategoriesQuery({ xpro: xproValue || false });

  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const handleSave = () => {
    form.submit();
  };

  const handleCancel = () => setIsModalVisible(false);

  const categories = categoryData?.categories?.map((category: any) => ({
    label: category.name,
    value: category._id
  }));

  // const onFinish = async (values: any) => {
  //   console.log("🚀 ~ onFinish ~ values:", values)
  //   // console.log("🚀 ~ onFinish ~ values:", values)
  //   const formData = new FormData();
  //   Object.entries(values).forEach(([key, value]: any) => {
  //     if (key === 'variants') {
  //       // Always stringify variants array
  //       formData.append('variants', JSON.stringify(value));
  //     } else if (Array.isArray(value)) {
  //       value.forEach((item) => formData.append(`${key}[]`, item));
  //     } else {
  //       formData.append(key, value);
  //     }
  //   });


  //   Object.entries(values).forEach(([key, value]: any) => {
  //     if (key === 'variants') {
  //       value.forEach((variant: any, index: number) => {
  //         // Append images directly from originFileObj
  //         if (Array.isArray(variant.images)) {
  //           variant.images.forEach((file: any) => {
  //             if (file.originFileObj) {
  //               formData.append(`variantImages[${index}][]`, file.originFileObj);
  //             }
  //           });
  //         }
  //       });
  //     } else if (Array.isArray(value)) {
  //       value.forEach((item) => formData.append(`${key}[]`, item));
  //     } else {
  //       formData.append(key, value);
  //     }
  //   });
  //   // fileList.forEach((file) => {
  //   //   formData.append('image', file.originFileObj);
  //   // });

  //   if (removedImages.length > 0) {
  //     removedImages.forEach((image) => {
  //       formData.append('removedImages', image);
  //     });
  //   }

  //   // show form data
  //   for (const pair of formData.entries()) {
  //     console.log(pair[0] + ', ' + pair[1]);
  //   }

  //   try {
  //     const response: any = id ? await updateProduct({ id, body: formData }) : await addProduct(formData);
  //     if (response?.data?.success) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: response?.data?.message || 'Operation completed successfully!',
  //         text: 'Thank You!'
  //       });
  //       navigate('/product-management');
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: response?.error?.data?.message || response?.error?.data?.errors[0].msg || 'Something went wrong!'
  //       });
  //     }
  //   } catch (error: any) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: error?.data?.message || 'Something went wrong!'
  //     });
  //   }



  // };


  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Append non-array fields
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("detail", values.detail);
    formData.append("information", values.information);
    formData.append("xpro", values.xpro || false);
    formData.append("points", values.points);
    formData.append("categoryId", values.categoryId || []);

    // Append categories
    (values.categoryId || []).forEach((catId: string) => {
      formData.append("category[]", catId);
    });


    values.variants.forEach((variant: any, variantIndex: any) => {
      // Append normal fields
      formData.append(`variants[${variantIndex}][price]`, variant.price);
      formData.append(`variants[${variantIndex}][discountPrice]`, variant.discountPrice);
      formData.append(`variants[${variantIndex}][length]`, variant.length);
      formData.append(`variants[${variantIndex}][weight]`, variant.weight);
      formData.append(`variants[${variantIndex}][stock]`, variant.stock);
       formData.append(`variants[${variantIndex}][colors]`, variant.colors ? JSON.stringify(variant.colors) : []);
      //formData.append(`variants[${variantIndex}][colors]`, variant.colors);
      formData.append(`variants[${variantIndex}][size]`, variant.size);

      // Append images
      variant.images?.forEach((file: any, fileIndex: any) => {
        formData.append(`variants[${variantIndex}][${fileIndex}]`, file.originFileObj);
      });
    });

    // Append removed images
    // removedImages.forEach((item: any) => {
    //   formData.append(`removedImages[${item.variantIndex}][${item.imageIndex}]`, item.path);
    // });

    if (removedImages?.length > 0) {
        formData.append('removedImages', JSON.stringify(removedImages));
    }


    try {
      const response: any = id
        ? await updateProduct({ id, body: formData })
        : await addProduct(formData);

      if (response?.data?.success) {
        Swal.fire({
          icon: 'success',
          title: response?.data?.message || 'Operation completed successfully!',
          text: 'Thank You!'
        });
        navigate('/product-management');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:
            response?.error?.data?.message ||
            response?.error?.data?.errors[0].msg ||
            'Something went wrong!'
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.data?.message || 'Something went wrong!'
      });
    }


  };

  const handleRemoveImage = (variantIndex: number, imageIndex: number, path: string) => {
    setRemovedImages((prev: any) => [...prev, { variantIndex, imageIndex, path }]);
  };

  return (
    <div className="page-container">
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <ArrowLeft onClick={() => navigate('/product-management')} style={{ cursor: 'pointer', color: 'var(--text-primary)' }} />
            <Title level={3} style={{ margin: 0, color: 'var(--text-primary)' }}>Add Product</Title>
          </Space>
        </Col>
      </Row>

      {isProductLoading ? <div>Loading...</div> : (
        <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.20)', padding: '10px', borderRadius: '8px' }}>
          <Form form={form} initialValues={productData} layout="vertical" onFinish={onFinish}>
            <Row gutter={24}>
              <Col xs={24} lg={16}>
                <div className="form-section">
                  <Form.Item name="xpro" valuePropName="checked">
                    <Checkbox className="custom-checkbox big-checkbox">Add this product in ProXshop</Checkbox>
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}><Form.Item name="name" label="Product Name"><Input className="custom-input" /></Form.Item></Col>
                    <Col span={12}><Form.Item name="information" label="Information"><Input className="custom-input" /></Form.Item></Col>

                      <Col xs={24} lg={18}>
                <Form.Item name="points" label="Product Points">
                            <Input type='number' placeholder="Enter Product Points" className="custom-input" />
                          </Form.Item>
</Col>

                    <Col span={12}><Form.Item name="description" label="Product Description"><TextArea rows={10} placeholder="Enter Product Description" className="custom-textarea" /></Form.Item></Col>
                    <Col span={12}><Form.Item name="detail" getValueFromEvent={(content) => content} label="Product Details"><QuillEditor /></Form.Item></Col>



                    <Form.List name="variants">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div
                              key={key}
                              className="repeat-form"
                              style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, marginBottom: 16 }}
                            >
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Form.Item {...restField} name={[name, "price"]} label="Price">
                                    <Input type="number" defaultValue={0} className="custom-input" />
                                  </Form.Item>
                                </Col>

                                <Col span={12}>
                                  <Form.Item {...restField} name={[name, "discountPrice"]} label="Discount Price">
                                    <Input type="number" defaultValue={0} className="custom-input" />
                                  </Form.Item>
                                </Col>

                                <Col span={12}>
                                  <Form.Item {...restField} name={[name, "length"]} label="Length">
                                    <Input type="number" defaultValue={0} />
                                  </Form.Item>
                                </Col>

                                <Col span={12}>
                                  <Form.Item {...restField} name={[name, "stock"]} label="Product Stock">
                                    <Input type="number" defaultValue={0} />
                                  </Form.Item>
                                </Col>

                                <Col span={24}>
                                  <Form.Item {...restField} name={[name, "weight"]} label="Weight">
                                    <Input type="number" defaultValue={0} />
                                  </Form.Item>
                                </Col>

                                {/* Images field stored in this variant */}
                                <Col span={24}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "images"]}
                                    label="Images"
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => e.fileList}
                                  >
                                    <Upload.Dragger
                                      className="custom-uploader"
                                      maxCount={10}
                                      beforeUpload={() => false}
                                      listType="picture-card"
                                    >
                                      <p className="ant-upload-drag-icon">
                                        <UploadCloud size={24} />
                                      </p>
                                      <p className="ant-upload-text">Drag & Drop or Click to Upload</p>
                                    </Upload.Dragger>
                                  </Form.Item>

                                  {productData?.variants[key].varationImage?.map((imgPath: string, index: number) =>
                                    removedImages.some((r: any) => r.variantIndex === key && r.path === imgPath) ? null : (
                                      <div
                                        key={index}
                                        style={{
                                          position: "relative",
                                          display: "inline-block",
                                          marginRight: 10,
                                          marginBottom: 10,
                                        }}
                                      >
                                        <img
                                          crossOrigin="anonymous"
                                          src={UPLOADS_URL + imgPath}
                                          alt={`img-${index}`}
                                          style={{
                                            width: 100,
                                            height: 100,
                                            objectFit: "cover",
                                            borderRadius: 8,
                                          }}
                                        />
                                        <DeleteOutlined
                                          // onClick={() => handleRemoveImage(imgPath)}
                                          onClick={() => handleRemoveImage(key, index, imgPath)}
                                          style={{
                                            position: "absolute",
                                            top: -5,
                                            right: -5,
                                            color: "red",
                                            fontSize: 16,
                                            background: "#fff",
                                            borderRadius: "50%",
                                            padding: 4,
                                            cursor: "pointer",
                                            boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                                          }}
                                        />
                                      </div>
                                    )
                                  )}
                                </Col>

                                <Col span={12}>
                                        <div className="tag-section">
                                          <Form.Item {...restField} name={[name, "colors"]} label="Colors">
                                            <Select style={{ width: "100%" }} placeholder="Select a color">
                                              <Select.Option value="yellow">Yellow</Select.Option>
                                              <Select.Option value="red">Red</Select.Option>
                                              <Select.Option value="green">Green</Select.Option>
                                              <Select.Option value="blue">Blue</Select.Option>
                                              <Select.Option value="black">Black</Select.Option>
                                            </Select>
                                          </Form.Item>
                                        </div>
                                      </Col>

                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "size"]}
                                    label="Size"
                                    rules={[{ required: true, message: "Please select notification type" }]}
                                  >
                                    <Select placeholder="Select type" className="custom-input">
                                      <Option value="S">Small</Option>
                                      <Option value="M">Medium</Option>
                                      <Option value="L">Large</Option>
                                      <Option value="XL">XL</Option>
                                      <Option value="XXL">XXL</Option>
                                    </Select>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Col span={24} style={{ textAlign: "right" }}>
                                <Button
                                  icon={<MinusCircleOutlined />}
                                  danger
                                  onClick={() => remove(name)}
                                  type="dashed"
                                >
                                  Remove Variation
                                </Button>
                              </Col>
                            </div>
                          ))}

                          {/* Points input placed just above the variation button */}
                        

                          <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                              Add Variation
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>

                   
                  </Row>
                </div>
              </Col>


              <Col xs={24} lg={8}>
                <div className="sidebar-section">
                  <Form.Item name="categoryId" label="Categories" initialValue={productData?.category || []}>
                    <Checkbox.Group className="custom-checkbox-group" options={categories} />
                  </Form.Item>
                  <div style={{ marginTop: 8 }}><a onClick={() => navigate('/add-categories')}>Create New</a></div>
                </div>


              </Col>

               
            </Row>

            <div className="footer-save-button">
              <Button loading={isLoading || isUpdateLoading} disabled={isLoading || isUpdateLoading} type="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Form>

        
        </div>
      )}

      <Modal title="Confirm Save Changes" open={isModalVisible} onCancel={handleCancel} okText="Yes" cancelText="No">
        <p></p>
      </Modal>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        closeIcon={<X />}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>

          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
            <rect x="0.5" y="0.5" width="69" height="69" rx="34.5" fill="#00BA00" stroke="#00BA00" />
            <path d="M45.6151 25.3761C44.9808 25.3979 44.3798 25.6739 43.9398 26.1455C39.2723 30.9683 35.7077 34.9963 31.3757 39.5548L26.7612 35.5352C26.5163 35.3217 26.233 35.1602 25.9275 35.0598C25.622 34.9594 25.3003 34.9222 24.9808 34.9502C24.6613 34.9782 24.3503 35.0709 24.0656 35.2231C23.7809 35.3753 23.5282 35.5838 23.3218 35.8369C23.1155 36.0899 22.9596 36.3824 22.863 36.6977C22.7665 37.013 22.7313 37.3448 22.7594 37.6741C22.7874 38.0034 22.8782 38.3238 23.0266 38.6169C23.175 38.91 23.378 39.17 23.624 39.3821L29.9593 44.9091C30.4255 45.314 31.0218 45.524 31.6307 45.4978C32.2397 45.4717 32.817 45.2112 33.2489 44.7678C38.4975 39.3447 42.2337 35.0132 47.3817 29.6941C47.7352 29.3418 47.9772 28.8874 48.0756 28.3907C48.1741 27.894 48.1245 27.3781 47.9334 26.911C47.7423 26.4439 47.4186 26.0473 47.0048 25.7733C46.5911 25.4994 46.1066 25.3609 45.6151 25.3761Z" fill="white" />
          </svg>
          <Title level={4}>Are you sure you want to save these changes?</Title>
          <Title level={4}>Changes will be applied and you'll be redirected to the products page.</Title>
          <Space style={{ marginTop: 20 }}>
            <Button className='mainbtn' onClick={() => handleCancel()}>No</Button>
            <Button className='mainbtn dangerbg' onClick={handleCancel}>Yes</Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};




export default EditProduct;
