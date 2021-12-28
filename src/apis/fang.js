import $api from "./api";
export const  addBuild = async (data)=>{
    const res = await $api.post('/build/add',data);
    return res.data
}

export const getAllBuild = async (data)=>{
    const res = await $api.post('/build/queryBuild',data);
    return res.data
}

export  const addRoom = async (data)=>{
    const res = await $api.post('/room/add',data);
    return res.data
}

export const getRoomList  = async (data)=>{
    const res = await $api.post('/room/queryBuild',data);
    return res.data
}
