import React from "react";
import {observer} from "mobx-react";
import {Col, DatePicker, Form, Input, Row} from "antd";
import {FormDialog, RemoteSelect, RemoteTreeSelect} from "@components";
import {fundBussTypeAPI, fundTypeAPI} from "@services/invest";
import moment from "moment";

@observer
export default class EditDialog extends FormDialog {
    static propTypes = FormDialog.propTypes;

    static defaultProps = {
        width: 800,
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    };

    beforeSubmit(values) {
        if (values.startDate) {
            values.startDate = values.startDate.format("YYYY-MM-DD 00:00:00");
        }
        return values;
    }

    beforeShow(data = {}) {
        if (data.startDate) {
            data.startDate = moment(data.startDate);
        }
        return data;
    }

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
                        >
                            <RemoteSelect loadData={fundTypeAPI.index}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="业务分类"
                            name={"fundBussTypeId"}
                        >
                            <RemoteTreeSelect loadData={fundBussTypeAPI.index}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="类型"
                            name={"startDate"}
                        >
                            <DatePicker format={"YYYY-MM-DD"}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>

                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

