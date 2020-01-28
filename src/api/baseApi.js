import http from '@/utils/http';

export const homeContent = () => {
  return http({
    url: '/mall-portal/home/content',
    method: 'get'
  });
};

export const login = (data) => {
  return http({
    url: '/mall-portal/sso/login',
    method: 'post',
    data: data
  });
};

export const signUp = (user) => {
  return http({
    url: '/mall-portal/user_signUp',
    method: 'POST',
    data: {
      user: user
    }
  });
};

// 判断用户手机是否注册过
export const isExist = (phone) => {
  return http({
    url: '/mall-portal/user_isExist',
    method: 'POST',
    data: {
      phone: phone
    }
  });
};

// 根据商品ID 查询商品
export const getOneGoods = (goodsId) => {
  return http({
    url: `/mall-portal/uGoods_one`,
    method: 'POST',
    data: {
      goodsId: goodsId
    }
  });
};

// 根据父分类id获取分类
export const getCategory = (parentId) => {
  return http({
    url: '/mall-portal/home/productCateList/' + parentId,
    method: 'get'
  });
};
