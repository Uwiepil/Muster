<template>
  <view class="container">
    <!-- 顶部自定义导航栏 -->
    <view class="custom-navbar fixed-navbar">
      <view class="navbar-left" @click="goBack">
        <text class="back-icon">〈</text>
      </view>
      <text class="navbar-title">克隆声音</text>
      <view class="navbar-right"></view>
    </view>
    
    <!-- 声音克隆内容 -->
    <view class="voice-content">
      <view class="section-title">上传声音样本</view>
      
      <!-- 录音区域 -->
      <view class="voice-card">
        <view class="voice-action">
          <view class="action-icon" @click="toggleRecord">
            <text v-if="!isRecording">🎙️</text>
            <text v-else>⏹️</text>
          </view>
          <text class="action-text">{{ isRecording ? '停止录音' : '开始录音' }}</text>
        </view>
        
        <view class="voice-status">
          <text>{{ recordStatus }}</text>
          <text v-if="recordDuration > 0" class="duration">{{ recordDuration }}s</text>
        </view>
      </view>
      
      <!-- 上传录音文件 -->
      <view class="upload-card">
        <view class="upload-icon" @click="uploadVoiceFile">+</view>
        <text class="upload-text">上传音频文件</text>
        <text class="upload-desc">.mp3, .wav, 最大 10MB</text>
      </view>
      
      <!-- 声音样本列表 -->
      <view class="sample-list" v-if="voiceSamples.length > 0">
        <view class="section-title">已上传的样本</view>
        <view class="sample-item" v-for="(sample, index) in voiceSamples" :key="index">
          <view class="sample-info">
            <text class="sample-name">样本{{ index + 1 }}</text>
            <text class="sample-duration">{{ sample.duration }}s</text>
          </view>
          <view class="sample-actions">
            <text class="play-icon" @click="playSample(index)">▶️</text>
            <text class="delete-icon" @click="deleteSample(index)">🗑️</text>
          </view>
        </view>
      </view>
      
      <!-- 提交按钮 -->
      <button class="submit-btn" @click="submitVoiceClone" :disabled="voiceSamples.length === 0">
        {{ voiceSamples.length === 0 ? '请先上传声音样本' : '开始克隆声音' }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 状态
const isRecording = ref(false);
const recordStatus = ref('准备录音');
const recordDuration = ref(0);
const voiceSamples = ref([]);
let recordTimer = null;

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 切换录音状态
const toggleRecord = () => {
  if (isRecording.value) {
    stopRecord();
  } else {
    startRecord();
  }
};

// 开始录音
const startRecord = () => {
  isRecording.value = true;
  recordStatus.value = '正在录音...';
  recordDuration.value = 0;
  
  // 模拟录音计时
  recordTimer = setInterval(() => {
    recordDuration.value++;
    // 最多录制60秒
    if (recordDuration.value >= 60) {
      stopRecord();
    }
  }, 1000);
  
  // 这里添加实际录音的API调用
  uni.showToast({
    title: '开始录音',
    icon: 'none'
  });
};

// 停止录音
const stopRecord = () => {
  isRecording.value = false;
  recordStatus.value = '录音已完成';
  
  clearInterval(recordTimer);
  
  // 模拟添加录音样本
  voiceSamples.value.push({
    duration: recordDuration.value,
    url: 'sample.mp3'
  });
  
  // 这里添加实际停止录音API调用
  uni.showToast({
    title: '录音已保存',
    icon: 'success'
  });
};

// 上传音频文件
const uploadVoiceFile = () => {
  uni.showToast({
    title: '上传功能开发中',
    icon: 'none'
  });
  
  // 模拟添加上传样本
  setTimeout(() => {
    voiceSamples.value.push({
      duration: 25,
      url: 'upload.mp3'
    });
  }, 1000);
};

// 播放样本
const playSample = (index) => {
  uni.showToast({
    title: `播放样本${index + 1}`,
    icon: 'none'
  });
};

// 删除样本
const deleteSample = (index) => {
  voiceSamples.value.splice(index, 1);
  uni.showToast({
    title: '样本已删除',
    icon: 'success'
  });
};

// 提交声音克隆
const submitVoiceClone = () => {
  if (voiceSamples.value.length === 0) {
    return;
  }
  
  uni.showLoading({
    title: '处理中...'
  });
  
  // 模拟处理时间
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '声音克隆成功',
      icon: 'success'
    });
    
    // 延迟返回
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  }, 2000);
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

/* 声音克隆样式 */
.voice-content {
  padding: 30rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: 500;
  margin: 20rpx 0;
}
.voice-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}
.voice-action {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.action-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}
.action-text {
  font-size: 28rpx;
  color: #666;
}
.voice-status {
  display: flex;
  justify-content: space-between;
  font-size: 26rpx;
  color: #999;
  margin-top: 30rpx;
}
.duration {
  color: #ff9800;
}
.upload-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-icon {
  width: 100rpx;
  height: 100rpx;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60rpx;
  margin-bottom: 20rpx;
  color: #999;
}
.upload-text {
  font-size: 28rpx;
  font-weight: 500;
  margin-bottom: 10rpx;
}
.upload-desc {
  font-size: 24rpx;
  color: #999;
}
.sample-list {
  margin-top: 30rpx;
}
.sample-item {
  background: #fff;
  border-radius: 15rpx;
  padding: 20rpx 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sample-name {
  font-size: 28rpx;
  margin-bottom: 5rpx;
}
.sample-duration {
  font-size: 24rpx;
  color: #999;
}
.sample-actions {
  display: flex;
  gap: 20rpx;
}
.play-icon, .delete-icon {
  font-size: 34rpx;
}
.submit-btn {
  margin-top: 50rpx;
  background: #ff9800;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 45rpx;
  font-size: 32rpx;
  font-weight: 500;
}
button[disabled] {
  background: #f5f5f5;
  color: #999;
}
</style> 