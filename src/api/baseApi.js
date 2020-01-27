import http from '@/utils/http';

export const homeContent = () => {
  return http({
    url: '/home/content',
    method: 'get'
  });
};

export const login = (data) => {
  return http({
    url: '/sso/login',
    method: 'post',
    data: data
  });
};

export const signUp = (user) => {
  return http({
    url: '/user_signUp',
    method: 'POST',
    data: {
      user: user
    }
  });
};

// 判断用户手机是否注册过
export const isExist = (phone) => {
  return http({
    url: '/user_isExist',
    method: 'POST',
    data: {
      phone: phone
    }
  });
};

// 查找商品
export const goodsList = (goodsName, merchantId, pageSize, pageNum) => {
  let param = '';
  const page = pageSize || 1;
  const num = pageNum || 16;
  if (merchantId) param += `merchantId=${merchantId}&`;
  if (goodsName) param += `goodsName=${goodsName}&`;
  param += `page=${page}&pageSize=${num}`;
  console.log(param);
  return http({
    url: `/uGoods_list?${param}`,
    method: 'POST'
  });
};

// 根据商品ID 查询商品
export const getOneGoods = (goodsId) => {
  return http({
    url: `/uGoods_one`,
    method: 'POST',
    data: {
      goodsId: goodsId
    }
  });
};

// 根据父分类id获取分类
export const getCategory = (parentId) => {
  return http({
    url: '/home/productCateList/' + parentId,
    method: 'get'
  });
};
