import http from '@/utils/http';

// 查找商品
export const goodsList = (goodsName, pageSize, pageNum) => {
  let param = '';
  const page = pageSize || 0;
  const num = pageNum || 16;
  if (goodsName) param += `keyword=${goodsName}&`;
  param += `pageNum=${page}&pageSize=${num}`;
  console.log(param);
  return http({
    url: `/mall-search/esProduct/search/simple?${param}`,
    method: 'get'
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
