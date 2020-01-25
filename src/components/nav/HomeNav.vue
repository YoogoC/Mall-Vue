<template>
  <div>
    <div class="nav-item">
      <ul>
        <li v-for="(item,index) in nav" :key="index">
          <a href="#">{{item}}</a>
        </li>
      </ul>
    </div>
    <div class="nav-body">
      <!-- 侧边导航 -->
      <div class="nav-side" ref="navSide">
        <ul>
          <li @mouseenter="showDetail(item)" @mouseleave="hideDetail()" v-for="(item, index) in categoryParent" :key="index">
            <span class="nav-side-item">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="nav-content">
        <!-- 幻灯片 -->
        <div>
          <Carousel autoplay loop>
              <CarouselItem  v-for="(item, index) in marketing.CarouselItems" :key="index">
                <router-link :to="{path: '/goodsList', query: { sreachData: '电脑'}}">
                  <img :src="item">
                </router-link>
              </CarouselItem>
          </Carousel>
        </div>
        <div class="nav-show">
          <div class="nav-show-img" v-for="(item, index) in marketing.activity" :key="index">
            <router-link :to="{path: '/goodsList', query: { sreachData: '电脑'}}">
              <img :src="item">
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 菜单栏 -->
    <transition name="fade">
      <div class="detail-item-panel"
        :duration="{ enter: 100, leave: 100 }"
        v-show="categoryData.showSubCategory"
        @mouseenter="showDetail(categoryData.currentShowParentItem)"
        ref="itemPanel"
        :style="{left: left + 'px', top: top + 'px'}"
        @mouseleave="hideDetail(categoryData.currentShowParentItem)">

        <ul>
          <li class="detail-item-row">
            <router-link :to="{path: '/goodsList', query: { sreachData: item }}" v-for="(item, subIndex) in categoryData.subCategoryList" :key="subIndex">
              <span class="detail-item">{{item.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import store from '@/vuex/store';
import {getCategory} from '@/api/baseApi';
import { mapState } from 'vuex';
export default {
  name: 'HomeNav',
  data () {
    return {
      left: 0,
      top: 0,
      actionNav: 99,
      nav: [
        '秒杀',
        '优惠券',
        '闪购',
        '拍卖',
        '服装城',
        '超市',
        '生鲜',
        '全球购',
        '金融'
      ],
      categoryParent: [],
      categoryData: {
        showSubCategory: false,
        currentShowParentItem: null,
        subCategoryList: []
      }
    };
  },
  computed: {
    ...mapState(['marketing'])
  },
  created () {
    this.getParentCarcategoryList();
  },
  methods: {
    getParentCarcategoryList () {
      getCategory(0).then(result => {
        this.categoryParent = result.data.data;
      });
    },
    showDetail (item) {
      this.categoryData.showSubCategory = true;
      this.categoryData.currentShowParentItem = item;
      getCategory(item.id).then(result => {
        this.categoryData.subCategoryList = result.data.data;
      });
    },
    hideDetail () {
      this.categoryData.showSubCategory = false;
    }
  },
  mounted () {
    if (this.$refs.navSide != null) {
      if (this.$refs.itemPanel1 != null) {
        this.$refs.itemPanel1.style.left =
          this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + 'px';
        this.$refs.itemPanel1.style.top = this.$refs.navSide.offsetTop + 'px';
      }
      if (this.$refs.itemPanel2 != null) {
        this.$refs.itemPanel2.style.left =
          this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + 'px';
        this.$refs.itemPanel2.style.top = this.$refs.navSide.offsetTop + 'px';
      }
    }
  },
  updated () {
    this.left = this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth;
    this.top = this.$refs.navSide.offsetTop;
  },
  store
};
</script>

<style scoped>
.nav-item {
  width: 680px;
  height: 36px;
  margin: 0px auto;
}
.nav-item ul {
  list-style: none;
  margin-left: 15px;
}
.nav-item li {
  float: left;
  font-size: 16px;
  font-weight: bold;

  margin-left: 30px;
}
.nav-item a {
  text-decoration: none;
  color: #555555;
}
.nav-item a:hover {
  color: #d9534f;
}
/*大的导航信息，包含导航，幻灯片等*/
.nav-body {
  width: 1020px;
  height: 485px;
  margin: 0px auto;
}
.nav-side {
  width: 200px;
  height: 100%;
  padding: 0px;
  color: #fff;
  float: left;
  background-color: #6e6568;
}
.nav-side ul {
  width: 100%;
  padding: 0px;
  padding-top: 15px;
  list-style: none;
}
.nav-side li {
  padding: 7.5px;
  padding-left: 15px;
  font-size: 14px;
  line-height: 18px;
}
.nav-side li:hover {
  background: #999395;
}
.nav-side-item:hover {
  cursor: pointer;
  color: #c81623;
}

/*导航内容*/
.nav-content {
  width: 792px;
  margin-left: 15px;
  overflow: hidden;
  float: left;
}
/*导航图片*/
.nav-show-img {
  margin-top: 10px;
  float: left;
}
.nav-show-img:nth-child(2) {
  margin-left: 12px;
}
/*显示商品*/
.content {
  width: 100%;
}
/*显示商品详细信息*/
.detail-item-panel {
  width: 815px;
  height: 485px;
  background-color: #fff;
  position: absolute;
  top: 168px;
  left: 389px;
  z-index: 999;
}
.nav-detail-item {
  margin-left: 26px;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  color: #eee;
}
.nav-detail-item span {
  padding: 6px;
  padding-left: 12px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6e6568;
}
.nav-detail-item span:hover {
  margin-left: 15px;
  background-color: #f44336;
}
.detail-item-panel ul {
  list-style: none;
}
.detail-item-panel li {
  line-height: 38px;
  margin-left: 40px;
}
.detail-item-title {
  padding-right: 6px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  color: #555555;
}
.detail-item-title:hover {
  color: #d9534f;
}
.detail-item-row a {
  color: #555555;
}
.detail-item{
  font-size: 14px;
  padding-left: 12px;
  padding-right: 8px;
  cursor: pointer;
  border-left: 1px solid #ccc;
}
.detail-item:hover {
  color: #d9534f;
}
</style>
