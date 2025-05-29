<template>
  <view class="container">
    <!-- 顶部自定义导航栏 -->
    <view class="custom-navbar fixed-navbar">
      <view class="navbar-left" @click="goBack">
        <text class="back-icon">〈</text>
      </view>
      <text class="navbar-title">创建</text>
      <view class="navbar-right"></view>
    </view>
    
    <!-- 创建选项区域 -->
    <view class="create-options">
      <view class="option-card" @click="goToScriptEditor">
        <view class="option-icon">📝</view>
        <view class="option-content">
          <text class="option-title">新建剧本</text>
          <text class="option-desc">创建自定义剧本和对话</text>
        </view>
      </view>
      
      <view class="option-card" @click="goToVoiceClone">
        <view class="option-icon">🎙️</view>
        <view class="option-content">
          <text class="option-title">克隆声音</text>
          <text class="option-desc">定制个性化语音</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js';

// 初始化用户状态
const userStore = useUserStore();

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 跳转到剧本编辑页
const goToScriptEditor = () => {
  // 检查是否已登录
  if (!userStore.isLoggedIn) {
    showLoginTip();
    return;
  }
  
  uni.navigateTo({
    url: '/pages/script/editor'
  });
};

// 跳转到声音克隆页
const goToVoiceClone = () => {
  // 检查是否已登录
  if (!userStore.isLoggedIn) {
    showLoginTip();
    return;
  }
  
  uni.navigateTo({
    url: '/pages/voice/clone'
  });
};

// 显示登录提示
const showLoginTip = () => {
  uni.showModal({
    title: '提示',
    content: '请先登录后再操作',
    confirmText: '去登录',
    success: (res) => {
      if (res.confirm) {
        uni.switchTab({
          url: '/pages/mine/mine'
        });
      }
    }
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
  background: #fff9f2;
  min-height: 100vh;
  padding-top: 100rpx;
  padding-bottom: 40rpx;
}
.custom-navbar {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #ffe5c2, #fff6e5);
  padding: 0 30rpx;
}
.navbar-left, .navbar-right {
  width: 60rpx;
  display: flex;
  align-items: center;
}
.back-icon {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}
.navbar-title {
  color: #333;
  font-weight: bold;
  font-size: 38rpx;
  letter-spacing: 2rpx;
}

/* 创建选项区域 */
.create-options {
  padding: 40rpx 30rpx;
}
.option-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}
.option-icon {
  font-size: 60rpx;
  margin-right: 30rpx;
}
.option-content {
  flex: 1;
}
.option-title {
  font-size: 34rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}
.option-desc {
  font-size: 28rpx;
  color: #999;
}
</style> 