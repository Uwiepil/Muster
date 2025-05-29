<template>
  <view class="container">
    <!-- 顶部自定义导航栏 -->
    <view class="custom-navbar fixed-navbar">
      <text class="navbar-title">我的</text>
    </view>
    
    <!-- 用户信息区域 -->
    <view class="user-info">
      <image class="avatar" :src="avatarUrl" mode="aspectFill"></image>
      <view class="user-details" v-if="isLoggedIn">
        <text class="login-text">{{ nickName }}</text>
        <text class="user-id">ID: {{ openid }}</text>
      </view>
      <view class="user-details" v-else>
        <text class="login-text">请登录</text>
        <text class="user-id">ID:</text>
        <button class="login-btn" @click="handleLogin">{{ loginButtonText }}</button>
      </view>
    </view>
    
    <!-- 菜单卡片 -->
    <view class="menu-cards">
      <!-- 用户须知 -->
      <view class="menu-card" @click="showAgreement">
        <view class="card-icon notice-icon">🔊</view>
        <text class="card-title">用户须知</text>
      </view>
      
      <!-- 用户设备 -->
      <view class="menu-card">
        <view class="card-icon device-icon">📦</view>
        <text class="card-title">用户设备</text>
      </view>
    </view>
    
    <!-- 剧情角色区块 -->
    <view class="section-block">
      <view class="section-header">
        <text class="section-title">剧情角色</text>
        <text class="view-all">查看全部</text>
      </view>
    </view>
    
    <!-- 克隆声音区块 -->
    <view class="section-block">
      <view class="section-header">
        <text class="section-title">克隆声音</text>
        <text class="view-all">查看全部</text>
      </view>
    </view>
    
    <!-- 退出登录按钮，仅登录后显示 -->
    <view class="logout-section" v-if="isLoggedIn">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </view>
    
    <!-- 用户须知弹窗 -->
    <user-agreement 
      :visible="showAgreementModal" 
      @agree="handleAgreeTerms" 
      @disagree="handleDisagreeTerms"
    />
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user.js';
import UserAgreement from '@/components/UserAgreement.vue';

// 状态管理 - 避免直接依赖store的响应式
const userStore = useUserStore();
const showAgreementModal = ref(false);

// 本地状态，避免直接引用store中的响应式状态
const isLoggedIn = ref(false);
const nickName = ref('');
const openid = ref('');
const avatarUrl = ref('/static/default-avatar.png');

// 登录按钮文本
const loginButtonText = computed(() => {
  // #ifdef MP-WEIXIN
  return '微信一键登录';
  // #endif
  
  // #ifdef H5
  return '立即登录';
  // #endif
  
  return '一键登录';
});

// 初始化函数
const initUserInfo = () => {
  try {
    // 先尝试加载本地存储的用户信息
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
      try {
        const parsedInfo = JSON.parse(userInfo);
        nickName.value = parsedInfo.nickName || '';
        avatarUrl.value = parsedInfo.avatarUrl || '/static/default-avatar.png';
        openid.value = parsedInfo.openid || '';
        isLoggedIn.value = !!parsedInfo.token;
      } catch (e) {
        console.error('Parse user info error:', e);
      }
    }
  } catch (e) {
    console.error('Load user info error:', e);
  }
};

// 页面加载时初始化
onMounted(() => {
  // 初始化用户信息
  initUserInfo();
});

// 登录处理
const handleLogin = () => {
  // H5环境
  // #ifdef H5
  nickName.value = 'H5测试用户';
  avatarUrl.value = '/static/default-avatar.png';
  openid.value = 'h5-mock-openid';
  isLoggedIn.value = true;
  
  // 保存到本地
  const userInfo = {
    token: 'h5-mock-token',
    nickName: nickName.value,
    avatarUrl: avatarUrl.value,
    openid: openid.value
  };
  
  try {
    uni.setStorageSync('userInfo', JSON.stringify(userInfo));
  } catch (e) {
    console.error('Save user info error:', e);
  }
  
  uni.showToast({
    title: '登录成功',
    icon: 'success'
  });
  return;
  // #endif
  
  // 微信环境
  // #ifdef MP-WEIXIN
  uni.getUserProfile({
    desc: '用于完善用户资料',
    success: (res) => {
      const userInfo = res.userInfo;
      nickName.value = userInfo.nickName;
      avatarUrl.value = userInfo.avatarUrl;
      openid.value = 'wx-' + Date.now();
      isLoggedIn.value = true;
      
      // 保存到本地
      const storeInfo = {
        token: 'wx-mock-token',
        nickName: nickName.value,
        avatarUrl: avatarUrl.value,
        openid: openid.value
      };
      
      try {
        uni.setStorageSync('userInfo', JSON.stringify(storeInfo));
      } catch (e) {
        console.error('Save user info error:', e);
      }
      
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });
    },
    fail: (err) => {
      console.error('Login failed:', err);
      uni.showToast({
        title: '登录失败',
        icon: 'none'
      });
    }
  });
  // #endif
};

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        try {
          uni.removeStorageSync('userInfo');
        } catch (e) {
          console.error('Remove user info error:', e);
        }
        
        nickName.value = '';
        avatarUrl.value = '/static/default-avatar.png';
        openid.value = '';
        isLoggedIn.value = false;
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        });
      }
    }
  });
};

// 显示用户须知
const showAgreement = () => {
  showAgreementModal.value = true;
};

// 处理同意用户须知
const handleAgreeTerms = () => {
  showAgreementModal.value = false;
  
  try {
    // 设置本地存储
    uni.setStorageSync('hasAgreedToTerms', 'true');
    uni.setStorageSync('hasVisitedMinePage', 'true');
  } catch (e) {
    console.error('Save agreement status error:', e);
  }
};

// 处理不同意用户须知
const handleDisagreeTerms = () => {
  showAgreementModal.value = false;
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
  padding-bottom: 120rpx;
}
.custom-navbar {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff9f2;
  font-weight: bold;
  font-size: 38rpx;
  letter-spacing: 2rpx;
}
.navbar-title {
  color: #333;
}

/* 用户信息区域 */
.user-info {
  display: flex;
  align-items: center;
  padding: 32rpx;
  background: #fff9f2;
}
.avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background-color: #e0e0e0;
}
.user-details {
  margin-left: 30rpx;
  display: flex;
  flex-direction: column;
}
.login-text {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}
.user-id {
  font-size: 28rpx;
  color: #999;
  margin-bottom: 20rpx;
}
.login-btn {
  margin-top: 20rpx;
  background-color: #07c160;
  color: #fff;
  font-size: 28rpx;
  border-radius: 40rpx;
  width: 240rpx;
  height: 70rpx;
  line-height: 70rpx;
  padding: 0;
}

/* 菜单卡片 */
.menu-cards {
  padding: 0 24rpx;
}
.menu-card {
  display: flex;
  align-items: center;
  padding: 40rpx 30rpx;
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}
.card-icon {
  font-size: 48rpx;
  color: #ff9800;
  margin-right: 24rpx;
}
.card-title {
  font-size: 32rpx;
  font-weight: 500;
}

/* 区块样式 */
.section-block {
  background: #fff;
  border-radius: 20rpx;
  margin: 24rpx;
  padding: 30rpx;
  margin-bottom: 24rpx;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-title {
  font-size: 32rpx;
  font-weight: bold;
}
.view-all {
  font-size: 28rpx;
  color: #999;
}

/* 退出登录按钮 */
.logout-section {
  padding: 40rpx 24rpx;
}
.logout-btn {
  width: 100%;
  background-color: #f5f5f5;
  color: #666;
  font-size: 30rpx;
  border-radius: 8rpx;
}
</style> 