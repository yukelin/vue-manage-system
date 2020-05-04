<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>-->
        <div class="container">
            <div class="handle-box">
                <!-- <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>-->
                <el-input v-model="query.code" placeholder="Code码" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd('add')">新建Code码</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    :index="(index)=>{return (index+1) + (query.pageIndex-1)*query.pageSize  }"
                ></el-table-column>
                <!-- <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column> -->
                <el-table-column prop="name" label="Code名称" align="center">
                    <template slot-scope="scope">{{scope.row.code_name}}</template>
                </el-table-column>
                <el-table-column label="Code码" align="center">
                    <template slot-scope="scope">{{scope.row.code}}</template>
                </el-table-column>
                <el-table-column label="Code码数量" align="center">
                    <template slot-scope="scope">{{scope.row.code_num}}</template>
                </el-table-column>
                <el-table-column prop="user_energy" label="Code码能量值" align="center">
                    <template slot-scope="scope">{{scope.row.energy_value}}g</template>
                </el-table-column>
                <el-table-column prop="date" label="过期时间" align="center">
                    <template slot-scope="scope">{{expTime(scope.row.expirate_time)}}</template>
                </el-table-column>
                <el-table-column prop="date" label="创建时间" align="center">
                    <template slot-scope="scope">{{scope.row.createdAt}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="titleType" :visible.sync="editVisible" width="30%">
            <el-form ref="codeForm" :model="codeForm" label-width="120px">
                <el-form-item
                    label="Code码名称"
                    prop="code_name"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-input v-model="codeForm.code_name"></el-input>
                </el-form-item>
                <el-form-item
                    label="Code码"
                    prop="code"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-input v-model="codeForm.code" :disabled="titleType == '新建' ? false :true"></el-input>
                </el-form-item>
                <el-form-item
                    label="Code码数量"
                    prop="code_num"
                    :rules="[{ required: true, message: '不能为空'},{ type: 'number', message: '必须为数字值'}]"
                >
                    <el-input v-model.number="codeForm.code_num"></el-input>
                </el-form-item>
                <el-form-item
                    label="Code码能量值"
                    prop="energy_value"
                    :rules="[{ required: true, message: '不能为空'},{ type: 'number', message: '必须为数字值'}]"
                >
                    <el-input v-model.number="codeForm.energy_value"></el-input>
                </el-form-item>

                <el-form-item
                    label="过期时间"
                    prop="expirate_time"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-date-picker
                        v-model="codeForm.expirate_time"
                        type="datetime"
                        placeholder="选择日期时间"
                        default-time="12:00:00"
                        value-format="timestamp"
                    ></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="titleType == '新建' ? saveAdd() :saveEdit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getAllCode, deleteCode, editCode, addCode } from '../../api/code';
import { formatDate } from '../../utils/tool';
export default {
    name: 'CodeManagement',
    data() {
        return {
            query: {
                code: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            codeForm: {
                // code_name: '',
                // code: '',
                // code_num: '',
                // code_num: '',
                // energy_value: 0,
                // expirate_time: 0
            },
            idx: -1,
            id: -1,
            titleType: ''
        };
    },
    created() {
        this.getData();
    },
    computed: {},
    methods: {
        expTime(date) {
            date = parseInt(date);
            return formatDate(new Date(date));
        },
        getData() {
            getAllCode({ code: this.query.code, page: this.query.pageIndex }).then(res => {
                // console.log('aaaaaaaaa', res.data);
                this.tableData = res.data;
                this.pageTotal = res.total;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            console.log(row.id);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteCode({ id: row.id }).then(res => {
                        if (res.code == 200) {
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                        }
                    });
                })
                .catch(() => {
                    this.$message.error('删除失败');
                });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // delAllSelection() {
        //     const length = this.multipleSelection.length;
        //     let str = '';
        //     this.delList = this.delList.concat(this.multipleSelection);
        //     for (let i = 0; i < length; i++) {
        //         str += this.multipleSelection[i].name + ' ';
        //     }
        //     this.$message.error(`删除了${str}`);
        //     this.multipleSelection = [];
        // },

        // 新建操作
        handleAdd(type) {
            this.titleType = type == 'add' ? '新建' : '编辑';
            this.codeForm = {};
            this.editVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.titleType = this.titleType == 'add' ? '新建' : '编辑';
            this.idx = index;
            this.codeForm = row;
            // console.log('row', row);
            this.editVisible = true;
        },
        // 保存新建
        saveAdd() {
            this.$refs['codeForm'].validate(valid => {
                if (valid) {
                    console.log('saveAdd', this.codeForm);
                    // return;
                    addCode(this.codeForm).then(res => {
                        console.log('aaaaaaaaa', res);
                        if (res.code == 200) {
                            this.editVisible = false;
                            this.$message.success(`新建成功`);
                            // this.$set(this.tableData, this.total, this.codeForm);
                            this.getData();
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 保存编辑
        saveEdit() {
            this.$refs['codeForm'].validate(valid => {
                if (valid) {
                    // console.log('saveEdit', this.codeForm);
                    editCode(this.codeForm).then(res => {
                        // console.log('aaaaaaaaa', res.data);
                        this.editVisible = false;
                        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$message.success(`修改成功`);
                        this.$set(this.tableData, this.idx, this.codeForm);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            console.log('val', this.query);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
