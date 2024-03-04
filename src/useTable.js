import { reactive, toRefs } from "vue";
import { isFunction } from "./util.js";

export const useTable = (opts = {}) => {
  const { queryParams } = opts;

  const state = reactive({
    // 表格数据
    dataSource: [],
    // 分页数据
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    },
    loading: false,
  });

  // 获取列表数据
  const getPageData = () => {
    console.log(state, "state");
    console.log(queryParams, "查询条件");
    state.loading = true;
    setTimeout(() => {
      state.loading = false;
      state.dataSource = [
        {
          projectName: "赛话术和爱妃估计啊你昂i我Angie昂i艾奥里给你",
        },
      ];
      state.pagination.total = 100;
    }, 2000);
  };
  // 查询
  const onSearch = () => {
    state.pagination.current = 1;
    getPageData();
  };
  // 分页
  const onPaginationChange = (pagObj) => {
    state.pagination = {
      ...state.pagination,
      [pagObj.field]: pagObj.value,
    };
    getPageData();
  };

  return {
    ...toRefs(state),
    onSearch,
    onPaginationChange,
  };
};
