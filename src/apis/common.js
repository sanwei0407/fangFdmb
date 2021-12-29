import $api from "./api";
export const  getBdSearch = async (data)=>{
    const res = await $api.post('/common/bdSearch',data);
    return res.data
}
export const  upload = async (data)=>{
    const res = await $api.post('/common/upload',data);
    return res.data
}

