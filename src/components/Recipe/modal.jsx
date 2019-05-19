/*
 * @Author: NaiyingZhang
 * @Date: 2018-08-12 13:49:15
 * @Last Modified by: NaiyingZhang
 * @Last Modified time: 2018-08-16 19:12:43
 */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Icon,
  Upload,
  Button,
  Select
} from "antd";
import styles from "./Modal.less";

const FormItem = Form.Item;
const {TextArea} = Input; 
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const formFirstItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 18, offset: 6 },
    md: { span: 18, offset: 6 }
  }
};

const modal = ({
  previewImage,
  previewVisible,
  item,
  onConfirm,
  onCancel,
  onPreview,
  materials,
  categories,
  loading,
  visible,
  title,
  pkRecipe,
  buttonVisible,
  imageUrl,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    setFieldsValue
  }
}) => {
  const handleOk = () => {
    validateFields(errors => {
      if (errors) {
        return;
      }
      let params = "";
      if (title === "新增配方" || title === "添加所用物料") {
        const {
          pkMaterials,
          counts,
          recipePrice,
          recipeName,
          pkCategory,
          materialPrices,
          remark
        } = getFieldsValue();
        const materials = pkMaterials.map((pkMaterial, index) => {
          return {
            pkMaterial: pkMaterial,
            materialCount: parseFloat(counts[index]),
            materialPrice: parseFloat(materialPrices[index])
          };
        });
        params = {
          pkRecipe: item.pkRecipe,
          recipePrice: recipePrice,
          pkCategory: pkCategory,
          imageUrl: imageUrl,
          recipeName: recipeName,
          materials: materials,
          remark:remark
        };
      } else if (title === "修改菜品信息") {
        const { recipeName, recipePrice, pkCategory, remark } = getFieldsValue();
        params = {
          pkRecipe: item.pkRecipe,
          imageUrl: item.imageUrl,
          recipeName: recipeName,
          recipePrice: recipePrice,
          pkCategory: pkCategory,
          remark: remark
        };
      } else if (title === "修改所用物料") {
        const data = {
          ...getFieldsValue()
        };
        params = {
          pkRecipe: pkRecipe,
          oldPkMaterial: item.pkMaterial,
          ...data
        };
      }
      onConfirm(params);
    });
  };

  const modalProps = {
    maskClosable: false,
    visible,
    title: title,
    cancelText: "取消",
    okText: "保存",
    onOk: handleOk,
    confirmLoading: loading,
    onCancel,
    pkRecipe,
    previewImage: "",
    previewVisible: false,
    afterClose: () => resetFields()
  };

  const remove = k => {
    const keys = getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }
    setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };
  const add = () => {
    const keys = getFieldValue("keys");
    const nextKeys = keys.concat(keys.length);
    setFieldsValue({
      keys: nextKeys
    });
  };

  const materialOpts = materials.map(material => {
    return (
      <Option key={material.pkMaterial} value={material.pkMaterial}>
        {material.materialName}
      </Option>
    );
  });

  const beforeUpload = file => {
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJPG) {
      message.error("只能传图片格式文件");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小不能超过2M");
    }
    return isJPG && isLt2M;
  };

  const categoryOpts = categories.map(category => {
    return (
      <Option key={category.pkCategory} value={category.pkCategory}>
        {category.categoryName}
      </Option>
    );
  });

  const handleUnitNameOnChange = () => {
    let fields = getFieldsValue();
    const pkMaterial = fields.pkMaterial;
    if (pkMaterial !== undefined) {
      let unitName = materials.map(data => {
        if (data.pkMaterial === pkMaterial) {
          return data.unitName;
        }
        return "";
      });
      fields = {
        unitName: unitName
      };
      setFieldsValue(fields);
    }
  };

  const handleImage = value => {
    if (value.file.response) {
      onPreview({
        buttonVisible:
          value.fileList && value.fileList.length > 0 ? true : false,
        imageUrl:
          value.file.response.code === "200" ? value.file.response.data : "",
        currentItem: {
          ...item,
          imageUrl:
            value.file.response.code === "200" ? value.file.response.data : ""
        }
      });
    }
  };
  const handleModalCountFocus = () => {
    let fields = getFieldsValue();
    const pkMaterials = fields.pkMaterials;
    const counts = fields.counts;
    let materialPrices = [];
    let unitNames = [];
    let originalPrice = 0;
    pkMaterials.map((pkMaterial, index) => {
      if (pkMaterial !== undefined) {
        return materials.map(data => {
          if (data.pkMaterial === pkMaterial) {
            materialPrices.push("￥" + Number(data.materialPrice).toFixed(2));
            if (counts[index] !== undefined) {
              originalPrice +=
                parseFloat(counts[index]) * parseFloat(data.materialPrice);
            }
            unitNames.push(data.unitName);
          }
        });
      }
    });
    fields = {
      ...getFieldsValue(),
      pkMaterials,
      units: unitNames,
      originalPrice: Number(originalPrice).toFixed(2),
      materialPrices: materialPrices
    };
    setFieldsValue(fields);
  };
  const handleCancel = () => {
    onPreview({
      previewVisible: false
    });
  };

  const handlePreview = file => {
    onPreview({
      previewVisible: true,
      previewImage: file.url || file.thumbUrl
    });
  };
  getFieldDecorator("keys", { initialValue: [] });
  const keys = getFieldValue("keys");
  const formItems = keys.map((k, index) => {
    return (
      <FormItem
        {...(index === 0 ? formFirstItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? "添加物料" : ""}
        required
        key={k}
      >
        <FormItem className={classnames({ [styles.nameFormItem]: true })}>
          {getFieldDecorator(`pkMaterials[${k}]`, {
            rules: [
              {
                required: true,
                message: "请将物料信息填写完整"
              },
              {
                whitespace: true
              }
            ]
          })(
            <Select placeholder="请选择所用物料" onBlur={handleModalCountFocus}>
              {materialOpts}
            </Select>
          )}
        </FormItem>
        <FormItem className={classnames({ [styles.countFormItem]: true })}>
          {getFieldDecorator(`counts[${k}]`, {
            rules: [
              {
                required: true,
                message: "物料用量不能为空"
              },
              {
                pattern: /^(\d{1,3}(\.\d{1,2})?)$/,
                message: "请输入正数，整数不可多于三位，小数不可多于两位"
              }
            ]
          })(
            <InputNumber
              step={0.01}
              min={0}
              max={999.99}
              onFocus={handleModalCountFocus}
              onBlur={handleModalCountFocus}
              style={{ display: "inline-block", width: "100%" }}
            />
          )}
        </FormItem>
        <FormItem className={classnames({ [styles.unitFormItem]: true })}>
          {getFieldDecorator(`units[${k}]`, {})(
            <Input
              disabled
              className={classnames({ [styles.formItemInput]: true })}
            />
          )}
        </FormItem>
        <div className={classnames({ [styles.priceFormItem]: true })}>
          <FormItem>
            {getFieldDecorator(`materialPrices[${k}]`, {})(
              <Input
                onFocus={handleModalCountFocus}
                disabled
                className={classnames({ [styles.formItemInput]: true })}
              />
            )}
          </FormItem>
        </div>

        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => remove(k)}
          />
        ) : null}
      </FormItem>
    );
  });

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    // 创建新配方Modal
    <Modal {...modalProps}>
      {title === "修改所用物料" ? (
        <Form layout="horizontal">
          <FormItem required label="物料名称" {...formItemLayout}>
            {getFieldDecorator("pkMaterial", {
              initialValue: item.pkMaterial,
              rules: [
                {
                  required: true,
                  message: "请选择物料"
                }
              ]
            })(
              <Select
                onBlur={handleUnitNameOnChange}
                placeholder="请选择所用物料"
              >
                {materialOpts}
              </Select>
            )}
          </FormItem>
          <FormItem required label="物料用量" {...formItemLayout}>
            {getFieldDecorator("materialCount", {
              initialValue: item.materialCount,
              rules: [
                {
                  required: true,
                  message: "请输入物料用量"
                },
                {
                  pattern: /^(\d{1,3}(\.\d{1,2})?)$/,
                  message: "请输入正数，整数不可多于三位，小数不可多于两位"
                }
              ]
            })(<InputNumber step={0.01} min={0} />)}
          </FormItem>
          <FormItem label="物料单位" {...formItemLayout}>
            {getFieldDecorator("unitName", {
              initialValue: item.unitName,
              rules: [
                {
                  required: true,
                  message: "请选择物料"
                }
              ]
            })(<Input disabled />)}
          </FormItem>
          <FormItem label="物料单价" {...formItemLayout}>
            {getFieldDecorator("materialPrice", {
              initialValue: item.materialPrice
            })(<Input disabled />)}
          </FormItem>
        </Form>
      ) : title === "新增配方" ? (
        <Form layout="horizontal">
          <FormItem required label="配方名称" {...formItemLayout}>
            {getFieldDecorator("recipeName", {
              initialValue: item.recipeName,
              rules: [
                {
                  required: true,
                  message: "请输入配方名称"
                },
                {
                  whitespace: true,
                  message: "不能只输入空格"
                },
                {
                  max: 20,
                  message: "最多输入20个字"
                }
              ]
            })(
              <Input
                placeholder="请输入配方名称"
                onBlur={handleModalCountFocus}
                onFocus={handleModalCountFocus}
              />
            )}
          </FormItem>
          <FormItem label="菜品类别" {...formItemLayout}>
            {getFieldDecorator("pkCategory", {
              initialValue: item.pkCategory,
              rules: [
                {
                  required: true,
                  message: "请选择类别"
                }
              ]
            })(
              <Select
                onBlur={handleUnitNameOnChange}
                placeholder="请选择菜品类别"
              >
                {categoryOpts}
              </Select>
            )}
          </FormItem>
          <FormItem label="菜品成本价" {...formItemLayout}>
            {getFieldDecorator("originalPrice", {
              initialValue: item.originalPrice
            })(<Input placeholder="请设置原料及用量" disabled />)}
          </FormItem>
          <FormItem required label="菜品售价" {...formItemLayout}>
            {getFieldDecorator("recipePrice", {
              initialValue: item.recipePrice,
              rules: [
                {
                  required: true,
                  message: "请输入售价"
                },
                {
                  pattern: /^(\d{1,4}(\.\d{1,2})?)$/,
                  message: "请输入正数，整数不可多于四位，小数不可多于两位"
                }
              ]
            })(
              <InputNumber
                placeholder="请输入菜品售价"
                style={{ width: "100%" }}
                step={0.01}
                min={0}
                max={999.99}
                onBlur={handleModalCountFocus}
                onFocus={handleModalCountFocus}
              />
            )}
          </FormItem>
          <FormItem label="备注" {...formItemLayout}>
          {getFieldDecorator("remark", {
            initialValue: item.remark,
            rules: [
              {
                max: 200,
                message:"最多输入200个字"
              }
            ]
          })(
            <TextArea placeholder="请输入备注" />
          )}
          </FormItem>
          <FormItem label="菜品图片" {...formItemLayout}>
            {getFieldDecorator("imageUrl", {
              initialValue: item.imageUrl
            })(
              <div className="clearfix">
                <Upload
                  listType="picture-card"
                  action="api/recipe/uploadPic"
                  name="pic"
                  accept={"image/*"}
                  beforeUpload={beforeUpload}
                  onPreview={handlePreview}
                  onChange={handleImage}
                >
                  {buttonVisible ? "" : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("materials", {
              initialValue: item.recipeName,
              rules: [
                {
                  required: true,
                  message: "请将物料信息填写完整"
                }
              ]
            })(
              <Form>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={add}
                    className={classnames({ [styles.addItemButton]: true })}
                  >
                    <Icon type="plus" /> 添加一条物料
                  </Button>
                </FormItem>
              </Form>
            )}
          </FormItem>
        </Form>
      ) : title === "添加所用物料" ? (
        <Form layout="horizontal">
          <FormItem label="配方名称"  {...formItemLayout}>
            {getFieldDecorator("recipeName", {
              initialValue: item.recipeName
            })(<Input disabled />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("materials", {
              initialValue: item.recipeName,
              rules: [
                {
                  required: true,
                  message: "请将物料信息填写完整"
                }
              ]
            })(
              <Form>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={add}
                    className={classnames({ [styles.addItemButton]: true })}
                  >
                    <Icon type="plus" /> 添加一条物料
                  </Button>
                </FormItem>
              </Form>
            )}
          </FormItem>
        </Form>
      ) : title === "修改菜品信息" ? (
        <Form layout="horizontal">
          <FormItem label="配方名称"  {...formItemLayout}>
            {getFieldDecorator("recipeName", {
              initialValue: item.recipeName,
              rules: [
                {
                  required: true,
                  message: "请输入配方名称"
                },
                {
                  whitespace: true,
                  message: "不能只输入空格"
                },
                {
                  max: 20,
                  message: "最多输入20个字"
                }
              ]
            })(<Input placeholder="请输入配方名称" />)}
          </FormItem>
          <FormItem label="类别名称"  {...formItemLayout}>
            {getFieldDecorator("pkCategory", {
              initialValue: item.pkCategory,
              rules: [
                {
                  required: true,
                  message: "请选择类别"
                }
              ]
            })(
              <Select
                onBlur={handleUnitNameOnChange}
                placeholder="请选择菜品类别"
              >
                {categoryOpts}
              </Select>
            )}
          </FormItem>
          <FormItem label="菜品售价"  {...formItemLayout}>
            {getFieldDecorator("recipePrice", {
              initialValue: item.recipePrice,
              rules: [
                {
                  required: true,
                  message: "请输入售价"
                },
                {
                  pattern: /^(\d{1,4}(\.\d{1,2})?)$/,
                  message: "请输入正数，整数不可多于四位，小数不可多于两位"
                }
              ]
            })(<InputNumber style={{ width: "100%" }} placeholder="请输入菜品售价" step={0.01} min={0} max={9999.99} />)}
          </FormItem>
          <FormItem label="备注" {...formItemLayout}>
          {getFieldDecorator("remark", {
            initialValue: item.remark,
            rules: [
              {
                max: 200,
                message:"最多输入200个字"
              }
            ]
          })(
            <TextArea placeholder="请输入备注" />
          )}
          </FormItem>
          <FormItem label="菜品图片" {...formItemLayout}>
            {getFieldDecorator("imageUrl", {
              initialValue: item.imageUrl
            })(
              <div className="clearfix">
                <Upload
                  listType="picture-card"
                  action="api/recipe/uploadPic"
                  name="pic"
                  accept={"image/*"}
                  beforeUpload={beforeUpload}
                  onPreview={handlePreview}
                  onChange={handleImage}
                >
                  {buttonVisible ? "" : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </div>
            )}
          </FormItem>
        </Form>
      ) : (
        ""
      )}

      <text className={classnames({ [styles.modalHint]: true })}>
        若没有您需要的物料，请先到“物料管理”页面添加物料
      </text>
    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func
};

export default Form.create()(modal);
