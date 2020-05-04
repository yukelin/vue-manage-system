import request from '../utils/request';

// 获取列表
export const getAllDress = (query) => {
    return request({
        url: 'get_all_dress',
        method: 'get',
        params: query
    });
};

// 删除
export const deleteDress = (query) => {
    return request({
        url: 'del_dress',
        method: 'get',
        params: query
    });
};

// 编辑
export const editDress = (query) => {
    return request({
        url: 'edit_dress',
        method: 'post',
        data: query
    });
};

// 新建
export const addDress = (query) => {
    return request({
        url: 'create_dress',
        method: 'post',
        data: query
    });
};


