export default  {

    BRAND: {
        name: 'IBRAND',
        logo: 'https://wx.qlogo.cn/mmhead/Q3auHgzwzM6OM5hb6yiap47BtficrcdCy0qviaOvpeYALPVBIdRzsgLxQ/0',
        // https://demo-open-admin.ibrand.cc/
        //https://admin-dev.ibrand.cc/
        //https://dev-open-admin.ibrand.cc/
        //dev-open-admin-swoole.ibrand.cc/
    },
    GLOBAL: {
        baseUrl: process.env.NODE_ENV === 'development' ? 'https://dev-open-admin-swoole.ibrand.cc/' : 'https://dev-open-admin-swoole.ibrand.cc/', // 运行时自动替换变量
    },
    PACKAGES: {
        author: true   // 是否显示技术支持
    }

}