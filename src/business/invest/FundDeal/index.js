import * as React from "react";
import {observer} from "mobx-react";
import {Redirect, Route} from "react-router";
import FundDealList from "./FundDealList";
import FundDealSell from "../FundDealSell";
import {Breadcrumb} from "antd";

const wrapBreadcrumb = (Comp, nameList = []) => (props) => {
    const length = nameList.length;
    const bindOnClick = (name, index) => (e) => {
        console.log(name, index);
        let goBackIndex = length - 1 - index;
        if (goBackIndex > 0) {
            props.history.go(-goBackIndex);
        }
    };

    return (
        <div style={{width: "100%", height: "100%", background: "white", position: "absolute"}}>
            <Breadcrumb style={{padding:12}}>
                {
                    nameList.map((name,index) =>
                        <Breadcrumb.Item onClick={bindOnClick(name,index)}>{name}</Breadcrumb.Item>
                    )
                }
            </Breadcrumb>
            <Comp {...props}/>
        </div>
    );
};

@observer
export default class FundDeal extends React.Component {

    render() {
        const parentPath = this.props.match.path;
        return (
            <div className={"fill-parent"}>
                <Route
                    path={parentPath + "/list"}
                    component={wrapBreadcrumb(FundDealList,["交易记录"])}
                />
                <Route
                    path={parentPath + "/list/sell"}
                    component={wrapBreadcrumb(FundDealSell,["交易记录","卖出详情"])}
                />
                <Redirect to={parentPath + "/list"}/>
            </div>
        );
    }
}