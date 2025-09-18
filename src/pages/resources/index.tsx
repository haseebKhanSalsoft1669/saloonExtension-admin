import { Button, Card, Input, Modal, Space, Table, Form, message, Upload , Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Edit, Search, Trash2, Plus, UploadCloud } from 'lucide-react';
import React, { useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../../styles/Common.css';
import { useDeleteContentMutation, useGetAllContentsQuery, useAddContentMutation, useUpdateContentMutation, type ContentItem } from '../../redux/services/contentSlice';
import { UPLOADS_URL  } from '../../constants/api'
const { Search: AntSearch } = Input;

const Resources: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [deleteContent, { isLoading: isDeleting }] = useDeleteContentMutation();
  const [addContent, { isLoading: isCreating }] = useAddContentMutation();
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentMutation();

  const { data, isFetching } = useGetAllContentsQuery({});
  const contents: ContentItem[] = useMemo(() => {
    const list = (data as { contents?: ContentItem[] } | undefined)?.contents ?? [];
    return list.filter((c: ContentItem) => c.title?.toLowerCase().includes(searchText.toLowerCase()));
  }, [data, searchText]);

  const openCreate = () => {
    setEditingId(null);
    setSelectedContent(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (record: ContentItem) => {
    setEditingId(record._id);
    setSelectedContent(record);
    // Do not prefill Upload with URL in fileList; leave it empty for optional change
    form.setFieldsValue({ title: record.title, desc: record.desc });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Delete content?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okButtonProps: { danger: true, loading: isDeleting },
      onOk: async () => {
        try {
          await deleteContent(id).unwrap();
          message.success('Deleted successfully');
        } catch (e: unknown) {
          const err = e as { data?: { message?: string } };
          message.error(err?.data?.message || 'Delete failed');
        }
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('desc', values.desc);
      const fileList = (values.content_image as Array<{ originFileObj?: File }> | undefined) ?? [];
      const firstFile = fileList[0]?.originFileObj;
      if (firstFile) formData.append('content_image', firstFile);
      if (editingId) {
        await updateContent({ id: editingId, body: formData }).unwrap();
        message.success('Updated successfully');
      } else {
        await addContent(formData).unwrap();
        message.success('Created successfully');
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (e: unknown) {
      const err = e as { errorFields?: unknown; data?: { message?: string } };
      if (!err?.errorFields) {
        message.error(err?.data?.message || 'Save failed');
      }
    }
  };

  const columns: ColumnsType<ContentItem> = [
    {
      title: 'S.No',
      dataIndex: '_id',
      key: 'sno',
      render: (_: unknown, __: ContentItem, index: number) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
      render: (value: string) => value.length > 100 ? `${value.substring(0, 100)}...` : value,
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: ContentItem) => (
        <Space>
          {/* <Button icon={<Eye size={16} />} onClick={() => navigate(`/resources/view/${record._id}`)} /> */}
          <Button icon={<Edit size={16} />} onClick={() => openEdit(record)} />
          <Button danger icon={<Trash2 size={16} />} onClick={() => handleDelete(record._id)} />
        </Space>
      ),
    },
  ];

  const filteredData: ContentItem[] = contents;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Resources</h1>
      </div>

      <Card className="table-card">
        <div className="table-toolbar">
          <AntSearch
            placeholder="Search resources..."
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            prefix={<Search size={16} />}
          />
          <Button type="primary" icon={<Plus size={16} />} onClick={openCreate} style={{ marginLeft: 12 }}>
            Add Content
          </Button>
        </div>

        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey={(row: ContentItem) => row._id}
          loading={isFetching}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          className="data-table"
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Content' : 'Add Content'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={isCreating || isUpdating}
        okText={editingId ? 'Update' : 'Create'}
      >
        <Form layout="vertical" form={form} labelAlign="left" className="page-container">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item name="desc" label="Description" rules={[{ required: true, message: 'Description is required' }]}>
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            name="content_image"
            label="Content Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
              {editingId && selectedContent?.content_image ? (
                <>
                <Image
                  src={`${UPLOADS_URL}${selectedContent.content_image}`}
                  alt={selectedContent.title}
                  width="100%"
                  style={{ borderRadius: 8 }}
                />
                 <Upload maxCount={1} listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadCloud size={16} />}>Select Image</Button>
                </Upload>
                </>
              ) : (
                <Upload maxCount={1} listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadCloud size={16} />}>Select Image</Button>
                </Upload>
              )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Resources;
