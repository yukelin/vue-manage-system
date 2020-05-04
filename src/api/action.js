import request from '../utils/request';

// 获取code列表
export const getAllAction = (query) => {
    return request({
        url: 'get_all_action',
        method: 'get',
        params: query
    });
};

// 删除action
export const deleteAction = (query) => {
    return request({
        url: 'del_action',
        method: 'get',
        params: query
    });
};

// 编辑action
export const editAction = (query) => {
    return request({
        url: 'edit_action',
        method: 'post',
        data: query
    });
};

// 新建action
export const addAction = (query) => {
    return request({
        url: 'create_action',
        method: 'post',
        data: query
    });
};


