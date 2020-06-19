import CommonLayout from "@layouts/CommonLayout";
import FundBussType from "@business/invest/FundBussType";
import FundType from "@business/invest/FundType";

const route = {
    path: "/invest",
    component: CommonLayout,
    name: "理财",
    children:[
        {
            path: "/FundType",
            component: FundType,
            name: "基金类型",
        },
        {
            path: "/FundBussType",
            component: FundBussType,
            name: "基金分类",
        },
    ]
};

export default route;