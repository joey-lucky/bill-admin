import * as React from "react";
import {Button, Col, Divider, Input, Popconfirm, Row, Table} from "antd";
import {Store} from "./store";
import {fundBuyCommissionAPI} from "@services";
import EditDialog from "./EditDialog";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import {toJS} from "mobx";
import FundBreadcrumb from "@business/invest/Fund/FundBreadcrumb";
import RouteUtils from "@utils/RouteUtils";

const store = new Store();

@observer
export default class FundSellSetting extends React.Component {
    _columns = [
        {
            title: "金额小于（万）",
            dataIndex: "lessThanMoney",
            key: "lessThanMoney",
            render: (text) => (text / 10000).toFixed(0)
        },
        {
            title: "手续费",
            dataIndex: "commission",
            key: "commission",
            render: (text) => (text * 100).toFixed(2) + "%"
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <div>
                    <a href="javascript:" onClick={this.onUpdateClick(record)}>编辑</a>
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
        const {fundId, fundName} = RouteUtils.getQueryObject(props.location);
        store.fundId = fundId;
        store.fundName = fundName;
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
        this._createRef.current.show({fundId: store.fundId});
    };

    onCreateOrUpdateSuccess = () => {
        store.loadData();
    }

    render() {
        return (
            <div className={"fill-parent"}>
                <FundBreadcrumb
                    name={`卖出手续费配置(${store.fundName})`}
                    onSettingClick={() => this.props.history.goBack()}
                />
                <EditDialog
                    ref={this._createRef}
                    title={"新增用户"}
                    loadData={fundBuyCommissionAPI.create}
                    onFinish={this.onCreateOrUpdateSuccess}
                />
                <EditDialog
                    ref={this._updateRef}
                    title={"新增用户"}
                    loadData={fundBuyCommissionAPI.update}
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