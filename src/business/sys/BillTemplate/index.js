import * as React from "react";
import {Divider, Popconfirm} from "antd";
import store from "./store";
import {RemoteTable} from "@components";
import EditDialog from "./EditDialog";
import {observer} from "mobx-react";
import {billTemplateAPI} from "@services";
import Filter from "./Filter";
import moment from "moment";

@observer
export default class BillTemplate extends React.Component {
    _columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "类型",
            dataIndex: "billTypeValue",
            key: "billTypeValue",
        },
        {
            title: "用户",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "账单描述",
            dataIndex: "billDesc",
            key: "billDesc",
        },
        {
            title: "账单类型",
            dataIndex: "billTypeName",
            key: "billTypeName"
        },
        {
            title: "银行卡",
            dataIndex: "cardName",
            key: "cardName",
            render: (text, record) => record.cardUserName + " - " + record.cardName
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

    componentDidMount() {
    }

    onDeleteClick = (record) => () => {
        store.asyncDeleteData(record);
    };

    onUpdateClick = (record) => () => {
        this._updateRef.current.show(record);
    };

    onSearch = (values) => {
        store.filterValues = values;
        store.loadData();
    };

    onCreateClick = () => {
        this._createRef.current.show({});
    };

    onCreateOrUpdateSuccess = ()=>{
        store.loadData();
    }

    render() {
        return (
            <div className={"fill-parent"}>
                <EditDialog
                    ref={this._createRef}
                    title={"新增用户"}
                    loadData={billTemplateAPI.create}
                    onFinish={this.onCreateOrUpdateSuccess}
                />
                <EditDialog
                    ref={this._updateRef}
                    title={"新增用户"}
                    loadData={billTemplateAPI.update}
                    onFinish={this.onCreateOrUpdateSuccess}
                />
                <Filter
                    onFinish={this.onSearch}
                    onCreateClick={this.onCreateClick}
                />
                <RemoteTable
                    lastModifyDate={store.lastModifyDate}
                    loadData={billTemplateAPI.index}
                    columns={this._columns}
                    params={store.queryParams}
                />
            </div>
        );
    }
}