<template>
  <div>
    <el-table
      ref="dataTable"
      :data="dataSoure.list || []"
      :height="tableHeight"
      :stripe="options.stripe"
      :border="options.border"
      header-row-class-name="table-header-row"
      highlight-current-row
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="options.selectType && options.selectType == 'checkbox'"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="options.showIndex"
        label=" 序号"
        type="index"
        width="60"
        align="center"
      ></el-table-column>
      <template v-for="(column, index) in options.columns">
        <template v-if="column.scopedSlots">
          <el-table-column
            :key="index"
            :label="column.label"
            :align="column.align || 'left'"
            :width="column.width"
          >
            <template #default="scope">
              <slot
                :name="column.scopedSlots"
                :index="scope.$index"
                :row="scope.row"
              >
              </slot>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :key="index"
            :label="column.label"
            :align="column.align || 'left'"
            :width="column.width"
            :fixed="column.fixed"
          ></el-table-column>
        </template>
      </template>
    </el-table>

    <div class="pagination" v-if="showPagination">
      <el-pagination
        v-if="dataSoure.totalCount"
        background
        :totle="dataSoure.totalCount"
        page-sizes="[15,30,50,100]"
        page-size="dataSoure.pageSize"
        current-page.sync="dataSoure.pageNo"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="text-align: right"
      ></el-pagination>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const peops = defineProps({
  dataSoure: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Object,
    default: {
      exHeigth: 0,
      showIndex: false,
    },
  },
  columns: Array,
  fetch: Function,
  initFetch: {
    type: Boolean,
    default: true,
  },
});
const radioSelectRowIndex = ref(null);
const topHeight = 60 + 20 + 30 + 46;

const tableHeight = ref(
  props.options.tableHeigth
    ? props.options.tableHeigth
    : window.innerHeigth - topHeight - props.options.exHeigth
);
const dataTable = ref();
const handleRowClick = (row) => {
  emit("rowclick", row);
};
const handleSelectionChange = (row) => {
  emit("rowselected", row);
};
const handlePageSizeChange = (size) => {
  props.dataSoure.pageSize = size;
  props.dataSoure.pageNo = 1;
  props.fetchData();
};
const handlePageNoChange = (pageNo) => {
  props.dataSoure.pageNo = pageNo;
  props.fetch();
};
const setCurrentRow = (rowKey, rowValue) => {
  let row = props.dataSoure.list.find((item) => {
    return item[rowKey] == rowValue;
  });
  dataTable.value.setCurrentRow(row);
};
defineExpose({
  setCurrentRow,
});
const init = () => {
  if (props.initFetch && props.fetch) {
    props.fetch();
  }
};
init();
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
.el-pagination {
  justify-content: right;
}
.el-table_body tr.current-row > td.el-table_cell {
  background-color: #e6f0f8;
}
.el-table_body tr:hover > td.el-table_cell {
  background-color: #e6f0f8;
}
</style>
