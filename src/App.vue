<script>
export default {
  onLaunch: function () {
    console.log('App Launch');
    
    // 检查本地存储中是否有同意协议的记录
    try {
      const hasAgreed = uni.getStorageSync('hasAgreedToTerms');
      // 如果没有同意过，显示协议页面
      if (hasAgreed !== 'true') {
        // 使用setTimeout避免可能的导航冲突
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/agreement/agreement'
          });
        }, 500);
      }
    } catch (e) {
      console.error('Check agreement status error:', e);
    }
  },
  
  onShow: function () {
    console.log('App Show')
  },
  
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
</style>
