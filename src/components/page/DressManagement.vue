<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.dress" placeholder="装扮" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd('add')">新建装扮</el-button>
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
                <el-table-column prop="name" label="装扮名称" align="center">
                    <template slot-scope="scope">{{scope.row.dress_name}}</template>
                </el-table-column>
                <el-table-column label="装扮图标" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb-square"
                            :src="scope.row.dress_icon"
                            :preview-src-list="[scope.row.dress_icon]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="小树苗图" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.tree_mid_icon"
                            :preview-src-list="[scope.row.tree_mid_icon]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="user_energy" label="大树苗图" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.tree_big_icon"
                            :preview-src-list="[scope.row.tree_big_icon]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="user_energy" label="背景图" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.bg_icon"
                            :preview-src-list="[scope.row.bg_icon]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.dress_status==1?'success':'danger'"
                        >{{scope.row.dress_status==1?'上线中':'已下线'}}</el-tag>
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
            <el-form ref="dressForm" :model="dressForm" label-width="120px">
                <el-form-item
                    label="装扮名称"
                    prop="dress_name"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-input v-model="dressForm.dress_name"></el-input>
                </el-form-item>

                <el-form-item label="装扮图标" prop="dress">
                    <el-upload
                        action="https://www.colynlu.cn/upload"
                        list-type="picture-card"
                        multiple
                        :limit="1"
                        :on-success="successUploadDressIcon"
                        :file-list="fileListDressIcon"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                </el-form-item>

                <el-form-item label="小树苗图" prop="code_num">
                    <el-upload
                        action="https://www.colynlu.cn/upload"
                        list-type="picture-card"
                        multiple
                        :on-preview="preview"
                        :on-success="successUploadSmallIcon"
                        :file-list="fileListMidIcon"
                    >
                        <!-- <img v-if="dressForm.tree_mid_icon" :src="dressForm.tree_mid_icon" alt /> -->
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="大树苗图" prop="energy_value">
                    <el-upload
                        action="https://www.colynlu.cn/upload"
                        list-type="picture-card"
                        multiple
                        :on-preview="preview"
                        :on-success="successUploadMaxIcon"
                        :file-list="fileListMaxIcon"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="背景图" prop="bg_icon">
                    <el-upload
                        action="https://www.colynlu.cn/upload"
                        list-type="picture-card"
                        multiple
                        :on-preview="preview"
                        :on-success="successUploadBackground"
                        :file-list="fileListBgIcon"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    label="状态"
                    prop="dress_status"
                    :rules="[{ required: true, message: '不能为空'}]"
                >
                    <el-select v-model="dressForm.dress_status" placeholder="请选择">
                        <el-option key="1" label="上线" value="1"></el-option>
                        <el-option key="0" label="下线" value="0"></el-option>
                    </el-select>
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
import { getAllDress, deleteDress, editDress, addDress } from '../../api/dress';
export default {
    name: 'DressManagement',
    data() {
        return {
            query: {
                dress: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            dressForm: {
                dress_name: '',
                dress_icon: '',
                tree_mid_icon: '',
                tree_big_icon: '',
                bg_icon: '',
                dress_status: ''
            },
            idx: -1,
            id: -1,
            titleType: '',
            dialogVisible: false,
            dialogImageUrl: '',
            temp: {},
            fileListMidIcon: [],
            fileListMaxIcon: [],
            fileListBgIcon: [],
            fileListDressIcon: []
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

        successUploadDressIcon(file) {
            console.log(file); //上传成功后，后台会返回前台一个图片链接
            this.dressForm.dress_icon = file.filename;
        },
        successUploadSmallIcon(file) {
            console.log(file); //上传成功后，后台会返回前台一个图片链接
            this.dressForm.tree_mid_icon = file.filename;
        },
        successUploadMaxIcon(file) {
            console.log(file); //上传成功后，后台会返回前台一个图片链接
            this.dressForm.tree_big_icon = file.filename;
        },
        successUploadBackground(file) {
            console.log(file); //上传成功后，后台会返回前台一个图片链接
            this.dressForm.bg_icon = file.filename;
        },

        getData() {
            getAllDress({ dress: this.query.dress, page: this.query.pageIndex }).then(res => {
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
            console.log(row.dress_id);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteDress({ dress_id: row.dress_id }).then(res => {
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
            this.dressForm = {};
            this.editVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.temp = Object.assign({}, row);
            this.titleType = this.titleType == 'add' ? '新建' : '编辑';
            this.idx = index;
            this.dressForm = row;
            console.log('row', row);
            this.editVisible = true;

            this.fileListMidIcon = [
                {
                    url: this.temp.tree_mid_icon,
                    name: 'img'
                }
            ];

            this.fileListMaxIcon = [
                {
                    url: this.temp.tree_big_icon,
                    name: 'img'
                }
            ];

            this.fileListBgIcon = [
                {
                    url: this.temp.bg_icon,
                    name: 'img'
                }
            ];

            this.fileListDressIcon = [
                {
                    url: this.temp.dress_icon,
                    name: 'img'
                }
            ];
        },
        // 保存新建
        saveAdd() {
            console.log('saveAdd', this.dressForm);
            // return;

            this.$refs['dressForm'].validate(valid => {
                if (valid) {
                    addDress(this.dressForm).then(res => {
                        console.log('aaaaaaaaa', res);
                        if (res.code == 200) {
                            this.editVisible = false;
                            this.$message.success(`新建成功`);
                            // this.$set(this.tableData, this.total, this.dressForm);
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
            this.$refs['dressForm'].validate(valid => {
                if (valid) {
                    // console.log('saveEdit', this.dressForm);
                    editDress(this.dressForm).then(res => {
                        // console.log('aaaaaaaaa', res.data);
                        if (res.code == 200) {
                            this.editVisible = false;
                            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                            this.$message.success(`修改成功`);
                            this.$set(this.tableData, this.idx, this.dressForm);
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
