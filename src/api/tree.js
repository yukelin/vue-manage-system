import request from '../utils/request';

// 获取tree列表
export const getAllTree = (query) => {
    return request({
        url: 'get_all_tree',
        method: 'get',
        params: query
    });
};

// 删除tree
export const deleteTree = (query) => {
    return request({
        url: 'del_tree',
        method: 'get',
        params: query
    });
};

// 编辑tree
export const editTree = (query) => {
    return request({
        url: 'edit_tree',
        method: 'post',
        data: query
    });
};

// 新建tree
export const addTree = (query) => {
    return request({
        url: 'create_tree',
        method: 'post',
        data: query
    });
};


