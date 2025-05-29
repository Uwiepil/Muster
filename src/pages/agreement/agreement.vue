<template>
  <view class="container">
    <user-agreement 
      :visible="true" 
      @agree="handleAgree" 
      @disagree="handleDisagree"
    />
  </view>
</template>

<script setup>
import UserAgreement from '@/components/UserAgreement.vue';

// 处理同意事件
const handleAgree = () => {
  try {
    // 保存到本地存储
    uni.setStorageSync('hasAgreedToTerms', 'true');
    
    // 返回上一页或首页
    uni.navigateBack({
      fail: () => {
        uni.switchTab({
          url: '/pages/index/index'
        });
      }
    });
  } catch (e) {
    console.error('Save agreement status error:', e);
    // 发生错误时也返回首页
    uni.switchTab({
      url: '/pages/index/index'
    });
  }
};

// 处理不同意事件
const handleDisagree = () => {
  uni.showModal({
    title: '提示',
    content: '您需要同意用户须知才能继续使用本应用',
    showCancel: false,
    success: () => {
      // H5环境下返回首页
      uni.switchTab({
        url: '/pages/index/index'
      });
    }
  });
};
</script>

<style>
.container {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style> 