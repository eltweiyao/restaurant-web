/**
 * Created by guoyuexin on 2018-09-04 15:15:28
 */
/* eslint-disable */
import React, { PropTypes } from 'react';
import { Modal, Row, Col, Input, Tree, Table, Tabs, Checkbox, message, Spin } from 'antd';
import _ from 'lodash';

let selectedTabClone = [];
// const TabPane = Tabs.TabPane;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;

const bindModal = ({
  groupList,
  // treeDate,
  tabValue,
  loading, // confirmLoading
  spinning, // 门店数加载状态
  codeName, // 编号名称
  bindModalVisible, // 模态框是否可见
  selectedShops, // 所选中的门店
  allStore, // 所有门店列表
  groupDate, // 门店分组
  expandedKeys, // 树形结构需要展开的key
  searchValue, // 查询关键字
  autoExpandParent, // 是否自定展开
  title, // 模态框title
  tableTitle, // 表格标题
  filterVisible, // 是否展示筛选部分
  onCancel, // 取消方法
  onConfirm, // 提交方法
  onSelect, // 左侧树形结构选择方法
  onDelete, // 右侧删除方法
  onDeleteAll, // 右侧清除所有方法
  onSearch, // 搜索方法
  onExpand, // 展开/收起产生的事件
  disableSelect, // 不可勾选
  // viewList, // 已绑定的门店
  isTree, // 仅左侧树结构展示已勾选内容
  isGroup, // 是否显示门店分组
  isNoTabs, // 是否不显示tab菜单
  onResetSearch, // 清空搜索
  onChangeTabValue,
}) => {
  const handleDeleteAll = () => {
    selectedTabClone = [];
    onDeleteAll();
  };
  const modalOpts = {
    visible: bindModalVisible,
    title,
    okText: '确定',
    cancelText: '取消',
    width: 710,
    onCancel,
    onOk: onConfirm,
    maskClosable: false,
    confirmLoading: loading || false,
    bodyStyle: {
      padding: '15px !important',
    },
  };
  const dataList = [];
  const generateList = (data) => {
    data.forEach((item) => {
      const key = item.id;
      if (!item.children && item.bohCode) {
        dataList.push({ key, title: `${item.name} | ${item.bohCode}` });
      } else {
        dataList.push({ key, title: item.name });
        if (item.children) {
          generateList(item.children, item.id);
        }
      }
    });
  };
  // console.log(tabValue, typeof tabValue)
  // tab1 显示组织机构，tab2 显示门店分组
  if (tabValue === '1') {
    // tab1勾选中的门店
    selectedTabClone = _.clone(selectedShops);
    generateList(allStore);
  } else if (tabValue === '2') {
    generateList(groupDate);
  } else {
    generateList(allStore);
  }


  const getParentKey = (key, tree) => {
    let parentKey;
    tree.forEach((ele) => {
      const node = ele;
      if (node.children) {
        if (node.children.some(item => item.id === key)) {
          parentKey = node.id;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    });
    return parentKey;
  };
  let childrenIndex = [];

  // 监听搜索框
  const handleSearch = (value) => {
    if (value === '') {
      onResetSearch();
      return;
    }
    let dataArray;
    if (tabValue === '2') {
      dataArray = groupDate;
    } else {
      dataArray = allStore;
    }
    const Keys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, dataArray);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    if (Keys.length) {
      onSearch(value, Keys);
    } else {
      message.warning('很抱歉，暂未搜索到结果');
    }
  };
  // 门店分组与组织机构切换tab选中门店都选中
  let selectIds = selectedShops.map(item => item.id);
  let selectedShopsClone = selectedShops;
  // 选择菜品和选择门店
  if (selectedShops[0] && selectedShops[0].hasOwnProperty('bohCode')) {
    selectedShopsClone = _.uniqBy(selectedShops, 'bohCode');
  } else if (selectedShops[0] && selectedShops[0].hasOwnProperty('dishCode')) {
    selectedShopsClone = _.uniqBy(selectedShops, 'dishCode');
  }
  let checkedIds;
  // 判断tab切到门店分组，将id拼起来
  if (tabValue === '2') {
    selectIds = [];
    selectedShopsClone.map((item) => {
      if (!item.childrenNum && item.id.indexOf('-') <= -1) {
        item.key = item.id;
        // item.id = `${item.parentId}-${item.id}`;
      }
    });
    selectedShopsClone.map((item) => {
      if (item.key) {
        groupList.map(data => item.key === data.key ? selectIds.push(data.id) : '');
      } else {
        groupList.map(data => item.id === data.key ? selectIds.push(data.id) : '');
      }
    });
    selectIds = _.uniq(selectIds);
    checkedIds = isTree
      ? _.concat(selectIds, disableSelect) // 已选择的始终处于选中状态
      : selectIds;
  } else {
    // selectedShops.forEach(item => item.id.indexOf('-') > -1 ? item.id = item.id.substr(item.id.indexOf('-') + 1, item.id.length) : '');
    selectedShopsClone.forEach(item => item.id.indexOf('-') > -1 ? item.id = item.id.substr(item.id.indexOf('-') + 1, item.id.length) : '');
    checkedIds = isTree
      ? _.concat(selectedShopsClone.map(item => item.id), disableSelect) // 已选择的始终处于选中状态
      : selectedShopsClone.map(item => item.id);
  }
  checkedIds = _.uniq(checkedIds);
  // 渲染左侧门店树结构
  const loopTree = (data) => {
    childrenIndex = [];
    data.map((item) => {
      const index = item.name.indexOf(searchValue); // 判断查询的关键字是否在当前条目name中出现
      if (!item.children && index > -1) {
        childrenIndex.push(item);
      }
      return '';
    });
    return data.map((item) => {
      const temp = disableSelect || []; // 节点是否可选择
      let nameCodeStr;
      if (!item.children && item.bohCode) {
        nameCodeStr = `${item.name} | ${item.bohCode}`;
      } else {
        nameCodeStr = item.name;
      }
      const index = nameCodeStr.indexOf(searchValue); // 判断查询的关键字是否在当前条目name中出现
      if (!item.children && index > -1) {
        childrenIndex.push(item);
      }
      const beforeStr = nameCodeStr.substr(0, index); // name中关键字前面部分
      const afterStr = nameCodeStr.substr(index + searchValue.length); // 关键字后面部分
      const treeTitle =
        index > -1 ? ( // 对关键字进行标红处理
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {temp.indexOf(item.id) !== -1 ? `${afterStr}(已添加)` : afterStr}
          </span>
        ) : (
            <span>{temp.indexOf(item.id) !== -1 ? `${nameCodeStr}(已添加)` : nameCodeStr}</span>
          );
      if (item.children) {
        // 如果下面还有子集，即children，则进行递归调用
        const childrenIds = item.children.map(i => i.id); // 获取子级id数组用于判断当下所有子级是否全选中
        return (
          <TreeNode
            title={treeTitle}
            key={item.id}
            value={item.id}
            dataRef={item}
            className={_.difference(childrenIds, temp).length === 0 ? 'disabledSelect' : ''}
          >
            {loopTree(item.children)}
          </TreeNode>
        );
      }
      // else if (index > -1 || !childrenIndex.length) {
      return (
        <TreeNode // 返回树节点结构树
          title={item.bohCode ? <span>{treeTitle}</span> : treeTitle}
          key={item.id}
          value={item.id}
          dataRef={item}
          className={temp.indexOf(item.id) !== -1 ? 'disabledSelect' : ''}
        />
      );
      // }
      // return '';
    });
  };
  // 选择门店树结构触发的事件
  const handleSelect = (selectedKeys, info) => {
    let selectedArray = [];
    const { checkedNodes } = info;
    if (tabValue === '2') {
      checkedNodes.forEach((item) => {
        if (!item.props.children) {
          selectedArray.push(item.props.dataRef);
        }
        return null;
      });
      // 去掉勾选的时候
      if (!info.checked) {
        if (!info.node.props.dataRef.children) {
          _.pullAllBy(selectedArray, [info.node.props.dataRef], 'key');
        } else {
          _.pullAllBy(selectedArray, info.node.props.dataRef.children, 'key');
        }
      }
      // 组织机构选中的门店 - 门店分组全部的门店 + 勾选中的门店分组的门店
      const noExist = _.pullAllBy(selectedTabClone, groupList, 'key');
      selectedArray = _.concat(noExist, selectedArray);
      // selectedShopsClone = _.concat(noExist, selectedArray);
    } else {
      checkedNodes.forEach((item) => {
        if (!item.props.children) {
          selectedArray.push(item.props.dataRef);
        }
        return null;
      });
    }
    onSelect(selectedArray);
  };
  // 渠道筛选所触发的事件
  const handleChange = () => {
    // console.log(value);
  };

  const columns = [
    {
      title: '编号',
      dataIndex: codeName,
      key: codeName,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'operating',
      width: 60,
      render: record => (
        <button
          className="btn-link"
          onClick={() => {
            onDelete(record);
          }}
        >
          删除
        </button>
      ),
    },
  ];
  return (
    <Modal {...modalOpts}>
      {filterVisible && (
        <Row>
          <Col>
            <div style={{ textAlign: 'left' }}>选择外卖渠道：</div>
            <div style={{ padding: '10px 0' }}>
              <CheckboxGroup buttonStyle={'solid'} onChange={handleChange}>
                <Checkbox value={'ele'}>饿了么</Checkbox>
                <Checkbox value={'meituan'}>美团</Checkbox>
              </CheckboxGroup>
            </div>
            <div style={{ paddingBottom: '5px' }}>选择门店：</div>
          </Col>
        </Row>
      )}
      <Row gutter={10}>
        <Col span={12}>
          <div style={{ border: '1px solid #ccc', padding: '5px 5px 5px 15px', height: '320px' }}>
            <Search
              placeholder="搜索"
              onSearch={value => handleSearch(value)}
              style={{ width: 280 }}
            />
            <Spin tip="加载中" spinning={spinning}>
              <div style={{ height: '260px', overflow: 'auto', marginTop: '20px' }}>
                {isNoTabs &&
                  (allStore.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#888' }}>暂无数据</div>
                  ) : (
                      <Tree
                        checkable="true"
                        onExpand={onExpand}
                        onCheck={handleSelect}
                        checkedKeys={checkedIds}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                      >
                        {loopTree(allStore)}
                      </Tree>
                    ))}
                {!isNoTabs && (
                  <Tabs defaultActiveKey="1" onChange={onChangeTabValue} value={tabValue}>
                    <TabPane tab="组织机构" key="1" style={{ height: '200px', overflow: 'auto' }}>
                      {allStore.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#888' }}>暂无数据</div>
                      ) : (
                          tabValue === '1' && <Tree
                            checkable="true"
                            onExpand={onExpand}
                            onCheck={handleSelect}
                            checkedKeys={checkedIds}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                          >
                            {loopTree(allStore)}
                          </Tree>
                        )}
                    </TabPane>
                    {isGroup && (
                      <TabPane tab="门店分组" key="2" style={{ height: '200px', overflow: 'auto' }}>
                        {groupDate.length === 0 ? (
                          <div style={{ textAlign: 'center', color: '#888' }}>暂无数据</div>
                        ) : (
                            tabValue === '2' && <Tree
                              checkable="true"
                              onExpand={onExpand}
                              onCheck={handleSelect}
                              checkedKeys={checkedIds}
                              expandedKeys={expandedKeys}
                              autoExpandParent={autoExpandParent}
                            >
                              {loopTree(groupDate)}
                            </Tree>
                          )}
                      </TabPane>
                    )}
                  </Tabs>
                )}
              </div>
            </Spin>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ border: '1px solid #ccc', height: '320px', overflow: 'auto' }}>
            <div style={{ height: '38px', lineHeight: '38px', padding: '0 20px' }}>
              <span style={{ float: 'left' }}>
                {tableTitle} {selectedShopsClone.length}
              </span>
              <button className="btn-link" style={{ float: 'right' }} onClick={handleDeleteAll}>
                清除
              </button>
            </div>
            <Table
              className="noExpand"
              columns={columns}
              dataSource={selectedShopsClone}
              bordered
              loading={loading}
              rowKey={record => record[codeName]}
              pagination={{ size: 'small' }}
              style={{ marginLeft: '1px' }}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

bindModal.propTypes = {
  tabValue: PropTypes.string,
  bindModalVisible: PropTypes.bool,
  loading: PropTypes.bool,
  isTree: PropTypes.bool,
  isGroup: PropTypes.bool,
  isNoTabs: PropTypes.bool,
  spinning: PropTypes.bool,
  codeName: PropTypes.string,
  title: PropTypes.string,
  tableTitle: PropTypes.string,
  expandedKeys: PropTypes.array,
  autoExpandParent: PropTypes.bool,
  searchValue: PropTypes.string,
  selectedShops: PropTypes.array,
  filterVisible: PropTypes.bool,
  allStore: PropTypes.array,
  groupDate: PropTypes.array,
  disableSelect: PropTypes.array,
  // viewList: PropTypes.array,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteAll: PropTypes.func,
  onSearch: PropTypes.func,
  onExpand: PropTypes.func,
  onResetSearch: PropTypes.func,
  onChangeTabValue: PropTypes.func,
};
export default bindModal;
