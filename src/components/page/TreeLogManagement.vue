<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.tree" placeholder="树苗名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    :index="(index)=>{return (index+1) + (query.pageIndex-1)*query.pageSize}"
                ></el-table-column>

                <el-table-column label="树苗名称" align="center">
                    <template slot-scope="scope">{{scope.row.tree.tree_name}}</template>
                </el-table-column>
                <el-table-column label="种树用户昵称" align="center">
                    <template slot-scope="scope">{{scope.row.user.name}}</template>
                </el-table-column>
                <el-table-column label="种树用户open-id" align="center">
                    <template slot-scope="scope">{{scope.row.user.open_id}}</template>
                </el-table-column>
                <el-table-column prop="date" label="种树时间" align="center">
                    <template slot-scope="scope">{{scope.row.createdAt}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
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
        <!-- <el-dialog :title="titleType" :visible.sync="editVisible" width="30%">
            <el-form ref="treeForm" :model="treeForm" label-width="120px">
                <el-form-item
                    label="Tree码名称"
                    prop="tree_name"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-input v-model="treeForm.tree_name"></el-input>
                </el-form-item>
                <el-form-item
                    label="Tree码"
                    prop="tree"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-input v-model="treeForm.tree" :disabled="titleType == '新建' ? false :true"></el-input>
                </el-form-item>
                <el-form-item
                    label="Tree码数量"
                    prop="tree_num"
                    :rules="[{ required: true, message: '不能为空'},{ type: 'number', message: '必须为数字值'}]"
                >
                    <el-input v-model.number="treeForm.tree_num"></el-input>
                </el-form-item>
                <el-form-item
                    label="Tree码能量值"
                    prop="energy_value"
                    :rules="[{ required: true, message: '不能为空'},{ type: 'number', message: '必须为数字值'}]"
                >
                    <el-input v-model.number="treeForm.energy_value"></el-input>
                </el-form-item>

                <el-form-item
                    label="过期时间"
                    prop="expirate_time"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-date-picker
                        v-model="treeForm.expirate_time"
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
        </el-dialog>-->
    </div>
</template>

<script>
import { getAllTreeLog, deleteTreeLog } from '../../api/treeLog';
export default {
    name: 'TreeLogManagement',
    data() {
        return {
            query: {
                tree: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                // {
                //     createdAt: '',
                //     id: 0,
                //     tree: {
                //         tree_name: ''
                //     },
                //     user: {
                //         name: '',
                //         open_id: ''
                //     }
                // }
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            treeForm: {
                // tree_name: '',
                // tree: '',
                // tree_num: '',
                // tree_num: '',
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
        getData() {
            getAllTreeLog({ tree_log: this.query.tree, page: this.query.pageIndex }).then(res => {
                // console.log('aaaaaaaaa', res.data);
                if (res.code == 200) {
                    this.tableData = res.data;
                    this.pageTotal = res.total;
                    console.log('this.tableData', this.tableData);
                }
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
                    deleteTreeLog({ id: row.id }).then(res => {
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
            this.treeForm = {};
            this.editVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.titleType = this.titleType == 'add' ? '新建' : '编辑';
            this.idx = index;
            this.treeForm = row;
            // console.log('row', row);
            this.editVisible = true;
        },
        // 保存新建
        saveAdd() {
            this.$refs['treeForm'].validate(valid => {
                if (valid) {
                    console.log('saveAdd', this.treeForm);
                    // return;
                    addTree(this.treeForm).then(res => {
                        console.log('aaaaaaaaa', res);
                        if (res.code == 200) {
                            this.editVisible = false;
                            this.$message.success(`新建成功`);
                            // this.$set(this.tableData, this.total, this.treeForm);
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
            this.$refs['treeForm'].validate(valid => {
                if (valid) {
                    // console.log('saveEdit', this.treeForm);
                    editTree(this.treeForm).then(res => {
                        // console.log('aaaaaaaaa', res.data);
                        if (res.code == 200) {
                            this.editVisible = false;
                            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.treeForm);
                        }
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
