import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref('');
  const nickName = ref('');
  const avatarUrl = ref('');
  const openid = ref('');
  const isLoggedIn = ref(false);
  const hasAgreedToTerms = ref(false);
  const hasVisitedMinePage = ref(false);

  // 初始化：从本地存储加载用户信息
  function init() {
    try {
      const userInfo = uni.getStorageSync('userInfo');
      if (userInfo) {
        const parsedInfo = JSON.parse(userInfo);
        token.value = parsedInfo.token || '';
        nickName.value = parsedInfo.nickName || '';
        avatarUrl.value = parsedInfo.avatarUrl || '';
        openid.value = parsedInfo.openid || '';
        isLoggedIn.value = !!parsedInfo.token;
      }
      
      const agreedStatus = uni.getStorageSync('hasAgreedToTerms');
      hasAgreedToTerms.value = agreedStatus === 'true';
      
      const visitedMine = uni.getStorageSync('hasVisitedMinePage');
      hasVisitedMinePage.value = visitedMine === 'true';
    } catch (e) {
      console.error('Failed to load user info from storage', e);
    }
  }

  // 登录
  async function login() {
    try {
      // 1. 获取用户信息
      const userProfileRes = await getUserProfile();
      
      // 2. 获取微信登录凭证
      const loginRes = await getWxLogin();
      
      // 3. 调用后端登录接口
      const loginData = await wxLogin(loginRes.code, userProfileRes.userInfo);
      
      // 4. 保存用户信息
      setUserInfo({
        token: loginData.token,
        nickName: userProfileRes.userInfo.nickName,
        avatarUrl: userProfileRes.userInfo.avatarUrl,
        openid: loginData.openid
      });
      
      return Promise.resolve(loginData);
    } catch (error) {
      console.error('Login failed:', error);
      return Promise.reject(error);
    }
  }

  // 获取用户信息
  function getUserProfile() {
    // H5环境下模拟用户信息
    // #ifdef H5
    return new Promise((resolve) => {
      resolve({
        userInfo: {
          nickName: 'H5测试用户',
          avatarUrl: '/static/default-avatar.png'
        }
      });
    });
    // #endif

    // 非H5环境下获取真实用户信息
    // #ifndef H5
    return new Promise((resolve, reject) => {
      uni.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
    // #endif
  }

  // 获取微信登录凭证
  function getWxLogin() {
    // H5环境下模拟登录凭证
    // #ifdef H5
    return new Promise((resolve) => {
      resolve({ code: 'mock-code-for-h5' });
    });
    // #endif

    // 非H5环境下获取真实登录凭证
    // #ifndef H5
    return new Promise((resolve, reject) => {
      uni.login({
        provider: 'weixin',
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
    // #endif
  }

  // 调用后端登录接口
  function wxLogin(code, userInfo) {
    // H5环境下模拟登录，避免API超时
    // #ifdef H5
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock-token-for-h5',
          openid: 'mock-openid-for-h5'
        });
      }, 300);
    });
    // #endif

    // 非H5环境下调用实际接口
    // #ifndef H5
    return new Promise((resolve, reject) => {
      uni.request({
        url: 'https://your-api.com/api/login/wechat',
        method: 'POST',
        data: {
          code,
          userInfo
        },
        success: (res) => {
          if (res.statusCode === 200 && res.data.token) {
            resolve(res.data);
          } else {
            reject(new Error('Login failed: ' + JSON.stringify(res.data)));
          }
        },
        fail: (err) => {
          reject(err);
        },
        // 设置超时时间
        timeout: 5000
      });
    });
    // #endif
  }

  // 保存用户信息
  function setUserInfo(userInfo) {
    token.value = userInfo.token || '';
    nickName.value = userInfo.nickName || '';
    avatarUrl.value = userInfo.avatarUrl || '';
    openid.value = userInfo.openid || '';
    isLoggedIn.value = !!userInfo.token;
    
    // 保存到本地存储
    uni.setStorageSync('userInfo', JSON.stringify(userInfo));
  }

  // 退出登录
  function logout() {
    token.value = '';
    nickName.value = '';
    avatarUrl.value = '';
    openid.value = '';
    isLoggedIn.value = false;
    
    // 清除本地存储
    uni.removeStorageSync('userInfo');
  }

  // 新增：设置用户同意须知状态
  function setAgreedToTerms(status) {
    hasAgreedToTerms.value = status;
    uni.setStorageSync('hasAgreedToTerms', status.toString());
  }

  // 新增：设置用户已访问我的页面
  function setVisitedMinePage(status) {
    hasVisitedMinePage.value = status;
    uni.setStorageSync('hasVisitedMinePage', status.toString());
  }

  return {
    // 状态
    token,
    nickName,
    avatarUrl,
    openid,
    isLoggedIn,
    hasAgreedToTerms,
    hasVisitedMinePage,
    
    // 方法
    init,
    login,
    setUserInfo,
    logout,
    setAgreedToTerms,
    setVisitedMinePage
  };
}); 