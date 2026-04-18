import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { Settings, Info, Bell, UserPlus, Trash2 } from 'lucide-react-taro';
import { Switch } from "../../components/ui/switch";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Network } from "../../network";
const SettingsPage = () => {
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [newAdminOpenid, setNewAdminOpenid] = useState('');
    useEffect(() => {
        loadSettings();
        fetchAdmins();
    }, []);
    const loadSettings = () => {
        try {
            const enabled = Taro.getStorageSync('reminderEnabled');
            setReminderEnabled(enabled === true);
        }
        catch (error) {
            console.error('加载设置失败', error);
        }
    };
    const fetchAdmins = async () => {
        try {
            const res = await Network.request({
                url: '/api/admins',
                method: 'GET'
            });
            if (res.data && res.data.data) {
                setAdmins(res.data.data);
            }
        }
        catch (error) {
            console.error('获取管理员列表失败', error);
        }
    };
    const handleReminderToggle = (checked) => {
        try {
            Taro.setStorageSync('reminderEnabled', checked);
            setReminderEnabled(checked);
            console.log('提醒设置已更新', checked);
        }
        catch (error) {
            console.error('保存设置失败', error);
        }
    };
    const handleAddAdmin = async () => {
        if (!newAdminOpenid.trim()) {
            Taro.showToast({
                title: '请输入管理员OpenID',
                icon: 'none'
            });
            return;
        }
        try {
            const res = await Network.request({
                url: '/api/admins',
                method: 'POST',
                data: {
                    openid: newAdminOpenid.trim(),
                    nickname: '管理员'
                }
            });
            console.log('添加成功', res.data);
            setNewAdminOpenid('');
            setShowAddAdminModal(false);
            fetchAdmins();
            Taro.showToast({
                title: '添加成功',
                icon: 'success'
            });
        }
        catch (error) {
            console.error('添加失败', error);
            Taro.showToast({
                title: '添加失败',
                icon: 'none'
            });
        }
    };
    const handleDeleteAdmin = async (id) => {
        Taro.showModal({
            title: '确认删除',
            content: '确定要删除该管理员吗？',
            success: async (res) => {
                if (res.confirm) {
                    try {
                        await Network.request({
                            url: `/api/admins/${id}`,
                            method: 'DELETE'
                        });
                        fetchAdmins();
                        Taro.showToast({
                            title: '删除成功',
                            icon: 'success'
                        });
                    }
                    catch (error) {
                        console.error('删除失败', error);
                        Taro.showToast({
                            title: '删除失败',
                            icon: 'none'
                        });
                    }
                }
            }
        });
    };
    const handleGetMyOpenid = async () => {
        try {
            Taro.showLoading({ title: '获取中...' });
            // 1. 获取登录code
            const loginRes = await Taro.login();
            const code = loginRes.code;
            // 2. 调用后端接口获取openid
            const res = await Network.request({
                url: '/api/auth/openid',
                method: 'POST',
                data: { code }
            });
            if (res.data && res.data.data) {
                const openid = res.data.data.openid;
                // 3. 复制到剪贴板
                await Taro.setClipboardData({ data: openid });
                Taro.hideLoading();
                Taro.showModal({
                    title: 'OpenID',
                    content: openid,
                    showCancel: false,
                    confirmText: '已复制到剪贴板'
                });
            }
        }
        catch (error) {
            Taro.hideLoading();
            console.error('获取OpenID失败', error);
            Taro.showToast({
                title: '获取失败，请重试',
                icon: 'none'
            });
        }
    };
    return (_jsxs(View, { className: "min-h-screen bg-gray-50 pb-20", children: [_jsxs(View, { className: "bg-white p-4 border-b border-gray-200", children: [_jsx(Text, { className: "block text-xl font-bold text-gray-900", children: "\u8BBE\u7F6E" }), _jsx(Text, { className: "block text-xs text-gray-500 mt-1", children: "\u5E94\u7528\u914D\u7F6E\u548C\u8BF4\u660E" })] }), _jsxs(View, { className: "p-4", children: [_jsx(View, { className: "bg-white rounded-xl p-4 mb-4 border border-gray-100", children: _jsxs(View, { className: "flex items-center justify-between", children: [_jsxs(View, { className: "flex items-center gap-3", children: [_jsx(Bell, { size: 20, color: "#2563eb" }), _jsxs(View, { children: [_jsx(Text, { className: "block text-sm font-semibold text-gray-900", children: "\u6BCF\u665A\u63D0\u9192" }), _jsx(Text, { className: "block text-xs text-gray-500", children: "\u6BCF\u5929\u665A\u4E0A11\u70B9\u63D0\u9192\u5F55\u5165" })] })] }), _jsx(Switch, { checked: reminderEnabled, onCheckedChange: handleReminderToggle })] }) }), reminderEnabled && (_jsxs(View, { className: "bg-yellow-50 rounded-xl p-4 mb-4 border border-yellow-100", children: [_jsxs(View, { className: "flex items-center gap-3 mb-2", children: [_jsx(Bell, { size: 20, color: "#d97706" }), _jsx(Text, { className: "block text-sm font-semibold text-yellow-900", children: "\u8BA2\u9605\u6D88\u606F\u914D\u7F6E" })] }), _jsxs(Text, { className: "block text-xs text-yellow-700 mb-3 leading-relaxed", children: ["\u9700\u8981\u5148\u914D\u7F6E\u4EE5\u4E0B\u5185\u5BB9\u624D\u80FD\u4F7F\u7528\u8BA2\u9605\u6D88\u606F\uFF1A", '\n\n', "1. \u5728\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\u7533\u8BF7\u8BA2\u9605\u6D88\u606F\u6A21\u677F", '\n', "2. \u914D\u7F6E\u5C0F\u7A0B\u5E8F AppID \u548C AppSecret", '\n', "3. \u914D\u7F6E\u6A21\u677FID"] }), _jsx(Button, { className: "bg-yellow-600", onClick: () => {
                                    Taro.showModal({
                                        title: '配置说明',
                                        content: '订阅消息功能需要配置：\n\n1. 在微信公众平台申请订阅消息模板\n2. 在后端代码中配置AppID和AppSecret\n3. 配置模板ID\n\n联系技术人员完成配置',
                                        showCancel: false
                                    });
                                }, children: _jsx(Text, { className: "text-white text-sm", children: "\u67E5\u770B\u914D\u7F6E\u8BF4\u660E" }) })] })), _jsxs(View, { className: "bg-white rounded-xl p-4 mb-4 border border-gray-100", children: [_jsxs(View, { className: "flex items-center justify-between mb-3", children: [_jsxs(View, { className: "flex items-center gap-3", children: [_jsx(Settings, { size: 20, color: "#2563eb" }), _jsx(Text, { className: "block text-sm font-semibold text-gray-900", children: "\u7BA1\u7406\u5458\u7BA1\u7406" })] }), _jsxs(Button, { className: "bg-blue-600", size: "sm", onClick: () => setShowAddAdminModal(true), children: [_jsx(UserPlus, { size: 16, color: "white" }), _jsx(Text, { className: "text-white text-xs ml-1", children: "\u6DFB\u52A0" })] })] }), _jsxs(View, { className: "mb-4 pb-4 border-b border-gray-100", children: [_jsx(Button, { className: "w-full bg-gray-100 text-gray-700", onClick: handleGetMyOpenid, children: _jsx(Text, { className: "text-sm", children: "\uD83D\uDCF1 \u83B7\u53D6\u6211\u7684 OpenID" }) }), _jsx(Text, { className: "text-xs text-gray-500 mt-2 text-center", children: "\u70B9\u51FB\u83B7\u53D6OpenID\uFF0C\u7136\u540E\u6DFB\u52A0\u4E3A\u7BA1\u7406\u5458" })] }), admins.length === 0 ? (_jsx(View, { className: "text-center py-6", children: _jsx(Text, { className: "text-xs text-gray-500", children: "\u6682\u65E0\u7BA1\u7406\u5458\uFF0C\u8BF7\u5148\u83B7\u53D6OpenID\u540E\u6DFB\u52A0" }) })) : (admins.map((admin) => (_jsxs(View, { className: "flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-2", children: [_jsxs(View, { children: [_jsx(Text, { className: "text-sm font-semibold text-gray-900", children: admin.nickname }), _jsx(Text, { className: "text-xs text-gray-500", children: admin.openid })] }), _jsx(Button, { className: "bg-red-50", size: "sm", onClick: () => handleDeleteAdmin(admin.id), children: _jsx(Trash2, { size: 14, color: "#dc2626" }) })] }, admin.id))))] }), _jsxs(View, { className: "bg-white rounded-xl p-4 mb-4 border border-gray-100", children: [_jsxs(View, { className: "flex items-center gap-3 mb-3", children: [_jsx(Settings, { size: 20, color: "#2563eb" }), _jsx(Text, { className: "block text-sm font-semibold text-gray-900", children: "\u529F\u80FD\u8BF4\u660E" })] }), _jsxs(Text, { className: "block text-xs text-gray-600 leading-relaxed", children: ["\u2022 \u5F55\u5165\u9875\u9762\uFF1A\u5F55\u5165\u6BCF\u65E5\u7A3F\u4EF6\u6570\u91CF\u548C\u6807\u9898", '\n', "\u2022 \u7EDF\u8BA1\u9875\u9762\uFF1A\u67E5\u770B\u7A3F\u4EF6\u6570\u91CF\u548C\u91D1\u989D\u7EDF\u8BA1", '\n', "\u2022 \u526A\u8F91\u5E08\u7BA1\u7406\uFF1A\u6DFB\u52A0\u3001\u5220\u9664\u548C\u7BA1\u7406\u526A\u8F91\u5E08", '\n', "\u2022 \u5355\u4F11\u5236\u5EA6\uFF1A\u5468\u65E5\u65E0\u9700\u5F55\u5165\uFF08\u8282\u5047\u65E5\u52A0\u73ED\u9664\u5916\uFF09", '\n', "\u2022 \u4EF7\u683C\u9501\u5B9A\uFF1A\u5F55\u5165\u65F6\u7684\u5355\u4EF7\u4FDD\u6301\u4E0D\u53D8", '\n', "\u2022 \u8282\u5047\u65E5\uFF1A\u56FD\u5BB6\u6CD5\u5B9A\u8282\u5047\u65E5\u81EA\u52A8\u8BC6\u522B"] })] }), _jsxs(View, { className: "bg-blue-50 rounded-xl p-4 border border-blue-100", children: [_jsxs(View, { className: "flex items-center gap-3 mb-2", children: [_jsx(Info, { size: 20, color: "#2563eb" }), _jsx(Text, { className: "block text-sm font-semibold text-blue-900", children: "\u6CE8\u610F\u4E8B\u9879" })] }), _jsxs(Text, { className: "block text-xs text-blue-700 leading-relaxed", children: ["\u2022 \u6570\u636E\u4FDD\u5B583\u5E74\uFF0C\u81EA\u52A8\u6E05\u7406\u8FC7\u671F\u6570\u636E", '\n', "\u2022 \u6BCF\u5929\u665A\u4E0A11\u70B9\u63D0\u9192\u672A\u5F55\u5165\u6570\u636E", '\n', "\u2022 \u4EF7\u683C\u4FEE\u6539\u540E\uFF0C\u5DF2\u6709\u6570\u636E\u4E0D\u53D7\u5F71\u54CD"] })] })] }), showAddAdminModal && (_jsx(View, { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsxs(View, { className: "bg-white rounded-xl p-6 w-full max-w-sm", children: [_jsx(Text, { className: "block text-lg font-bold text-gray-900 mb-4", children: "\u6DFB\u52A0\u7BA1\u7406\u5458" }), _jsxs(View, { className: "mb-4", children: [_jsx(Text, { className: "block text-sm font-medium text-gray-700 mb-2", children: "OpenID" }), _jsx(Input, { className: "w-full bg-gray-50", placeholder: "\u8F93\u5165\u7BA1\u7406\u5458\u7684\u5FAE\u4FE1OpenID", value: newAdminOpenid, onInput: (e) => setNewAdminOpenid(e.detail.value) })] }), _jsx(View, { className: "mb-6", children: _jsx(Text, { className: "block text-xs text-gray-500", children: "OpenID\u662F\u5FAE\u4FE1\u7528\u6237\u7684\u552F\u4E00\u6807\u8BC6\uFF0C\u53EF\u4EE5\u5728\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u5DE5\u5177\u4E2D\u83B7\u53D6" }) }), _jsxs(View, { className: "flex gap-3", children: [_jsx(Button, { className: "flex-1 bg-gray-100 text-gray-700", onClick: () => setShowAddAdminModal(false), children: _jsx(Text, { className: "block text-sm", children: "\u53D6\u6D88" }) }), _jsx(Button, { className: "flex-1 bg-blue-600", onClick: handleAddAdmin, children: _jsx(Text, { className: "block text-sm text-white", children: "\u786E\u8BA4\u6DFB\u52A0" }) })] })] }) }))] }));
};
export default SettingsPage;
//# sourceMappingURL=index%202.js.map