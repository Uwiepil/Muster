<template>
  <view class="container">
    <!-- 顶部自定义导航栏 -->
    <view class="custom-navbar fixed-navbar">
      <view class="navbar-left" @click="goBack">
        <text class="back-icon">〈</text>
      </view>
      <text class="navbar-title">新建剧本</text>
      <view class="navbar-right"></view>
    </view>
    
    <!-- 脚本编辑器区域 -->
    <view class="editor-content">
      <view class="form-group">
        <text class="form-label">剧本标题</text>
        <input type="text" class="form-input" v-model="scriptTitle" placeholder="请输入剧本标题" />
      </view>
      
      <view class="form-group">
        <text class="form-label">剧本类型</text>
        <picker mode="selector" :range="scriptTypes" @change="handleTypeChange" class="form-picker">
          <view class="picker-value">{{ scriptTypes[scriptTypeIndex] }}</view>
        </picker>
      </view>
      
      <view class="form-group">
        <text class="form-label">剧本内容</text>
        <textarea class="form-textarea" v-model="scriptContent" placeholder="请输入剧本内容" />
      </view>
      
      <button class="save-btn" @click="saveScript">保存剧本</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 状态
const scriptTitle = ref('');
const scriptTypeIndex = ref(0);
const scriptTypes = ['台词腔', '人妻', '外卖媛', '病娇', '其他'];
const scriptContent = ref('');

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 处理类型选择
const handleTypeChange = (e) => {
  scriptTypeIndex.value = e.detail.value;
};

// 保存剧本
const saveScript = () => {
  // 验证输入
  if (!scriptTitle.value) {
    uni.showToast({
      title: '请输入剧本标题',
      icon: 'none'
    });
    return;
  }
  
  if (!scriptContent.value) {
    uni.showToast({
      title: '请输入剧本内容',
      icon: 'none'
    });
    return;
  }
  
  // 这里添加保存逻辑
  uni.showToast({
    title: '保存成功',
    icon: 'success'
  });
  
  // 延迟返回
  setTimeout(() => {
    uni.navigateBack();
  }, 1500);
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

/* 编辑器样式 */
.editor-content {
  padding: 30rpx;
}
.form-group {
  margin-bottom: 30rpx;
}
.form-label {
  display: block;
  font-size: 30rpx;
  font-weight: 500;
  margin-bottom: 15rpx;
}
.form-input {
  width: 100%;
  height: 80rpx;
  background: #fff;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}
.form-picker {
  width: 100%;
  height: 80rpx;
  background: #fff;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
}
.picker-value {
  color: #333;
}
.form-textarea {
  width: 100%;
  height: 400rpx;
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}
.save-btn {
  margin-top: 50rpx;
  background: #ff9800;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 45rpx;
  font-size: 32rpx;
  font-weight: 500;
}
</style> 