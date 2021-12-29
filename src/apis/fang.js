import $api from "./api";
//添加房产
export const  addBuild = async (data)=>{
    const res = await $api.post('/build/add',data);
    return res.data
}
// 获取房产信息
export const getAllBuild = async (data)=>{
    const res = await $api.post('/build/queryBuild',data);
    return res.data
}
// 查看单个房产信息
export const getBuildInfo = async (data)=>{
    const res = await $api.post('/build/buildInfo',data);
    return res.data
}

// 修改房产信息
export const updateBuild =  async (data)=>{
    const res = await $api.post('/build/update',data);
    return res.data
}


export  const addRoom = async (data)=>{
    const res = await $api.post('/room/add',data);
    return res.data
}

export  const editRoom = async (data)=>{
    const res = await $api.post('/room/update',data);
    return res.data
}

export const getRoomList  = async (data)=>{
    const res = await $api.post('/room/queryBuild',data);
    return res.data
}

// 获取房间详细信息
export const getRoomInfo = async (data)=>{
    const res = await $api.post('/room/roomInfo',data);
    return res.data
} 


export const removeRoom = async (data)=>{
    const res = await $api.post('/room/remove',data);
    return res.data
} 

