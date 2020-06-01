import {config,getUrl,pageLogin,sandBox,cookieStorage} from '../../../lib/myapp.js';
Page({
    data:{
        detail:"",
        orderInfo:"",
        token:"",
        list: {balance: "0.00", earnings_commission: "0.00", unearnings_commission: "0.00"}
    },
    onShow(){
        var token=cookieStorage.get('user_token');
        this.setData({
            token:token
        });
        var bgConfig = cookieStorage.get('globalConfig') || '';
        var initInfo = cookieStorage.get('init');

        this.setData({
            config: bgConfig,
            initInfo: initInfo,
            author: initInfo && initInfo.other_technical_support ? initInfo.other_technical_support : ''
        })
        if(token){
            this.getUserInfo();
            this.getCenter();
        }
    },
    jumpAfterSales() {
        if (!this.data.token) {
            return this.jumpLogin();
        }
        wx.navigateTo({
            url: '/pages/afterSales/index/index'
        })
    },
    port() {
        var token = cookieStorage.get('user_token');
        sandBox.get({
            api: 'api/distribution/balance',
            header: {
                Authorization: token
            }
        }).then(res => {
            if (res.statusCode == 200) {
                var res = res.data;
                if (res.status) {
                    this.setData({
                        list: res.data
                    })
                    
                }
            }
        })
    },
    getUserInfo() {
        sandBox.get({
            api: 'api/me',
            header: {
                Authorization: cookieStorage.get('user_token')
            },
        }).then(res => {
            if (res.data.data.status) {
                // 此处控制我的奖励部分的显示与隐藏
                let agent = res.data.data.is_agent;
                if (agent == 1) {
                    this.port()
                    this.setData({
                        userAgent: true,
                        detail:res.data.data
                    })
                   
                } else {
                    this.setData({
                        userAgent: false,
                    })
                }
                if (!res.data.data.mobile || !res.data.data.user_info_fill) {
                    this.setData({
                        top: 0,
                        bottom: '5px'
                    })
                }
                this.setData({
                    detail: res.data.data,
                    init: true
                })
                cookieStorage.set('userInfoImg', res.data.data.avatar)
                cookieStorage.set('userInfoName', res.data.data.nick_name) 
            }
        })
    },

    jump(e){
        if(!this.data.token){
            return this.jumpLogin();
        }
        var status=e.currentTarget.dataset.status;
        wx.navigateTo({
            url: '/pages/order/index/index?type='+status
        })
    },
    jumpItem(e) {
        if(!this.data.token){
            return this.jumpLogin();
        }
        var url = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: url
        })
    },
    jumpAfterSales() {
        if (!this.data.token) {
            return this.jumpLogin();
        }
        wx.navigateTo({
            url: '/pages/afterSales/index/index'
        })
    },
    jumpLogin(){
        wx.navigateTo({
            url: '/pages/user/register/register'
        })
    },
    bindgetuserinfo(e) {
        // 说明用户同意授权
        if (e.detail.userInfo) {
            this.updateUserInfo(e.detail.userInfo)
        }
    },
    // 更新用户信息
    updateUserInfo(e){
        wx.showLoading({
            title: '更新中',
            mask: true
        })
        sandBox.post({
            api: 'api/users/update/info',
            header:{
                Authorization:cookieStorage.get('user_token')
            },

            data:{
                nick_name:e.nickName,
                sex:e.gender == 1 ? '男' : '女',
                avatar:e.avatarUrl,
            },
        }).then(res =>{
            if(res.statusCode==200){
                res = res.data;
                if (res.status) {
                    wx.showToast({
                        title:'修改成功',
                        duration: 1500,
                        success:()=>{
                            setTimeout(()=>{
                                this.getUserInfo();
                            },1500);
                        }
                    })
                } else {
                    wx.showModal({
                        content:res.message ||  "更新失败",
                        showCancel: false
                    });
                }
                wx.hideLoading();
            }
            else{
                wx.showModal({
                    content:"更新失败",
                    showCancel: false
                });
                wx.hideLoading();
            }
        })
    },
    jumpBalance() {
        if (!this.data.token) {
            return this.jumpLogin();
        }
        wx.navigateTo({
            url: '/pages/recharge/balance/balance'
        })
    },
    //获取页面信息
    getCenter(){
        var token=cookieStorage.get('user_token');
        sandBox.get({
            api: 'api/users/ucenter',
            header:{
                Authorization:token
            },
        }).then(res =>{
            if(res.data.status){
                this.setData({
                    orderInfo:res.data.data
                })
            }
        })
    }

})
