import React from "react";
import {observer} from "mobx-react";
import {Col, DatePicker, Form, Input, Row} from "antd";
import {FormDialog, RemoteSelect} from "@components";
import {fundAPI} from "@services/invest";
import {userAPI} from "@services/bill";
import moment from "moment";
import {authStore} from "@stores";

@observer
export default class EditDialog extends FormDialog {
    static propTypes = FormDialog.propTypes;

    static defaultProps = {
        width: 800,
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    };

    beforeShow(data = {}) {
        if (!data.applyBuyDate) {
            data.applyBuyDate = moment();
        }
        if (!data.userId) {
            data.userId = authStore.userId;
        }
        return data;
    }

    beforeSubmit(values) {
        values.applyBuyDate = values.applyBuyDate.format("YYYY-MM-DD 00:00:00");
        return values;
    }

    renderForm() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="名称"
                            name={"fundId"}
                            rules={[{required: true}]}
                        >
                            <RemoteSelect loadData={fundAPI.index}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="买入金额"
                            name={"buyMoney"}
                            rules={[{required: true}]}
                        >
                            <Input type={"number"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="申请买入日期"
                            name={"applyBuyDate"}
                            rules={[{required: true}]}
                        >
                            <DatePicker style={{width:"100%"}} format={"YYYY-MM-DD"}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="用户"
                            name={"userId"}
                            rules={[{required: true}]}
                        >
                            <RemoteSelect loadData={userAPI.index}/>
                        </Form.Item>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

