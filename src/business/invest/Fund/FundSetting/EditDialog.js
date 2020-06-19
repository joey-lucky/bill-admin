import React from "react";
import {observer} from "mobx-react";
import {Col, Form, Input, Row} from "antd";
import {FormDialog, RemoteSelect, RemoteTreeSelect} from "@components";
import {fundBussTypeAPI, fundTypeAPI} from "@services/invest";

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
                            label="代码"
                            name={"code"}
                            rules={[{required: true}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="类型"
                            name={"fundTypeId"}
                            rules={[{required: true}]}
                        >
                            <RemoteSelect loadData={fundTypeAPI.index}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="业务分类"
                            name={"fundBussTypeId"}
                            rules={[{required: true}]}
                        >
                            <RemoteTreeSelect loadData={fundBussTypeAPI.index}/>
                        </Form.Item>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

