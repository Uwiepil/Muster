<template>
  <view class="agreement-modal" v-if="visible">
    <view class="agreement-content">
      <view class="agreement-header">
        <text class="agreement-title">用户须知</text>
      </view>
      <scroll-view class="agreement-body" scroll-y show-scrollbar="true">
        <view class="agreement-inner">
          <view class="agreement-section">
            <view class="section-title">1 年龄与身份</view>
            <text class="section-item">1.1 本人已年满 18 周岁，具备完全民事行为能力；</text>
            <text class="section-item">1.2 本人承诺不得让未成年人接触或使用本平台内容及成人用品；</text>
          </view>
          
          <view class="agreement-section">
            <view class="section-title">2 AIGC 生成规范</view>
            <text class="section-item">2.1 不得生成、发布或传播淫秽色情（含未成年人或性交易）、赌博、暴力恐怖、歧视仇恨、危害国家安全、违法诈骗等信息；</text>
            <text class="section-item">2.2 不得输出侵犯知识产权、肖像权、隐私权或其他合法权益的内容；</text>
            <text class="section-item">2.3 应自行甄别生成内容的真实性与准确性，不得用生成内容冒充官方信息或误导他人；</text>
            <text class="section-item">2.4 不得上传或指令模型生成他人身份证号、联系方式、人脸图像等可识别个人信息，除非已获得合法授权；</text>
            <text class="section-item highlight-item">2.5 不得尝试逆向工程、导出模型权重或利用注入攻击规避审查；</text>
            <text class="section-item highlight-item">2.6 发现输出违规或存在安全隐患时，应立即停止使用并通过平台渠道反馈；</text>
          </view>
          
          <view class="agreement-section">
            <view class="section-title">3 其他遵守事项</view>
            <text class="section-item">3.1 成人用品仅供个人私密场景使用，应按说明书清洁、消毒并适度使用，如有疾病史应先咨询医生；</text>
            <text class="section-item">3.2 违反本须知或《AIGC 平台及成人用品中国境内用户使用规范》将导致警告、限制功能、封禁账号或配合监管调查；</text>
            <text class="section-item">3.3 若不同意本须知，请立即退出并停止使用本平台及相关产品。</text>
          </view>
        </view>
      </scroll-view>
      <view class="agreement-footer">
        <button class="btn-disagree" @click="handleDisagree">暂不进入</button>
        <button class="btn-agree" @click="handleAgree">确定</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['agree', 'disagree']);

// 处理同意事件
const handleAgree = () => {
  emit('agree');
};

// 处理不同意事件
const handleDisagree = () => {
  emit('disagree');
};
</script>

<style scoped>
.agreement-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.agreement-content {
  width: 80%;
  max-width: 600rpx;
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 88vh;
}

.agreement-header {
  padding: 20rpx 0;
  text-align: center;
  border-bottom: 1rpx solid #EEEEEE;
}

.agreement-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #FF9800;
}

.agreement-body {
  max-height: 70vh;
  box-sizing: border-box;
}

.agreement-inner {
  padding: 20rpx 35rpx 20rpx 30rpx;
}

.agreement-section {
  margin-bottom: 18rpx;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 10rpx;
  color: #333333;
  letter-spacing: 2rpx;
}

.section-item {
  font-size: 22rpx;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 12rpx;
  letter-spacing: 3.5rpx;
  display: block;
  text-align: left;
  white-space: pre-wrap;
  text-justify: inter-character;
  max-width: 520rpx;
}

.highlight-item {
  font-weight: 500;
  color: #333333;
}

.agreement-footer {
  display: flex;
  border-top: 1rpx solid #EEEEEE;
  margin-top: auto;
}

.btn-disagree, .btn-agree {
  flex: 1;
  height: 86rpx;
  line-height: 86rpx;
  text-align: center;
  font-size: 30rpx;
  margin: 0;
  border-radius: 0;
}

.btn-disagree {
  background: #FFFFFF;
  color: #999999;
  border-right: 1rpx solid #EEEEEE;
}

.btn-agree {
  background: #FF9800;
  color: #FFFFFF;
}
</style> 