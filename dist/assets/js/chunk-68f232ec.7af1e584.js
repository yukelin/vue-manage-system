(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68f232ec"],{"1b89":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"任务"},model:{value:e.query.work,callback:function(t){e.$set(e.query,"work",t)},expression:"query.work"}}),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("搜索")]),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){return e.handleAdd("add")}}},[e._v("新建任务")])],1),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:"","header-cell-class-name":"table-header"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",index:function(t){return t+1+(e.query.pageIndex-1)*e.query.pageSize}}}),a("el-table-column",{attrs:{prop:"name",label:"任务标题",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.work_name))]}}])}),a("el-table-column",{attrs:{label:"任务内容",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.work_content))]}}])}),a("el-table-column",{attrs:{prop:"date",label:"创建时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.createdAt))]}}])}),a("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","current-page":e.query.pageIndex,"page-size":e.query.pageSize,total:e.pageTotal},on:{"current-change":e.handlePageChange}})],1)],1),a("el-dialog",{attrs:{title:e.titleType,visible:e.editVisible,width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[a("el-form",{ref:"codeForm",attrs:{model:e.codeForm,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"任务标题",prop:"work_name",rules:[{required:!0,message:"不能为空"}]}},[a("el-input",{model:{value:e.codeForm.work_name,callback:function(t){e.$set(e.codeForm,"work_name",t)},expression:"codeForm.work_name"}})],1),a("el-form-item",{attrs:{label:"任务内容",prop:"work_content",rules:[{required:!0,message:"不能为空"}]}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:4},placeholder:"请输入内容"},model:{value:e.codeForm.work_content,callback:function(t){e.$set(e.codeForm,"work_content",t)},expression:"codeForm.work_content"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){"新建"==e.titleType?e.saveAdd():e.saveEdit()}}},[e._v("确 定")])],1)],1)],1)},o=[],i=a("b775"),l=function(e){return Object(i["a"])({url:"get_all_work",method:"get",params:e})},r=function(e){return Object(i["a"])({url:"del_work",method:"get",params:e})},s=function(e){return Object(i["a"])({url:"edit_work",method:"post",data:e})},c=function(e){return Object(i["a"])({url:"create_work",method:"post",data:e})},d={name:"WorkManagement",data:function(){return{query:{work:"",pageIndex:1,pageSize:10},tableData:[],multipleSelection:[],delList:[],editVisible:!1,pageTotal:0,codeForm:{},idx:-1,id:-1,titleType:""}},created:function(){this.getData()},computed:{},methods:{getData:function(){var e=this;l({work:this.query.work,page:this.query.pageIndex}).then((function(t){e.tableData=t.data,e.pageTotal=t.total}))},handleSearch:function(){this.$set(this.query,"pageIndex",1),this.getData()},handleDelete:function(e,t){var a=this;console.log(t.id),this.$confirm("确定要删除吗？","提示",{type:"warning"}).then((function(){r({id:t.id}).then((function(t){200==t.code&&(a.$message.success("删除成功"),a.tableData.splice(e,1))}))})).catch((function(){a.$message.error("删除失败")}))},handleSelectionChange:function(e){this.multipleSelection=e},handleAdd:function(e){this.titleType="add"==e?"新建":"编辑",this.codeForm={},this.editVisible=!0},handleEdit:function(e,t){this.titleType="add"==this.titleType?"新建":"编辑",this.idx=e,this.codeForm=t,this.editVisible=!0},saveAdd:function(){var e=this;this.$refs["codeForm"].validate((function(t){if(!t)return console.log("error submit!!"),!1;console.log("saveAdd",e.codeForm),c(e.codeForm).then((function(t){console.log("aaaaaaaaa",t),200==t.code&&(e.editVisible=!1,e.$message.success("新建成功"),e.getData())}))}))},saveEdit:function(){var e=this;this.$refs["codeForm"].validate((function(t){if(!t)return console.log("error submit!!"),!1;s(e.codeForm).then((function(t){e.editVisible=!1,e.$message.success("修改第 ".concat(e.idx+1," 行成功")),e.$message.success("修改成功"),e.$set(e.tableData,e.idx,e.codeForm)}))}))},handlePageChange:function(e){this.$set(this.query,"pageIndex",e),console.log("val",this.query),this.getData()}}},u=d,p=(a("ef3b"),a("2877")),h=Object(p["a"])(u,n,o,!1,null,"881b78f2",null);t["default"]=h.exports},"25ac":function(e,t,a){},ef3b:function(e,t,a){"use strict";var n=a("25ac"),o=a.n(n);o.a}}]);
//# sourceMappingURL=chunk-68f232ec.7af1e584.js.map