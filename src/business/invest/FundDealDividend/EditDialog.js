import React from "react";
import {observer} from "mobx-react";
import {Col, DatePicker, Form, Input, Row} from "antd";
import {FormDialog, RemoteSelect} from "@components";
import {fundDealAPI} from "@services/invest";
import moment from "moment";
import {authStore} from "@stores";
import Assert from "@utils/Assert";

@observer
export default class EditDialog extends FormDialog {
    static propTypes = FormDialog.propTypes;

    static defaultProps = {
        width: 800,
        labelCol: {span: 6},
        wrapperCol: {span: 16}
    };

    dealMap = {};

    beforeShow(data = {}) {
        if (!data.applySellDate) {
            data.applySellDate = moment();
        } else {
            data.applySellDate = moment(data.applySellDate);
        }
        if (!data.userId) {
            data.userId = authStore.userId;
        }
        return data;
    }

    afterShow(data = {}) {
        this.dealMap = {};
        fundDealAPI.index({status: "0"}).then((d) => {
            d.data.forEach((item)=>{
                this.dealMap[item.id] = item;
            })
        });
    }

    beforeSubmit(values) {
        values.applySellDate = values.applySellDate.format("YYYY-MM-DD 00:00:00");
        let remainCount = this.dealMap[values.fundDealId].remainCount;
        Assert.isTrue(values.sellCount <= remainCount, "数量超过限制")
        return values;
    }

    renderForm() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="基金名称"
                            name={"fundDealId"}
                            rules={[{required: true}]}
                        >
                            <RemoteSelect
                                loadData={fundDealAPI.index}
                                parse={(item) => {
                                    item.name = `${item.fundName} (${item.remainCount || 0})`;
                                    return item;
                                }}
                                params={{
                                    status: "0",
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="卖出份额"
                            name={"sellCount"}
                            rules={[{required: true}]}
                        >
                            <Input type={"number"}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="申请卖出日期"
                            name={"applySellDate"}
                            rules={[{required: true}]}
                        >
                            <DatePicker style={{width: "100%"}} format={"YYYY-MM-DD"}/>
                        </Form.Item>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

