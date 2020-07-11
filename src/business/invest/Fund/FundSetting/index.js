import * as React from "react";
import {Button, Col, Divider, Input, Popconfirm, Row, Table} from "antd";
import {Store} from "./store";
import {fundAPI} from "@services";
import EditDialog from "./EditDialog";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import {toJS} from "mobx";
import FundBreadcrumb from "../FundBreadcrumb";
import RouteUtils from "@utils/RouteUtils";
import {RemoteTable} from "@components/index";
import moment from "moment";

const store = new Store();

@observer
export default class FundSetting extends React.Component {
    _columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "代码",
            dataIndex: "code",
            key: "code"
        },
        {
            title: "类型",
            dataIndex: "fundTypeName",
            key: "fundTypeName"
        },
        {
            title: "业务分类",
            dataIndex: "fundBussTypeName",
            key: "fundBussTypeName"
        },
        {
            title: "发行时间",
            dataIndex: "startDate",
            key: "startDate",
            render: (text) => text && moment(text).format("YYYY-MM-DD") || "\\"
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) => (
                <div>
                    <a href="javascript:" onClick={this.onUpdateClick(record)}>编辑</a>
                    <Divider type="vertical"/>
                    <a href="javascript:" onClick={this.onBuySettingClick(record)}>买入配置</a>
                    <Divider type="vertical"/>
                    <a href="javascript:" onClick={this.onSellSettingClick(record)}>卖出配置</a>
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

    onSellSettingClick = (record) => () => {
        const path = this.props.match.path;
        const url = path + "/sell-setting";
        const params = {
            fundId:record.id,
            fundName:record.name,
        };
        this.props.history.push(RouteUtils.toGetUrl(url, params));
    };

    onBuySettingClick = (record) => () => {
        const path = this.props.match.path;
        const url = path + "/buy-setting";
        const params = {
            fundId:record.id,
            fundName:record.name,
        };
        this.props.history.push(RouteUtils.toGetUrl(url, params));
    };

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
                <FundBreadcrumb/>
                <EditDialog
                    ref={this._createRef}
                    title={"新增用户"}
                    loadData={fundAPI.create}
                    onFinish={this.onCreateOrUpdateSuccess}
                />
                <EditDialog
                    ref={this._updateRef}
                    title={"新增用户"}
                    loadData={fundAPI.update}
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
                    loadData={fundAPI.index}
                    columns={this._columns}
                    params={store.queryParams}
                    lastModifyDate={store.lastModifyDate}
                    pagination={{pageSize:10}}
                />
            </div>
        );
    }

}