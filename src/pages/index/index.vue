<template>
  <view class="container">
    <!-- 顶部自定义导航栏，固定在最上方 -->
    <view class="custom-navbar fixed-navbar">
      <text class="navbar-title">TEST玩具</text>
    </view>

    <!-- 卡片区 -->
    <view class="card-row">
      <view class="card create-card" @click="goToCreate">
        <view class="card-icon create-icon">+</view>
        <text class="card-title">创建</text>
      </view>
      <view class="card connect-card">
        <view class="card-icon connect-icon">🌐</view>
        <text class="card-title bold">连接设备</text>
        <text class="card-sn">SN: xxxxxxxx</text>
      </view>
    </view>

    <!-- 二级Tab -->
    <view class="tab-row">
      <view :class="['tab-btn', tabActive === 'drama' ? 'active' : '']" @tap="tabActive = 'drama'">剧情</view>
      <view :class="['tab-btn', tabActive === 'chat' ? 'active' : '']" @tap="tabActive = 'chat'">聊天</view>
    </view>

    <!-- 瀑布流卡片区 -->
    <view class="waterfall">
      <block v-for="(item, idx) in currentList" :key="item.id">
        <view class="waterfall-card">
          <image class="cover" :src="item.cover" mode="aspectFill" />
          <view class="tag">{{ item.tag }}</view>
          <view class="content-area">
            <view class="title">{{ item.title }}</view>
            <view class="card-bottom">
              <button v-if="userStore.isLoggedIn" class="use-btn" @click="handleUse(item)">去使用</button>
              <button v-else class="use-btn login-required" @click="showLoginTip">去使用</button>
            </view>
          </view>
        </view>
      </block>
    </view>
    
    <!-- 登录提示弹窗 -->
    <view class="login-modal" v-if="showLoginModal">
      <view class="login-modal-content">
        <view class="login-modal-title">提示</view>
        <view class="login-modal-text">请先登录后再操作</view>
        <view class="login-modal-btns">
          <button class="modal-btn cancel" @click="showLoginModal = false">取消</button>
          <button class="modal-btn confirm" @click="goToLogin">去登录</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user.js';

// 状态管理
const userStore = useUserStore();
const tabActive = ref('drama');
const showLoginModal = ref(false);

// 数据
const dramaList = ref([
  { id: 1, cover: '/static/drama1.jpg', tag: '台词腔', title: '白领女友的温柔早安' },
  { id: 2, cover: '/static/drama2.jpg', tag: '人妻', title: '豪门女主的秘密生活' },
  { id: 3, cover: '/static/drama3.jpg', tag: '外卖媛', title: '外卖小姐姐的贴心问候' },
  { id: 4, cover: '/static/drama4.jpg', tag: '病娇', title: '因爱执仗的少女' },
]);

const chatList = ref([
  { id: 5, cover: '/static/chat1.jpg', tag: '萌妹', title: '可爱萌妹陪你聊' },
  { id: 6, cover: '/static/chat2.jpg', tag: '御姐', title: '知性御姐的温柔夜话' },
  { id: 7, cover: '/static/chat3.jpg', tag: '萝莉', title: '萝莉的童真世界' },
  { id: 8, cover: '/static/chat4.jpg', tag: '男友', title: '贴心男友的陪伴' },
]);

// 计算属性
const currentList = computed(() => {
  return tabActive.value === 'drama' ? dramaList.value : chatList.value;
});

// 生命周期
onMounted(() => {
  userStore.init();
});

// 方法
const handleUse = (item) => {
  console.log('使用角色:', item);
  uni.showToast({
    title: `正在加载: ${item.title}`,
    icon: 'none'
  });
  // 这里添加跳转到详情页或使用页面的逻辑
};

const showLoginTip = () => {
  showLoginModal.value = true;
};

const goToLogin = () => {
  showLoginModal.value = false;
  uni.switchTab({
    url: '/pages/mine/mine'
  });
};

const goToCreate = () => {
  uni.navigateTo({
    url: '/pages/create/create'
  });
};
</script>

<style scoped>
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
}
.container {
  background: #fff;
  min-height: 100vh;
  padding-bottom: 120rpx;
  padding-top: 100rpx;
}
.custom-navbar {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #ffe5c2, #fff6e5);
  font-weight: bold;
  font-size: 38rpx;
  letter-spacing: 2rpx;
}
.navbar-title {
  color: #333;
}
.card-row {
  display: flex;
  justify-content: space-between;
  margin: 32rpx 24rpx 0 24rpx;
}
.card {
  flex: 1;
  background: #fff;
  border-radius: 18rpx;
  box-shadow: 0 2rpx 12rpx #f5e6d6;
  margin: 0 8rpx;
  padding: 24rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create-icon {
  font-size: 48rpx;
  color: #ff9800;
}
.connect-icon {
  font-size: 40rpx;
  color: #ff9800;
}
.card-title {
  margin-top: 8rpx;
  font-size: 30rpx;
}
.bold {
  font-weight: bold;
}
.card-sn {
  font-size: 22rpx;
  color: #bbb;
  margin-top: 4rpx;
}
.tab-row {
  display: flex;
  margin: 32rpx 24rpx 0 24rpx;
  border-bottom: 2rpx solid #f5e6d6;
}
.tab-btn {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
  padding: 18rpx 0;
  color: #bbb;
  font-weight: 500;
  border-bottom: 4rpx solid transparent;
}
.tab-btn.active {
  color: #ff9800;
  border-bottom: 4rpx solid #ff9800;
  font-weight: bold;
}
.waterfall {
  display: flex;
  flex-wrap: wrap;
  margin: 24rpx 12rpx 0 12rpx;
}
.waterfall-card {
  width: 46%;
  margin: 2%;
  background: #fff;
  border-radius: 18rpx;
  box-shadow: 0 2rpx 12rpx #f5e6d6;
  position: relative;
  overflow: hidden;
  margin-bottom: 24rpx;
  display: flex;
  flex-direction: column;
}
.cover {
  width: 100%;
  height: 220rpx;
  object-fit: cover;
  border-radius: 18rpx 18rpx 0 0;
}
.tag {
  position: absolute;
  top: 12rpx;
  left: 12rpx;
  background: #ff9800;
  color: #fff;
  font-size: 22rpx;
  border-radius: 8rpx;
  padding: 4rpx 14rpx;
  z-index: 2;
}
.content-area {
  padding: 16rpx;
  display: flex;
  flex-direction: column;
}
.title {
  color: #333;
  font-size: 28rpx;
  margin-bottom: 12rpx;
  line-height: 1.3;
  font-weight: 500;
}
.card-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rpx;
}
.use-btn {
  background: #ff9800;
  color: #fff;
  border-radius: 24rpx;
  font-size: 28rpx;
  padding: 8rpx 36rpx;
  border: none;
}
.login-required {
  opacity: 0.8;
}

/* 登录提示弹窗 */
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.login-modal-content {
  width: 580rpx;
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  padding: 40rpx 0 0 0;
}
.login-modal-title {
  font-size: 34rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}
.login-modal-text {
  font-size: 30rpx;
  color: #666;
  text-align: center;
  padding: 0 40rpx;
  margin-bottom: 50rpx;
}
.login-modal-btns {
  display: flex;
  border-top: 1rpx solid #eee;
}
.modal-btn {
  flex: 1;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  font-size: 32rpx;
  background: #fff;
  border-radius: 0;
}
.modal-btn.cancel {
  color: #999;
  border-right: 1rpx solid #eee;
}
.modal-btn.confirm {
  color: #ff9800;
  font-weight: bold;
}
</style>
