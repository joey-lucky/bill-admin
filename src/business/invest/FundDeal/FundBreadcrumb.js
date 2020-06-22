import {Breadcrumb} from "antd";
import * as React from "react";

export default function FundBreadcrumb({name,onSettingClick}) {
    return(
        <Breadcrumb style={{paddingLeft:12,paddingTop:6}}>
            <Breadcrumb.Item onClick={onSettingClick}>基金配置</Breadcrumb.Item>
            {
                name &&
                <Breadcrumb.Item >{name}</Breadcrumb.Item>
            }
        </Breadcrumb>
    );
}