import React, { PropTypes } from "react";
import { Modal, Table } from "antd";

const viewModal = ({
  viewModalVisible,
  loading,
  currentItem,
  viewList,
  onCancel
}) => {
  const columns = [
    {
      title: "菜品名称",
      dataIndex: "recipeName",
      key: "recipeName"
    }
  ];
  const modalOpts = {
    visible: viewModalVisible,
    title: `[${currentItem.menuName}]菜品信息`,
    onCancel,
    footer: null,
    bodyStyle: {
      height: "365px",
      overflow: "auto"
    }
  };
  return (
    <Modal {...modalOpts}>
      <Table
        columns={columns}
        dataSource={viewList}
        bordered
        loading={loading}
        rowKey={record => record.id}
      />
    </Modal>
  );
};

viewModal.propTypes = {
  viewModalVisible: PropTypes.bool,
  currentItem: PropTypes.object,
  loading: PropTypes.bool,
  viewList: PropTypes.array,
  onCancel: PropTypes.func,
  onPageChange: PropTypes.func
};

export default viewModal;
