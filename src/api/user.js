import request from '../utils/request';

// 获取用户列表
export const getAllUserInfo = (query) => {
    return request({
        url: 'get_all_user',
        method: 'get',
        params: query
    });
};

// 删除用户
export const deleteUser = (query) => {
    return request({
        url: 'del_user',
        method: 'get',
        params: query
    });
};
