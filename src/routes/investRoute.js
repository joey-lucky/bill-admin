import CommonLayout from "@layouts/CommonLayout";
import FundBussType from "@business/invest/FundBussType";
import FundType from "@business/invest/FundType";
import Fund from "@business/invest/Fund";
import FundDeal from "@business/invest/FundDeal";
import FundDealSell from "@business/invest/FundDealSell";
import FundPrice from "@business/invest/FundPrice";
import FundDealDividend from "@business/invest/FundDealDividend";

const route = {
    path: "/invest",
    component: CommonLayout,
    name: "理财",
    children:[
        {
            path: "/fund-type",
            component: FundType,
            name: "基金类型",
        },
        {
            path: "/fund-buss-type",
            component: FundBussType,
            name: "基金分类",
        },
        {
            path: "/fund",
            component: Fund,
            name: "基金",
        },
        {
            path: "/fund-deal",
            component: FundDeal,
            name: "基金交易",
        },
        {
            path: "/fund-deal-sell",
            component: FundDealSell,
            name: "基金卖出记录",
        },
        {
            path: "/fund-price",
            component: FundPrice,
            name: "历史净值",
        },{
            path: "/fund-deal-dividend",
            component: FundDealDividend,
            name: "分红记录",
        },
    ]
};

export default route;