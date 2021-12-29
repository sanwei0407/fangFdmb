import $api from "./api";

// 添加租客
export  const addClient = async (data)=>{
    const res = await $api.post('/live/add',data);
    return res.data
}

export const getAllClient = async (data)=>{
    const res = await $api.post('/live/queryBuild',data);
    return res.data
}

export const getClientInfoByRoomId = async (data)=>{
    const res = await $api.post('/live/liveInfo',data);
    return res.data
}


export const addBill = async (data)=>{
    const res = await $api.post('/bill/add',data);
    return res.data
}


export const getBillList = async (data)=>{
    const res = await $api.post('/bill/queryBuild',data);
    return res.data
}

