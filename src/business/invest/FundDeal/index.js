import * as React from "react";
import {Button, Col, Divider, Input, Popconfirm, Row, Table} from "antd";
import {Store} from "./store";
import {fundDealAPI} from "@services";
import EditDialog from "./EditDialog";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import {toJS} from "mobx";
import moment from "moment";

const store = new Store();

@observer
export default class FundType extends React.Component {
    _columns = [
        {
            title: "名称",
            dataIndex: "fundName",
            key: "fundName"
        },
        {
            title: "买入日期",
            dataIndex: "buyDate",
            key: "buyDate",
            render: (text) => text && moment(text).format("YYYY-MM-DD")
        },
        {
            title: "成本",
            dataIndex: "buyMoney",
            key: "buyMoney",
        },
        {
            title: "市值",
            dataIndex: "buyMoney",
            key: "buyMoney",
        },
        {
            title: "盈利",
            dataIndex: "buyMoney",
            key: "buyMoney",
        },
        {
            title: "盈利比例",
            dataIndex: "buyMoney",
            key: "buyMoney",
        },
        {
            title: "状态",
            dataIndex: "statusValue",
            key: "statusValue",
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <div>
                    <a href="javascript:" onClick={this.onUpdateClick(record)}>卖出</a>
                    <Divider type="vertical"/>
                    <a href="javascript:" onClick={this.onUpdateClick(record)}>卖出明细</a>
                    <Divider type="vertical"/>
                    <a href="javascript:" onClick={this.onUpdateClick(record)}>编辑</a>
                    <Divider type="vertical"/>
                    <a href="javascript:" onClick={this.onUpdateClick(record)}>详情</a>
                    <Divider type="vertical"/>
                    <Popconfirm
                        title="确定要删除吗？" onConfirm={this.onDeleteClick(record)} okText="确定"
                        cancelText="取消"
                    >
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                </div>
            )
        },
    ];
    _updateRef = React.createRef();
    _createRef = React.createRef();

    componentDidMount() {
        store.loadData();
    }

    onDeleteClick = (record) => () => {
        store.asyncDeleteData(record);
    };

    onUpdateClick = (record) => () => {
        this._updateRef.current.show(record);
    };

    onSearch = (value) => {
        store.keyword = value;
        store.loadData();
    };

    onCreateClick = () => {
        this._createRef.current.show({});
    };

    onCreateOrUpdateSuccess = () => {
        store.loadData();
    }

    render() {
        return (
            <div className={"fill-parent"}>
                <EditDialog
                    ref={this._createRef}
                    title={"新增买入记录"}
                    loadData={fundDealAPI.create}
                    onFinish={this.onCreateOrUpdateSuccess}
                />
                <EditDialog
                    ref={this._updateRef}
                    title={"新增买入记录"}
                    loadData={fundDealAPI.update}
                    onFinish={this.onCreateOrUpdateSuccess}
                />
                <Row style={{padding: 12}} gutter={12}>
                    <Col span={6}>
                        <Input.Search
                            onSearch={this.onSearch}
                            enterButton={<SearchOutlined/>}
                        />
                    </Col>
                    <Col span={4}>
                        <Button
                            type={"primary"}
                            onClick={this.onCreateClick}
                        >新增</Button>
                    </Col>
                </Row>
                <Table
                    rowKey={(record) => record.id || ""}
                    columns={this._columns}
                    dataSource={toJS(store.data)}
                />
            </div>
        );
    }
}