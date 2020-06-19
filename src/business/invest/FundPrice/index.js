import * as React from "react";
import {Col, Input, Row} from "antd";
import {Store} from "./store";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import {RemoteTable} from "@components/index";
import {fundPriceAPI} from "@services/invest";
import moment from "moment";

const store = new Store();

@observer
export default class FundPrice extends React.Component {
    _columns = [
        {
            title: "名称",
            dataIndex: "fundName",
            key: "fundName"
        },
        {
            title: "代码",
            dataIndex: "fundCode",
            key: "fundCode"
        },
        {
            title: "净值",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "日期",
            dataIndex: "dateTime",
            key: "dateTime"
        },
        {
            title: "星期",
            dataIndex: "dateTime",
            key: "dateTime",
            render: (text) => {
                if (text) {
                    const array = [
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                        "周日",
                    ];
                    let weekDay = moment(text).isoWeekday();
                    return array[weekDay - 1];
                }
                return null;
            }
        },
        {
            title: "日涨幅",
            dataIndex: "increase",
            key: "increase",
            render: (text) => text && text.toFixed(2) + "%"||""
        },
    ];

    componentDidMount() {
        store.loadData();
    }

    onSearch = (value) => {
        store.keyword = value;
        store.loadData();
    };

    render() {
        return (
            <div className={"fill-parent"}>
                <Row style={{padding: 12}} gutter={12}>
                    <Col span={6}>
                        <Input.Search
                            onSearch={this.onSearch}
                            enterButton={<SearchOutlined/>}
                        />
                    </Col>
                </Row>
                <RemoteTable
                    loadData={fundPriceAPI.index}
                    columns={this._columns}
                    lastModifyDate={store.lastModifyDate}
                    pagination={{pageSize:12}}
                    params={store.queryParams}
                />
            </div>
        );
    }
}