<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddMenu()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table style="width: 100%"
                :data="list"
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                v-loading="listLoading">
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="菜单名称" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="前端图标" width="100" align="center">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.icon"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="菜单级数" width="100" align="center">
          <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
        </el-table-column>
        <el-table-column label="前端名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleHiddenChange(scope.$index, scope.row)"
              :active-value="0"
              :inactive-value="1"
              v-model="scope.row.hidden">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatDateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!-- 添加或修改菜单对话框 -->
      <el-dialog :title="title" :visible.sync="open" :close-on-click-modal="false" append-to-body>
        <menu-detail :is-edit="isEdit" :menuId="selectedMenuId" v-on:finishCommit="finishCommit()"></menu-detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {fetchList, fetchTreeList, deleteMenu, updateMenu, updateHidden} from '@/api/menu';
  import {formatDate} from '@/utils/date';
  import MenuDetail from './components/MenuDetail';

  export default {
    name: "menuList",
    components: {MenuDetail},
    data() {
      return {
        list: [],
        title: "",
        // 是否显示弹出层
        open: false,
        listLoading: true,
        isEdit: false,
        selectedMenuId: 0,
        parentId: 0
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchTreeList().then(response => {
          this.listLoading = false;
          this.list = response.data;
        });
      },
      handleHiddenChange(index, row) {
        updateHidden(row.id, {hidden: row.hidden}).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      refresh() {
        this.getList();
      },
      closeDialog() {
        this.open = false;
      },
      handleAddMenu() {
        this.isEdit = false;
        this.title = "添加菜单";
        this.open = true;
      },
      handleUpdate(index, row) {
        this.selectedMenuId = row.id;
        this.isEdit = true;
        this.title = "修改菜单";
        this.open = true;
      },
      finishCommit() {
        this.refresh();
        this.closeDialog();
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该菜单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMenu(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      }
    },
    filters: {
      levelFilter(value) {
        if (value === 0) {
          return '一级';
        } else if (value === 1) {
          return '二级';
        }
      },
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>

<style scoped>

</style>
