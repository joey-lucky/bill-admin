import React from "react";
import {observer} from "mobx-react";
import {Col, Form, Input, Row} from "antd";
import {FormDialog, RemoteSelect, RemoteTreeSelect} from "@components";
import {fundBussTypeAPI} from "@services/invest";

@observer
export default class EditDialog extends FormDialog {
    static propTypes = FormDialog.propTypes;

    static defaultProps = {
        width: 800,
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    };

    renderForm() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="名称"
                            name={"name"}
                            rules={[{required: true}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="排序"
                            name={"sort"}
                            rules={[{required: true}]}
                        >
                            <Input type={"number"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="父级"
                            name={"parentId"}
                        >
                            <RemoteTreeSelect
                                loadData={fundBussTypeAPI.index}
                                allowClear={true}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="是否为子集"
                            name={"isLeaf"}
                            rules={[{required: true}]}
                        >
                            <RemoteSelect extraOptions={[
                                {"id": false, name: "否"},
                                {"id": true, name: "是"},
                            ]}/>
                        </Form.Item>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

