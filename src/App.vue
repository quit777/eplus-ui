<template>
  <div class="content">
    <div class="BaseLayout-box">
      <div class="BaseLayout">
        <div class="content-box">
          <ECurd> </ECurd>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EButton from "./components/EButton";
import ECurd from "./components/ECurd";

const columns = ref([
  { label: "项目名称", name: "projectName", hideInTable: true, search: true },
  { label: "项目编码", name: "projectCode", hideInTable: true, search: true },
  { label: "项目大类", name: "projectBigTypeName", hideInTable: true, search: true },
  { label: "项目子类", name: "projectChildTypeName", hideInTable: true, search: true },
  { label: "项目状态", name: "projectStatusName", hideInTable: true, search: true },
  {
    label: "项目信息",
    align: "center",
    children: [
      { label: "单位名称", name: "orgName", width: 100 },
      { label: "项目编码", name: "projectCode", width: 100 },
      { label: "项目名称", name: "projectName", width: 100 },
      { label: "工程登记号", name: "registrationNo", width: 100 },
      { label: "项目大类", name: "projectBigTypeName", width: 100 },
      { label: "项目子类", name: "projectChildTypeName", width: 100 },
      { label: "客户", name: "customerStr", width: 100 },
      { label: "立项时间", name: "buildTime", width: 100 },
      { label: "工程形象进度(%)", name: "totalProgress", width: 150 },
      { label: "项目状态", name: "projectStatusStr", width: 100 },
      { label: "完工时间", name: "completedAcceptTime", width: 100 },
    ],
  },
  {
    label: "总包结算情况",
    align: "center",
    children: [
      { label: "总包合同金额(含税)", name: "contractAmount", width: 150 },
      { label: "总包合同金额(不含税)", name: "contractAmountNoTax", width: 150 },
      { label: "总包结算金额(不含税)", name: "settlementAmount", width: 150 },
      { label: "累计已开票金额(含税)", name: "shouldTotalAmount", width: 150 },
      { label: "累计已收款金额(含税)", name: "actualTotalAmount", width: 150 },
    ],
  },
  { label: "预算总成本(不含间接费用、不含税)", name: "totalCost" },
  { label: "其中预算材料总成本", name: "budgetAmountNoTax" },
  { label: "已推送材料成本", name: "materialCost" },
  {
    label: "专业分包",
    align: "center",
    children: [
      { label: "专业分包结算状态(业务部)", name: "majorSettlementStatusStr", width: 200 },
      { label: "分包结算金额(含税)", name: "majorContractAmount", width: 150 },
      { label: "累计付款金额", name: "majorActualTotalAmount", width: 150 },
    ],
  },
  {
    label: "劳务分包",
    align: "center",
    children: [
      { label: "劳务分包结算状态", name: "laborSettlementStatusStr", width: 150 },
      { label: "分包结算金额(含税)", name: "laborContractAmount", width: 150 },
      { label: "累计付款金额", name: "laborActualTotalAmount", width: 150 },
    ],
  },
  { label: "累计已结转收入金额(不含税)", name: "totalSettlementIncomeAmount" },
  { label: "累计已结转成本金额(不含税)", name: "totalSettlementCostAmount" },
  { label: "成本累计已归集金额(不含税)", name: "totalGatherCostAmount" },
  {
    label: "项目明细成本(不含税)",
    align: "center",
    children: [
      { label: "除间接费用外成本合计", width: 150, name: "excludeIndirectCosts" },
      { label: "材料费", width: 100, name: "material" },
      { label: "人工费", width: 100, name: "laborCost" },
      { label: "折旧与摊销", width: 100, name: "amortize" },
      { label: "机械使用费", width: 100, name: "machinery" },
      { label: "分包费", width: 100, name: "subExpense" },
      { label: "分摊间接费用", width: 100, name: "indirectCosts" },
      { label: "职工教育经费", width: 100, name: "educational" },
      { label: "职工福利费", width: 100, name: "benefit" },
      { label: "工会经费", width: 100, name: "funds" },
      { label: "临时用工薪酬", width: 100, name: "salary" },
      { label: "劳务派遣费", width: 100, name: "dispatch" },
      { label: "特殊工种保险费", width: 150, name: "insurance" },
      { label: "服务成本", width: 100, name: "serviceCost" },
      { label: "办公费", width: 100, name: "officeExpenses" },
      { label: "差旅费", width: 100, name: "travelExpenses" },
      { label: "劳动保护费", width: 100, name: "protection" },
      { label: "会议费", width: 100, name: "conference" },
      { label: "水电费", width: 100, name: "electricity" },
      { label: "租赁费", width: 100, name: "rental" },
      { label: "安全费", width: 100, name: "safetyFee" },
      { label: "车辆使用费", width: 100, name: "vehicleFee" },
      { label: "委托加工及制作费", width: 200, name: "production" },
      { label: "设备检测费", width: 100, name: "testingFee" },
      { label: "安装调试费", width: 100, name: "debuggingFee" },
      { label: "客户培训费", width: 100, name: "trainingFees" },
      { label: "劳务分包费", width: 100, name: "laborServiceFee" },
      { label: "包装费", width: 100, name: "packing" },
      { label: "服务费", width: 100, name: "serviceCharge" },
      { label: "运输费", width: 100, name: "transportation" },
      { label: "其他费用", width: 100, name: "otherExpenses" },
      { label: "在制品", width: 100, name: "workInProgress" },
      { label: "其他直接费用", width: 100, name: "otherDirectFees" },
    ],
  },
]);
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.content {
  height: 100vh;
  position: relative;
}
.BaseLayout-box {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.BaseLayout {
  flex: 1 1 auto;
  /* overflow: hidden; */
}
.content-box {
  background-color: white;
  height: 100%;
  padding: 12px;
}
</style>
