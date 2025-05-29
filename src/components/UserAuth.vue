<template>
  <view class="user-auth">
    <button 
      v-if="!userStore.isLoggedIn" 
      class="auth-btn" 
      :class="[type]"
      open-type="getUserProfile"
      @click="handleLogin"
    >
      <slot>{{ btnText }}</slot>
    </button>
    <slot v-else name="logged"></slot>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.js';

// Props 定义
const props = defineProps({
  // 按钮类型: primary, default, plain
  type: {
    type: String,
    default: 'primary'
  },
  // 按钮文本
  text: {
    type: String,
    default: '微信一键登录'
  }
});

// 事件
const emits = defineEmits(['login-success', 'login-fail']);

// 状态
const userStore = useUserStore();
const btnText = computed(() => props.text);

// 登录处理
const handleLogin = async () => {
  try {
    await userStore.login();
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    });
    emits('login-success');
  } catch (error) {
    console.error('Login failed:', error);
    uni.showToast({
      title: '登录失败',
      icon: 'none'
    });
    emits('login-fail', error);
  }
};
</script>

<style scoped>
.user-auth {
  display: inline-block;
}

.auth-btn {
  border: none;
  font-size: 28rpx;
  border-radius: 40rpx;
  padding: 0 30rpx;
  height: 70rpx;
  line-height: 70rpx;
}

.primary {
  background-color: #07c160;
  color: #ffffff;
}

.default {
  background-color: #f0f0f0;
  color: #333333;
}

.plain {
  background-color: transparent;
  color: #07c160;
  border: 1px solid #07c160;
}
</style> 