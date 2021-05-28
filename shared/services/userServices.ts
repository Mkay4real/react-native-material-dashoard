import { get } from '../utils/userUtils';

// User specific

export const getRolesByUserId  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/user/role/'+id)();

    return data?.responses as Array<string>;
  } catch (error) {
    console.log(error, error.response.data);
  }
}

export const getMenusByUserId  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/user/menu/'+id)();

    return data?.responses as Array<string> ||[];
  } catch (error) {
    console.log(error, error.response.data);
  }
}

export const getAccountsByUserId  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/user/account/'+id)();

    return data?.responses as Array<string>;
  } catch (error) {
    console.log(error, error.response.data);
  }
}

export const getChannelsByUserId  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/user/channel/'+id)();

    return data?.responses as Array<string>;
  } catch (error) {
    console.log(error, error.response.data);
  }
}

export const getUserById  = async (id: string)=> {
  try {
    const data  = await get<any>('/v1/user/'+id)();

    return data;
  } catch (error) {
    console.log(error, error.response.data);
  }
}


//Corporate specific

export const getCorpById  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/corporate/'+id)();

    return data;
  } catch (error) {
    console.log(error, error.response.data);
  }
}

export const getAccountsByCorpId  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/corporate/account/'+id)();

    return data?.responses;
  } catch (error) {
    console.log(error, error.response.data);
  }
}

export const getDepartmentsByCorpId  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/corporate/department/'+id)();

    return data?.responses;
  } catch (error) {
    console.log(error, error.response.data);
  }
}

export const getRolesByCorpId  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/corporate/role/'+id)();

    return data?.responses;
  } catch (error) {
    console.log(error, error.response.data);
  }
}

export const getChannelsByCorpId  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/corporate/channel/'+id)();

    return data?.responses;
  } catch (error) {
    console.log(error, error.response.data);
  }
}


export const getUsersByCorpId  = async (id: string)=> {
  try {
   const data= await get<any>('/v1/corporate/user/'+id)();

    return data?.responses;
  } catch (error) {
    console.log(error, error.response.data);
  }
}
