import React from "react";
import {observer} from "mobx-react";
import {Form, Input} from "antd";
import {FormDialog} from "@components";
import {strip} from "number-precision";

@observer
export default class EditDialog extends FormDialog {
    static propTypes = FormDialog.propTypes;

    static defaultProps = {
        width: 650,
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    };

    beforeShow(data = {}) {
        if ("lessThanMoney" in data) {
            data.lessThanMoney = strip(data.lessThanMoney / 10000)
        }
        if ("commission" in data) {
            data.commission = strip(data.commission * 100)
        }
        return data;
    }

    beforeSubmit(values) {
        values = {...values};
        values.commission = strip(values.commission / 100);
        values.lessThanMoney = strip(values.lessThanMoney * 10000);
        return values;
    }

    renderForm() {
        return (
            <React.Fragment>
                <Form.Item
                    style={{width:500}}
                    label="金额小于（万）"
                    name={"lessThanMoney"}
                    rules={[{required: true}]}
                >
                    <Input type={"number"}/>
                </Form.Item>
                <Form.Item
                    style={{width:500}}
                    label="手续费（%）"
                    name={"commission"}
                    rules={[{required: true}]}
                >
                    <Input type={"number"}/>
                </Form.Item>
            </React.Fragment>
        );
    }
}

