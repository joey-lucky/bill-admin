import * as React from "react";
import {Button, Col, Divider, Input, Popconfirm, Row} from "antd";
import {Store} from "./store";
import {fundDealSellAPI} from "@services";
import EditDialog from "./EditDialog";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import moment from "moment";
import {RemoteTable} from "@components/index";
import RouteUtils from "@utils/RouteUtils";

const store = new Store();

@observer
export default class FundDealSell extends React.Component {
    _columns = [
        {
            title: "名称",
            dataIndex: "fundName",
            key: "fundName"
        },
        {
            title: "申请卖出日期",
            dataIndex: "applySellDate",
            key: "applySellDate",
            render: (text) => text && moment(text).format("YYYY-MM-DD")
        },
        {
            title: "卖出日期",
            dataIndex: "sellDate",
            key: "sellDate",
            render: (text) => text && moment(text).format("YYYY-MM-DD")
        },
        {
            title: "卖出数量",
            dataIndex: "sellCount",
            key: "sellCount",
        },
        {
            title: "卖出金额",
            dataIndex: "sellMoney",
            key: "sellMoney",
        },
        {
            title: "盈利",
            dataIndex: "profitMoney",
            key: "profitMoney",
        },
        {
            title: "盈利比例",
            dataIndex: "profitRadio",
            key: "profitRadio",
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <div>
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

    constructor(props, context) {
        super(props, context);
        store.defaultParams = RouteUtils.getQueryObject(props.location);
    }

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
                    loadData={fundDealSellAPI.create}
                    onFinish={this.onCreateOrUpdateSuccess}
                />
                <EditDialog
                    ref={this._updateRef}
                    title={"新增买入记录"}
                    loadData={fundDealSellAPI.update}
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
                <RemoteTable
                    loadData={fundDealSellAPI.index}
                    columns={this._columns}
                    params={store.lastModifyDate}
                    lastModifyDate={store.lastModifyDate}
                />
            </div>
        );
    }
}