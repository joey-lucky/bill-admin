import * as React from "react";
import {observer} from "mobx-react";
import * as styles from "./index.module.css";
import {Redirect, Route} from "react-router";
import FundSetting from "@business/invest/Fund/FundSetting";
import FundBuySetting from "@business/invest/Fund/FundBuySetting";
import FundSellSetting from "@business/invest/Fund/FundSellSetting";

@observer
export default class FundDeal extends React.Component {
    render() {
        const parentPath = this.props.match.path;
        return (
            <div className={styles.container}>
                <Route
                    path={parentPath + "/setting"}
                    component={FundSetting}
                />
                <Route
                    path={parentPath + "/setting/buy-setting"}
                    component={FundBuySetting}
                />
                <Route
                    path={parentPath + "/setting/sell-setting"}
                    component={FundSellSetting}
                />
                <Redirect to={parentPath + "/setting"}/>
            </div>
        );
    }
}