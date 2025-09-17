import { Alert, Button, Card, DatePicker, Descriptions, Form, Input, InputNumber, Modal, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import React from 'react';
import '../../styles/Common.css';
import dayjs from 'dayjs';
import { useAddCouponMutation, useDeleteCouponMutation, useGetAllCouponsQuery, useGetCouponByIdQuery, useUpdateCouponMutation, type Coupon } from '../../redux/services/couponSlice';

const { Search: AntSearch } = Input;

type CouponFormValues = {
  title: string;
  desc: string;
  start_date: string | dayjs.Dayjs;
  expire_date: string | dayjs.Dayjs;
  discount: number;
  limit: number;
  price_or_points: number;
};

const CouponManagement: React.FC = () => {
  const [searchText, setSearchText] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [viewId, setViewId] = React.useState<string | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [form] = Form.useForm<CouponFormValues>();

  const { data, isFetching } = useGetAllCouponsQuery({});
  const [addCoupon, { isLoading: isCreating }] = useAddCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const coupons: Coupon[] = React.useMemo(() => {
    const list = (data as { coupons?: Coupon[] } | undefined)?.coupons ?? [];
    const q = searchText.trim().toLowerCase();
    if (!q) return list;
    return list.filter((c: Coupon) => {
      const title = (c.title ?? '').toLowerCase();
      const desc = (c.desc ?? '').toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  }, [data, searchText]);

  const disablePast = (current: dayjs.Dayjs) => current && current < dayjs().startOf('day');

  const { data: viewData, isFetching: isViewFetching, isError: isViewError, error: viewError, refetch: refetchView } = useGetCouponByIdQuery(viewId as string, { skip: !viewId });

  const openCreate = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (record: Coupon) => {
    setEditingId(record._id);
    form.setFieldsValue({
      title: record.title,
      desc: record.desc,
      start_date: record.start_date ? dayjs(record.start_date) : undefined,
      expire_date: record.expire_date ? dayjs(record.expire_date) : undefined,
      discount: record.discount,
      limit: record.limit,
      price_or_points: record.price_or_points,
    } as unknown as CouponFormValues);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete coupon?',
      okText: 'Delete',
      okButtonProps: { danger: true, loading: isDeleting },
      onOk: async () => {
        try {
          await deleteCoupon(id).unwrap();
          message.success('Deleted');
        } catch (e: unknown) {
          const err = e as { data?: { message?: string } };
          message.error(err?.data?.message || 'Delete failed');
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const body = {
        ...values,
        start_date: dayjs(values.start_date).format('YYYY-MM-DD'),
        expire_date: dayjs(values.expire_date).format('YYYY-MM-DD'),
      } as Partial<Coupon>;
      if (editingId) {
        await updateCoupon({ id: editingId, body }).unwrap();
        message.success('Updated');
      } else {
        await addCoupon(body).unwrap();
        message.success('Created');
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (e: unknown) {
      const err = e as { errorFields?: unknown; data?: { message?: string } };
      if (!err?.errorFields) message.error(err?.data?.message || 'Save failed');
    }
  };

  const columns: ColumnsType<Coupon> = [
    {
      title: 'S.No',
      dataIndex: '_id',
      key: 'sno',
      render: (_: unknown, __: Coupon, index: number) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Limit',
      dataIndex: 'limit',
      key: 'limit',
    },
    {
      title: 'Price/Points',
      dataIndex: 'price_or_points',
      key: 'price_or_points',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (value: string) => (value ? new Date(value).toLocaleString() : '-'),
    },
    {
      title: 'Expire Date',
      dataIndex: 'expire_date',
      key: 'expire_date',
      render: (value: string) => (value ? new Date(value).toLocaleString() : '-'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Coupon) => (
        <Space>
          <Button icon={<Eye size={16} />} onClick={() => setViewId(record._id)} />
          <Button icon={<Edit size={16} />} onClick={() => openEdit(record)} />
          <Button danger icon={<Trash2 size={16} />} onClick={() => handleDelete(record._id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Coupon Management</h1>
      </div>

      <Card className="table-card">
        <div className="table-toolbar">
          <AntSearch
            placeholder="Search coupons..."
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            prefix={<Search size={16} />}
          />
          <Button type="primary" icon={<Plus size={16} />} onClick={() => openCreate()} style={{ marginLeft: 12 }}>
            Add Coupon
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={coupons}
          loading={isFetching}
          pagination={{ pageSize: 10 }}
          rowKey="_id"
          scroll={{ x: 'max-content' }}
          className="data-table"
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Coupon' : 'Add Coupon'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={isCreating || isUpdating}
        okText={editingId ? 'Update' : 'Create'}
      >
        <Form layout="vertical" form={form} labelAlign="left" className="page-container">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="desc" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Description" />
          </Form.Item>
          <Form.Item name="start_date" label="Start Date" rules={[{ required: true }]}>
            <DatePicker className="w-full" format="YYYY-MM-DD" disabledDate={disablePast} />
          </Form.Item>
          <Form.Item name="expire_date" label="Expire Date" rules={[{ required: true }]}>
            <DatePicker className="w-full" format="YYYY-MM-DD" disabledDate={disablePast} />
          </Form.Item>
          <Form.Item name="discount" label="Discount" rules={[{ required: true }]}>
            <InputNumber type='number' min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="limit" label="Limit" rules={[{ required: true }]}>
            <InputNumber type='number' min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="price_or_points" label="Price or Points" rules={[{ required: true }]}>
            <InputNumber type='number' min={0} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Coupon Details"
        open={!!viewId}
        onCancel={() => setViewId(null)}
        footer={null}
        destroyOnClose
      >
        {isViewFetching ? (
          <div style={{ padding: 12 }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Loading">Please wait...</Descriptions.Item>
            </Descriptions>
          </div>
        ) : isViewError ? (
          <>
            <Alert
              type="error"
              showIcon
              message="Failed to load coupon details"
              description={(viewError as unknown as { data?: { message?: string } })?.data?.message || 'An error occurred.'}
              style={{ marginBottom: 12 }}
            />
            <Button onClick={() => refetchView()}>Retry</Button>
          </>
        ) : viewData ? (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Title">{viewData.title ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Description">{viewData.desc ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Discount">{viewData.discount ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Limit">{viewData.limit ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Price/Points">{viewData.price_or_points ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Start Date">{viewData.start_date ? new Date(viewData.start_date).toLocaleString() : '-'}</Descriptions.Item>
            <Descriptions.Item label="Expire Date">{viewData.expire_date ? new Date(viewData.expire_date).toLocaleString() : '-'}</Descriptions.Item>
            <Descriptions.Item label="Created At">{viewData.createdAt ? new Date(viewData.createdAt).toLocaleString() : '-'}</Descriptions.Item>
            <Descriptions.Item label="Updated At">{viewData.updatedAt ? new Date(viewData.updatedAt).toLocaleString() : '-'}</Descriptions.Item>
          </Descriptions>
        ) : (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Status">No data found</Descriptions.Item>
            <Descriptions.Item label="ID">{viewId}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default CouponManagement;
