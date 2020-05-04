import request from '../utils/request';

// 获取energylog列表
export const getAllEnergyLog = (query) => {
    return request({
        url: 'get_all_energy_log',
        method: 'get',
        params: query
    });
};

// 删除energylog
export const deleteEnergyLog = (query) => {
    return request({
        url: 'del_energy_log',
        method: 'get',
        params: query
    });
};


