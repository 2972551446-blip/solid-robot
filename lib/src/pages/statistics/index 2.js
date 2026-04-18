import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { View, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Network } from "../../network";
import { Calendar, TrendingUp, User, Trash2 } from 'lucide-react-taro';
const StatisticsPage = () => {
    const [works, setWorks] = useState([]);
    const [editorStats, setEditorStats] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        initCurrentMonth();
    }, []);
    useEffect(() => {
        if (startDate && endDate) {
            fetchStatistics();
        }
    }, [startDate, endDate]);
    const initCurrentMonth = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        setStartDate(formatDate(firstDay));
        setEndDate(formatDate(lastDay));
    };
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const fetchStatistics = async () => {
        if (!startDate || !endDate)
            return;
        try {
            const res = await Network.request({
                url: '/api/works/by-range',
                method: 'GET',
                data: { startDate, endDate }
            });
            if (res.data && res.data.data) {
                const worksData = res.data.data;
                setWorks(worksData);
                const count = worksData.reduce((sum, work) => sum + work.count, 0);
                const amount = worksData.reduce((sum, work) => sum + (work.count * work.price), 0);
                setTotalCount(count);
                setTotalAmount(amount);
                // 计算每个剪辑师的统计
                const statsMap = new Map();
                worksData.forEach((work) => {
                    var _a;
                    const editorName = ((_a = work.editors) === null || _a === void 0 ? void 0 : _a.name) || '未知';
                    if (!statsMap.has(work.editor_id)) {
                        statsMap.set(work.editor_id, {
                            editor_id: work.editor_id,
                            editor_name: editorName,
                            total_count: 0,
                            total_amount: 0,
                            average_price: 0
                        });
                    }
                    const stats = statsMap.get(work.editor_id);
                    stats.total_count += work.count;
                    stats.total_amount += work.count * work.price;
                });
                // 计算平均单价
                const statsArray = Array.from(statsMap.values()).map(stats => (Object.assign(Object.assign({}, stats), { average_price: stats.total_count > 0 ? stats.total_amount / stats.total_count : 0 })));
                // 按总金额降序排序
                statsArray.sort((a, b) => b.total_amount - a.total_amount);
                setEditorStats(statsArray);
            }
        }
        catch (error) {
            console.error('获取统计数据失败', error);
        }
    };
    const handleStartChange = (e) => {
        const { value } = e.detail;
        setStartDate(value);
    };
    const handleEndChange = (e) => {
        const { value } = e.detail;
        setEndDate(value);
    };
    const handleCurrentMonth = () => {
        initCurrentMonth();
    };
    const handleLastMonth = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
        setStartDate(formatDate(firstDay));
        setEndDate(formatDate(lastDay));
    };
    const handleDeleteWork = async (id, editorName) => {
        Taro.showModal({
            title: '确认删除',
            content: `确定要删除 ${editorName} 的这条记录吗？`,
            success: async (res) => {
                if (res.confirm) {
                    try {
                        await Network.request({
                            url: `/api/works/${id}`,
                            method: 'DELETE'
                        });
                        fetchStatistics();
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
    return (_jsxs(View, { className: "min-h-screen bg-gray-50 pb-20", children: [_jsxs(View, { className: "bg-white p-4 border-b border-gray-200", children: [_jsx(Text, { className: "block text-xl font-bold text-gray-900", children: "\u6570\u636E\u7EDF\u8BA1" }), _jsx(Text, { className: "block text-xs text-gray-500 mt-1", children: "\u67E5\u770B\u7A3F\u4EF6\u6570\u91CF\u548C\u91D1\u989D\u7EDF\u8BA1" })] }), _jsxs(View, { className: "p-4", children: [_jsxs(View, { className: "flex gap-3 mb-4", children: [_jsx(View, { className: "flex-1 bg-blue-50 rounded-xl px-4 py-3 text-center border border-blue-100", onClick: handleCurrentMonth, children: _jsx(Text, { className: "block text-sm font-semibold text-blue-600", children: "\u672C\u6708" }) }), _jsx(View, { className: "flex-1 bg-gray-50 rounded-xl px-4 py-3 text-center border border-gray-100", onClick: handleLastMonth, children: _jsx(Text, { className: "block text-sm font-semibold text-gray-600", children: "\u4E0A\u6708" }) })] }), _jsxs(View, { className: "flex gap-3 mb-4", children: [_jsxs(View, { className: "flex-1 bg-white rounded-xl px-4 py-3 border border-gray-100", children: [_jsx(Text, { className: "block text-xs text-gray-500 mb-1", children: "\u5F00\u59CB\u65E5\u671F" }), _jsx(Picker, { mode: "date", value: startDate, onChange: handleStartChange, children: _jsxs(View, { className: "flex items-center justify-between", children: [_jsx(Text, { className: "block text-sm font-semibold text-gray-900", children: startDate }), _jsx(Calendar, { size: 18, color: "#2563eb" })] }) })] }), _jsxs(View, { className: "flex-1 bg-white rounded-xl px-4 py-3 border border-gray-100", children: [_jsx(Text, { className: "block text-xs text-gray-500 mb-1", children: "\u7ED3\u675F\u65E5\u671F" }), _jsx(Picker, { mode: "date", value: endDate, onChange: handleEndChange, children: _jsxs(View, { className: "flex items-center justify-between", children: [_jsx(Text, { className: "block text-sm font-semibold text-gray-900", children: endDate }), _jsx(Calendar, { size: 18, color: "#2563eb" })] }) })] })] }), _jsxs(View, { className: "grid grid-cols-2 gap-3 mb-4", children: [_jsxs(View, { className: "bg-blue-50 rounded-xl p-4", children: [_jsxs(View, { className: "flex items-center gap-2 mb-2", children: [_jsx(TrendingUp, { size: 16, color: "#2563eb" }), _jsx(Text, { className: "text-xs text-gray-600", children: "\u603B\u65F6\u957F" })] }), _jsx(Text, { className: "block text-2xl font-bold text-blue-600", children: totalCount }), _jsx(Text, { className: "block text-xs text-gray-500 mt-1", children: "\u5206\u949F" })] }), _jsxs(View, { className: "bg-green-50 rounded-xl p-4", children: [_jsxs(View, { className: "flex items-center gap-2 mb-2", children: [_jsx(Calendar, { size: 16, color: "#16a34a" }), _jsx(Text, { className: "text-xs text-gray-600", children: "\u603B\u91D1\u989D" })] }), _jsxs(Text, { className: "block text-2xl font-bold text-green-600", children: ["\u00A5", totalAmount.toFixed(2)] }), _jsx(Text, { className: "block text-xs text-gray-500 mt-1", children: "\u603B\u6536\u5165" })] })] }), _jsx(Text, { className: "block text-sm font-semibold text-gray-900 mb-3", children: "\u526A\u8F91\u5E08\u7EDF\u8BA1" }), editorStats.map((stat) => (_jsxs(View, { className: "bg-white rounded-xl p-4 mb-3 border border-gray-100", children: [_jsxs(View, { className: "flex items-center gap-3 mb-3", children: [_jsx(View, { className: "w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center", children: _jsx(User, { size: 20, color: "#2563eb" }) }), _jsxs(View, { className: "flex-1", children: [_jsx(Text, { className: "block text-base font-semibold text-gray-900", children: stat.editor_name }), _jsxs(Text, { className: "block text-xs text-gray-500", children: ["\u00A5", stat.average_price.toFixed(2), "/\u5206\u949F"] })] })] }), _jsxs(View, { className: "grid grid-cols-2 gap-3", children: [_jsxs(View, { className: "bg-gray-50 rounded-lg p-3", children: [_jsx(Text, { className: "block text-xs text-gray-500 mb-1", children: "\u65F6\u957F\uFF08\u5206\u949F\uFF09" }), _jsx(Text, { className: "block text-lg font-bold text-blue-600", children: stat.total_count })] }), _jsxs(View, { className: "bg-gray-50 rounded-lg p-3", children: [_jsx(Text, { className: "block text-xs text-gray-500 mb-1", children: "\u603B\u91D1\u989D" }), _jsxs(Text, { className: "block text-lg font-bold text-green-600", children: ["\u00A5", stat.total_amount.toFixed(2)] })] })] })] }, stat.editor_id))), editorStats.length === 0 && works.length > 0 && (_jsx(View, { className: "text-center py-8", children: _jsx(Text, { className: "block text-gray-500", children: "\u6682\u65E0\u526A\u8F91\u5E08\u6570\u636E" }) })), _jsx(Text, { className: "block text-sm font-semibold text-gray-900 mb-3 mt-4", children: "\u660E\u7EC6\u5217\u8868" }), works.map((work) => {
                        var _a;
                        return (_jsxs(View, { className: "bg-white rounded-xl p-4 mb-3 border border-gray-100", children: [_jsxs(View, { className: "flex justify-between items-start mb-2", children: [_jsxs(View, { className: "flex-1", children: [_jsx(Text, { className: "block text-sm font-semibold text-gray-900", children: work.title }), _jsx(Text, { className: "block text-xs text-gray-500 mt-1", children: (_a = work.editors) === null || _a === void 0 ? void 0 : _a.name })] }), _jsxs(View, { className: "flex items-center gap-2", children: [_jsxs(Text, { className: "text-sm font-bold text-blue-600", children: ["\u00A5", (work.count * work.price).toFixed(2)] }), _jsx(View, { className: "w-8 h-8 bg-red-50 rounded-full flex items-center justify-center ml-2", onClick: () => { var _a; return handleDeleteWork(work.id, ((_a = work.editors) === null || _a === void 0 ? void 0 : _a.name) || '未知剪辑师'); }, children: _jsx(Trash2, { size: 16, color: "#dc2626" }) })] })] }), _jsxs(View, { className: "flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2", children: [_jsx(Text, { className: "text-xs text-gray-500", children: work.date }), _jsxs(Text, { className: "text-xs text-gray-600", children: [work.count, " \u5206\u949F \u00D7 \u00A5", work.price] })] })] }, work.id));
                    }), works.length === 0 && (_jsx(View, { className: "text-center py-12", children: _jsx(Text, { className: "block text-gray-500", children: "\u6682\u65E0\u6570\u636E" }) }))] })] }));
};
export default StatisticsPage;
//# sourceMappingURL=index%202.js.map