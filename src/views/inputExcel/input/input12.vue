<template>
  <div>
   <div class="app-container" style="width:95%;margin-left: 30px;background: #d2e9ff; margin-top: 10px;height: 70px;border-radius: 5px;box-shadow: 4px 4px 4px  #d9d9d9;">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="机型" prop="planeType">
        <el-input
          v-model="queryParams.planeType"
          placeholder="请输入机型"
          clearable
          style="width: 160px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部队" prop="troops">
        <el-input
          v-model="queryParams.troops"
          placeholder="请输入部队"
          clearable
          style="width: 160px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="飞行小时" prop="flightHours">
        <el-input
          v-model="queryParams.flightHours"
          placeholder="请输入飞行小时"
          clearable
          style="width: 160px;"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
    </el-form>
   </div>
    <el-card style="width: 95%; margin-left: 30px; margin-top: 10px">

        <el-button
          type="primary"
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport4"
          style="
            font-family: Arial;
            font-size: 10px;
            font-weight: 600;
            display: inline-block;
            margin-left: 20px;
          "
        >装备使用数据导入</el-button>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>


    <el-table v-loading="loading" :data="List"
              @selection-change="handleSelectionChange"
              :default-sort="defaultSort"
              @sort-change="handleSortChange"
              :header-cell-style="{
               background: '#84BBFE',
               color: '#fff',
               // fontSize: '14px',
               textAlign: 'center',
               // fontWeight: '600',
               fontFamily: '黑体',
               padding: '0',
                 }" style="margin-top: 10px" class="myTable">

      <el-table-column type="index"  align="center" label="序号"/>
      <el-table-column label="年月" align="center" prop="date" width="180" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机型" align="center" prop="planeType" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="部队" align="center" prop="troops" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
      <el-table-column label="飞行小时" align="center" prop="flightHours" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleDetail(scope.row)"
              v-hasPermi="['system:12:edit']"
            >详情</el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['system:12:edit']"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['system:12:remove']"
            >删除</el-button>
          </template>
        </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    </el-card>

    <!-- 装备使用数据修改对话框 -->
    <el-dialog :title="title" :visible.sync="open1" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="年月" prop="date">
          <el-date-picker clearable
                          v-model="form.date"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="机型" prop="planeType">
          <el-input v-model="form.planeType" placeholder="请输入机型" />
        </el-form-item>
        <el-form-item label="部队" prop="troops">
          <el-input v-model="form.troops" placeholder="请输入部队" />
        </el-form-item>
        <el-form-item label="飞行小时" prop="flightHours">
          <el-input v-model="form.flightHours" placeholder="请输入飞行小时" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 装备使用数据详情对话框 -->
    <el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="年月" prop="date">
          <el-date-picker clearable
                          v-model="form.date"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择年月" readonly="readonly">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="机型" prop="planeType">
          <el-input v-model="form.planeType" placeholder="请输入机型" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="部队" prop="troops">
          <el-input v-model="form.troops" placeholder="请输入部队" readonly="readonly"/>
        </el-form-item>
        <el-form-item label="飞行小时" prop="flightHours">
          <el-input v-model="form.flightHours" placeholder="请输入飞行小时" readonly="readonly"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--  装备使用数据导入  -->
    <el-dialog :title="upload.title" :visible.sync="upload.open4" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url4 + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <!--          <div class="el-upload__tip" slot="tip">
                      <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
                    </div>-->
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate4">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open4 = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list12, get12, del12, add12, update12 } from "@/api/system/12";
import {getToken} from "@/utils/auth";

export default {
  name: "12",
  data() {
    return {
      // 用户导入参数
        upload: {
        // 是否显示弹出层（用户导入）
        open4: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url4: process.env.VUE_APP_BASE_API + "/system/12/importData",
      },
      // 遮罩层
      loading: true,
      // 默认排序
      defaultSort: {prop:"date", order: 'descending'},
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 12：装备使用数据表格数据
      List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open1: false,
      open2: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        planeType: null,
        troops : null,
        flightHours :null,
      },
    // 表单参数
    form: {},
    // 表单校验
    rules: {
    }
  };
  },
  created() {
    this.getList();
  },
  methods: {
    handleImport4() {
      this.upload.title = "装备使用数据导入";
      this.upload.open4 = true;
    },
    importTemplate4() {
      this.download('system/12/importTemplate', {
      }, `EquipmentUseData12${new Date().getTime()}.xlsx`)
    },
    submitFileForm() {
      this.$refs.upload.submit();
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 产品设计文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open5 = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },

    /** 查询12：装备使用数据列表 */
    getList() {
      this.loading = true;
      list12(this.queryParams).then(response => {
        this.List = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open1 = false;
      this.open2 = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        pageSize: 10,
        planeType: null,
        troops : null,
        flightHours :null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.pageNum = 1;
      this.$refs.tables.sort(this.defaultSort.prop, this.defaultSort.order)
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加12：装备使用数据";
    },
    /** 详情按钮操作 */
    handleDetail(row) {
      this.reset();
      const id = row.id || this.ids
      get12(id).then(response => {
        this.form = response.data;
        this.open2 = true;
        this.title = "装备使用数据详情";
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      get12(id).then(response => {
        this.form = response.data;
        this.open1 = true;
        this.title = "装备使用数据修改";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            update12(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open1 = false;
              this.getList();
            });
          } else {
            add12(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open1 = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      const name = row.planeType;
      this.$modal.confirm('是否确认删除装备使用数据名为"' + name + '"的数据项？').then(function() {
        return del12(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 排序触发事件 */
    handleSortChange(column, prop, order) {
      this.queryParams.orderByColumn = column.prop;
      this.queryParams.isAsc = column.order;
      this.getList();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/12/export', {
        ...this.queryParams
      }, `12_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

<style lang="scss" scoped>
.myTable{
  width: 100%;
  height: 50%;
}

</style>
