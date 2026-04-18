export default defineAppConfig({
    pages: [
        'pages/index/index',
        'pages/statistics/index',
        'pages/editors/index',
        'pages/settings/index'
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#ffffff',
        navigationBarTitleText: '剪辑师计数',
        navigationBarTextStyle: 'black'
    },
    tabBar: {
        color: '#999999',
        selectedColor: '#2563eb',
        backgroundColor: '#ffffff',
        borderStyle: 'black',
        list: [
            {
                pagePath: 'pages/index/index',
                text: '录入',
                iconPath: './assets/tabbar/file-text.png',
                selectedIconPath: './assets/tabbar/file-text-active.png'
            },
            {
                pagePath: 'pages/statistics/index',
                text: '统计',
                iconPath: './assets/tabbar/chart-bar.png',
                selectedIconPath: './assets/tabbar/chart-bar-active.png'
            },
            {
                pagePath: 'pages/editors/index',
                text: '剪辑师',
                iconPath: './assets/tabbar/users.png',
                selectedIconPath: './assets/tabbar/users-active.png'
            },
            {
                pagePath: 'pages/settings/index',
                text: '设置',
                iconPath: './assets/tabbar/settings.png',
                selectedIconPath: './assets/tabbar/settings-active.png'
            }
        ]
    }
});
//# sourceMappingURL=app.config%202.js.map