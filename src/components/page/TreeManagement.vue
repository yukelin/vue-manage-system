<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.tree" placeholder="树苗" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd('add')">新建树苗</el-button>
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
                    :index="(index)=>{return (index+1) + (query.pageIndex-1)*query.pageSize  }"
                ></el-table-column>
                <el-table-column prop="name" label="树苗名称" align="center">
                    <template slot-scope="scope">{{scope.row.tree_name}}</template>
                </el-table-column>

                <el-table-column prop="name" label="树苗介绍" align="center">
                    <template slot-scope="scope">{{scope.row.tree_detail}}</template>
                </el-table-column>

                <el-table-column prop="name" label="树苗剩余数量" align="center">
                    <template slot-scope="scope">{{scope.row.tree_num}}</template>
                </el-table-column>

                <el-table-column prop="name" label="树苗所需能量" align="center">
                    <template slot-scope="scope">{{scope.row.tree_energy}}g</template>
                </el-table-column>

                <el-table-column label="树苗icon" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb-square"
                            :src="scope.row.tree_icon"
                            :preview-src-list="[scope.row.tree_icon]"
                        ></el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="user_energy" label="树苗图" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.tree_img"
                            :preview-src-list="[scope.row.tree_img]"
                        ></el-image>
                    </template>
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
            <el-form ref="treeForm" :model="treeForm" label-width="120px">
                <el-form-item
                    label="树苗名称"
                    prop="tree_name"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-input v-model="treeForm.tree_name"></el-input>
                </el-form-item>

                <el-form-item
                    label="树苗介绍"
                    prop="tree_detail"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="treeForm.tree_detail"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="树苗数量"
                    prop="tree_num"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-input v-model.number="treeForm.tree_num"></el-input>
                </el-form-item>

                <el-form-item
                    label="树苗所需能量"
                    prop="tree_energy"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-input v-model.number="treeForm.tree_energy"></el-input>
                </el-form-item>

                <el-form-item label="树苗图标" prop="tree">
                    <el-upload
                        action="https://www.colynlu.cn/upload"
                        list-type="picture-card"
                        multiple
                        :limit="1"
                        :on-success="successUploadTreeIcon"
                        :file-list="fileListTreeIcon"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                </el-form-item>

                <el-form-item label="树苗图" prop="code_num">
                    <el-upload
                        action="https://www.colynlu.cn/upload"
                        list-type="picture-card"
                        multiple
                        :on-preview="preview"
                        :on-success="successUploadTreeImg"
                        :file-list="fileListTreeImg"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
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
import { getAllTree, deleteTree, editTree, addTree } from '../../api/tree';
export default {
    name: 'TreeManagement',
    data() {
        return {
            query: {
                tree: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            treeForm: {
                tree_name: '',
                tree_icon: '',
                tree_mid_icon: '',
                tree_big_icon: '',
                bg_icon: '',
                tree_status: ''
            },
            idx: -1,
            id: -1,
            titleType: '',
            dialogVisible: false,
            dialogImageUrl: '',
            temp: {},
            fileListTreeImg: [],
            fileListTreeIcon: []
        };
    },
    created() {
        this.getData();
    },
    computed: {},
    methods: {
        preview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        successUploadTreeIcon(file) {
            console.log(file); //上传成功后，后台会返回前台一个图片链接
            this.treeForm.tree_icon = file.filename;
        },
        successUploadTreeImg(file) {
            console.log(file); //上传成功后，后台会返回前台一个图片链接
            this.treeForm.tree_img = file.filename;
        },

        getData() {
            getAllTree({ tree: this.query.tree, page: this.query.pageIndex }).then(res => {
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
            console.log(row.tree_id);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteTree({ tree_id: row.tree_id }).then(res => {
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

        // 新建操作
        handleAdd(type) {
            this.titleType = type == 'add' ? '新建' : '编辑';
            this.treeForm = {};
            this.editVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.temp = Object.assign({}, row);
            this.titleType = this.titleType == 'add' ? '新建' : '编辑';
            this.idx = index;
            this.treeForm = row;
            console.log('row', row);
            this.editVisible = true;

            this.fileListTreeImg = [
                {
                    url: this.temp.tree_img,
                    name: 'img'
                }
            ];

            this.fileListTreeIcon = [
                {
                    url: this.temp.tree_icon,
                    name: 'img'
                }
            ];
        },
        // 保存新建
        saveAdd() {
            console.log('saveAdd', this.treeForm);
            // return;

            this.$refs['treeForm'].validate(valid => {
                if (valid) {
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
    width: 80px;
    height: 100px;
}
.table-td-thumb-square {
    display: block;
    margin: auto;
    width: 80px;
    height: 80px;
}
</style>
