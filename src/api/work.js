import request from '../utils/request';

// 获取列表
export const getAllWork = (query) => {
    return request({
        url: 'get_all_work',
        method: 'get',
        params: query
    });
};

// 删除
export const deleteWork = (query) => {
    return request({
        url: 'del_work',
        method: 'get',
        params: query
    });
};

// 编辑
export const editWork = (query) => {
    return request({
        url: 'edit_work',
        method: 'post',
        data: query
    });
};

// 新建
export const addWork = (query) => {
    return request({
        url: 'create_work',
        method: 'post',
        data: query
    });
};


