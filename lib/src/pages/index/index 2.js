import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { View, Text, Picker } from '@tarojs/components';
import { useLoad, useDidShow } from '@tarojs/taro';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Calendar, User } from 'lucide-react-taro';
import { Network } from "../../network";
const IndexPage = () => {
    const [editors, setEditors] = useState([]);
    const [works, setWorks] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    useLoad(() => {
        fetchEditors();
    });
    useDidShow(() => {
        fetchEditors();
    });
    useEffect(() => {
        initializeWorks();
    }, [editors]);
    const fetchEditors = async () => {
        try {
            const res = await Network.request({
                url: '/api/editors',
                method: 'GET'
            });
            if (res.data && res.data.data) {
                setEditors(res.data.data);
            }
        }
        catch (error) {
            console.error('获取剪辑师列表失败', error);
        }
    };
    const initializeWorks = () => {
        const worksData = editors.map((editor) => ({
            editor_id: editor.id,
            editor_name: editor.name,
            count: editor.default_count || 2, // 默认2分钟
            title: '常规剪辑稿件',
            price: editor.price
        }));
        setWorks(worksData);
    };
    const handleDefaultValues = () => {
        const today = new Date().toISOString().split('T')[0];
        const todayDate = new Date(today);
        const dayOfWeek = todayDate.getDay();
        if (dayOfWeek === 0) {
            console.log('今天是周日，不需要录入');
            return;
        }
        setDate(today);
        initializeWorks();
    };
    const handleSubmit = async () => {
        const validWorks = works.filter((work) => work.count > 0);
        if (validWorks.length === 0) {
            console.log('请至少输入一个剪辑师的稿件数量');
            return;
        }
        setLoading(true);
        try {
            const res = await Network.request({
                url: '/api/works/batch',
                method: 'POST',
                data: {
                    works: validWorks.map((work) => ({
                        editor_id: work.editor_id,
                        date,
                        count: work.count,
                        title: work.title
                    }))
                }
            });
            console.log('批量录入成功', res.data);
            initializeWorks();
        }
        catch (error) {
            console.error('录入失败', error);
        }
        finally {
            setLoading(false);
        }
    };
    const updateWorkCount = (editorId, count) => {
        setWorks((prevWorks) => prevWorks.map((work) => (work.editor_id === editorId ? Object.assign(Object.assign({}, work), { count: parseInt(count) || 0 }) : work)));
    };
    const updateWorkTitle = (editorId, title) => {
        setWorks((prevWorks) => prevWorks.map((work) => (work.editor_id === editorId ? Object.assign(Object.assign({}, work), { title }) : work)));
    };
    const handleDateChange = (e) => {
        const { value } = e.detail;
        const selectedDate = new Date(value);
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    };
    return (_jsxs(View, { className: "min-h-screen bg-gray-50 pb-20", children: [_jsxs(View, { className: "bg-white p-4 border-b border-gray-200", children: [_jsx(Text, { className: "block text-xl font-bold text-gray-900", children: "\u7A3F\u4EF6\u5F55\u5165" }), _jsx(Text, { className: "block text-xs text-gray-500 mt-1", children: "\u6279\u91CF\u5F55\u5165\u591A\u4E2A\u526A\u8F91\u5E08\u7684\u7A3F\u4EF6" })] }), _jsxs(View, { className: "p-4", children: [_jsxs(View, { className: "bg-white rounded-xl p-4 mb-4 border border-gray-100", children: [_jsx(Text, { className: "block text-sm font-semibold text-gray-900 mb-3", children: "\u5F55\u5165\u65E5\u671F" }), _jsx(Picker, { mode: "date", value: date, onChange: handleDateChange, children: _jsxs(View, { className: "bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between", children: [_jsx(Text, { className: "block text-sm text-gray-700", children: date }), _jsx(Calendar, { size: 20, color: "#2563eb" })] }) })] }), works.map((work) => (_jsxs(View, { className: "bg-white rounded-xl p-4 mb-3 border border-gray-100", children: [_jsxs(View, { className: "flex items-center gap-3 mb-3", children: [_jsx(View, { className: "w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center", children: _jsx(User, { size: 16, color: "#2563eb" }) }), _jsxs(View, { className: "flex-1", children: [_jsx(Text, { className: "block text-sm font-semibold text-gray-900", children: work.editor_name }), _jsxs(Text, { className: "block text-xs text-gray-500", children: ["\u00A5", work.price, "/\u5206\u949F"] })] })] }), _jsxs(View, { className: "mb-3", children: [_jsx(Text, { className: "block text-xs text-gray-600 mb-1", children: "\u7A3F\u4EF6\u6807\u9898" }), _jsx(View, { className: "bg-gray-50 rounded-lg px-3 py-2", children: _jsx(Input, { className: "w-full bg-transparent text-xs", placeholder: "\u8F93\u5165\u7A3F\u4EF6\u6807\u9898", value: work.title, onInput: (e) => updateWorkTitle(work.editor_id, e.detail.value) }) })] }), _jsxs(View, { children: [_jsx(Text, { className: "block text-xs text-gray-600 mb-1", children: "\u65F6\u957F\uFF08\u5206\u949F\uFF09" }), _jsx(View, { className: "bg-gray-50 rounded-lg px-3 py-2", children: _jsx(Input, { className: "w-full bg-transparent text-sm", type: "number", placeholder: "\u8F93\u5165\u65F6\u957F", value: work.count.toString(), onInput: (e) => updateWorkCount(work.editor_id, e.detail.value) }) })] })] }, work.editor_id))), editors.length === 0 && (_jsx(View, { className: "text-center py-12", children: _jsx(Text, { className: "block text-gray-500", children: "\u6682\u65E0\u526A\u8F91\u5E08\uFF0C\u8BF7\u5148\u5728\"\u526A\u8F91\u5E08\"\u9875\u9762\u6DFB\u52A0" }) })), _jsxs(View, { className: "flex gap-3 mt-4", children: [_jsx(Button, { className: "flex-1 h-11 bg-gray-100 text-gray-700", onClick: handleDefaultValues, children: _jsx(Text, { className: "block text-sm", children: "\u4E00\u952E\u9ED8\u8BA4" }) }), _jsx(Button, { className: "flex-1 h-11 bg-blue-600", onClick: handleSubmit, disabled: loading, children: _jsx(Text, { className: "block text-sm text-white", children: loading ? '提交中...' : '批量提交' }) })] })] })] }));
};
export default IndexPage;
//# sourceMappingURL=index%202.js.map