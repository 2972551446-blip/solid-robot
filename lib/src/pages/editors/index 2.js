import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Trash2 } from 'lucide-react-taro';
import { Network } from "../../network";
const EditorsPage = () => {
    const [editors, setEditors] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('8');
    const [newDefaultCount, setNewDefaultCount] = useState('2');
    const [editingPrices, setEditingPrices] = useState({});
    const [editingCounts, setEditingCounts] = useState({});
    useEffect(() => {
        fetchEditors();
    }, []);
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
    const handleAddEditor = async () => {
        if (!newName.trim()) {
            console.log('请输入剪辑师姓名');
            return;
        }
        if (!newPrice || parseFloat(newPrice) <= 0) {
            console.log('请输入有效的价格');
            return;
        }
        if (!newDefaultCount || parseInt(newDefaultCount) <= 0) {
            console.log('请输入有效的默认时长');
            return;
        }
        try {
            const res = await Network.request({
                url: '/api/editors',
                method: 'POST',
                data: {
                    name: newName.trim(),
                    price: newPrice,
                    default_count: parseInt(newDefaultCount)
                }
            });
            console.log('添加成功', res.data);
            setNewName('');
            setNewPrice('8');
            setNewDefaultCount('2');
            setShowAddModal(false);
            fetchEditors();
        }
        catch (error) {
            console.error('添加失败', error);
        }
    };
    const handleDeleteEditor = async (id) => {
        try {
            const res = await Network.request({
                url: `/api/editors/${id}`,
                method: 'DELETE'
            });
            console.log('删除成功', res.data);
            fetchEditors();
        }
        catch (error) {
            console.error('删除失败', error);
        }
    };
    const handleUpdatePrice = async (id, price) => {
        try {
            const res = await Network.request({
                url: `/api/editors/${id}`,
                method: 'PUT',
                data: { price: parseFloat(price) }
            });
            console.log('更新成功', res.data);
            fetchEditors();
        }
        catch (error) {
            console.error('更新失败', error);
        }
    };
    const handleUpdateDefaultCount = async (id, defaultCount) => {
        try {
            const res = await Network.request({
                url: `/api/editors/${id}`,
                method: 'PUT',
                data: { default_count: parseInt(defaultCount) }
            });
            console.log('更新成功', res.data);
            fetchEditors();
        }
        catch (error) {
            console.error('更新失败', error);
        }
    };
    const handlePriceInput = (id, value) => {
        setEditingPrices(prev => (Object.assign(Object.assign({}, prev), { [id]: value })));
    };
    const handleCountInput = (id, value) => {
        setEditingCounts(prev => (Object.assign(Object.assign({}, prev), { [id]: value })));
    };
    return (_jsxs(View, { className: "min-h-screen bg-gray-50 pb-20", children: [_jsxs(View, { className: "bg-white p-4 border-b border-gray-200 flex justify-between items-center", children: [_jsxs(View, { children: [_jsx(Text, { className: "block text-xl font-bold text-gray-900", children: "\u526A\u8F91\u5E08\u7BA1\u7406" }), _jsx(Text, { className: "block text-xs text-gray-500 mt-1", children: "\u6DFB\u52A0\u3001\u5220\u9664\u548C\u7BA1\u7406\u526A\u8F91\u5E08" })] }), _jsxs(Button, { className: "bg-blue-600", onClick: () => setShowAddModal(true), children: [_jsx(Plus, { size: 18, color: "white" }), _jsx(Text, { className: "text-white text-sm ml-1", children: "\u6DFB\u52A0" })] })] }), _jsxs(View, { className: "p-4", children: [editors.map((editor) => {
                        var _a, _b;
                        return (_jsxs(View, { className: "bg-white rounded-xl p-4 mb-3 border border-gray-100", children: [_jsxs(View, { className: "flex justify-between items-center mb-3", children: [_jsxs(View, { className: "flex items-center gap-3", children: [_jsx(View, { className: "w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center", children: _jsx(Text, { className: "text-blue-600 font-bold", children: editor.name[0] }) }), _jsxs(View, { children: [_jsx(Text, { className: "block text-sm font-semibold text-gray-900", children: editor.name }), _jsxs(Text, { className: "block text-xs text-gray-500", children: ["ID: ", editor.id] })] })] }), _jsx(Button, { className: "bg-red-50", onClick: () => handleDeleteEditor(editor.id), children: _jsx(Trash2, { size: 16, color: "#dc2626" }) })] }), _jsxs(View, { className: "flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 mb-2", children: [_jsx(Text, { className: "block text-sm text-gray-600", children: "\u5355\u4EF7\uFF08\u5143/\u5206\u949F\uFF09" }), _jsxs(View, { className: "flex items-center gap-2", children: [_jsx(Input, { className: "w-20 bg-white text-right text-sm", type: "number", value: (_a = editingPrices[editor.id]) !== null && _a !== void 0 ? _a : editor.price.toString(), onInput: (e) => handlePriceInput(editor.id, e.detail.value), onBlur: () => {
                                                        const price = editingPrices[editor.id];
                                                        if (price && price !== editor.price.toString()) {
                                                            handleUpdatePrice(editor.id, price);
                                                        }
                                                    } }), _jsx(Text, { className: "text-sm text-gray-500", children: "\u5143" })] })] }), _jsxs(View, { className: "flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3", children: [_jsx(Text, { className: "block text-sm text-gray-600", children: "\u9ED8\u8BA4\u65F6\u957F\uFF08\u5206\u949F\uFF09" }), _jsxs(View, { className: "flex items-center gap-2", children: [_jsx(Input, { className: "w-20 bg-white text-right text-sm", type: "number", value: (_b = editingCounts[editor.id]) !== null && _b !== void 0 ? _b : editor.default_count.toString(), onInput: (e) => handleCountInput(editor.id, e.detail.value), onBlur: () => {
                                                        const count = editingCounts[editor.id];
                                                        if (count && count !== editor.default_count.toString()) {
                                                            handleUpdateDefaultCount(editor.id, count);
                                                        }
                                                    } }), _jsx(Text, { className: "text-sm text-gray-500", children: "\u5206\u949F" })] })] })] }, editor.id));
                    }), editors.length === 0 && (_jsx(View, { className: "text-center py-12", children: _jsx(Text, { className: "block text-gray-500", children: "\u6682\u65E0\u526A\u8F91\u5E08\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2\u6DFB\u52A0" }) }))] }), showAddModal && (_jsx(View, { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsxs(View, { className: "bg-white rounded-xl p-6 w-full max-w-sm", children: [_jsx(Text, { className: "block text-lg font-bold text-gray-900 mb-4", children: "\u6DFB\u52A0\u526A\u8F91\u5E08" }), _jsxs(View, { className: "mb-4", children: [_jsx(Text, { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u59D3\u540D" }), _jsx(Input, { className: "w-full bg-gray-50", placeholder: "\u8F93\u5165\u526A\u8F91\u5E08\u59D3\u540D", value: newName, onInput: (e) => setNewName(e.detail.value) })] }), _jsxs(View, { className: "mb-4", children: [_jsx(Text, { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u5355\u4EF7\uFF08\u5143/\u5206\u949F\uFF09" }), _jsx(Input, { className: "w-full bg-gray-50", type: "number", placeholder: "\u8F93\u5165\u5355\u4EF7", value: newPrice, onInput: (e) => setNewPrice(e.detail.value) })] }), _jsxs(View, { className: "mb-6", children: [_jsx(Text, { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u9ED8\u8BA4\u65F6\u957F\uFF08\u5206\u949F\uFF09" }), _jsx(Input, { className: "w-full bg-gray-50", type: "number", placeholder: "\u8F93\u5165\u9ED8\u8BA4\u65F6\u957F", value: newDefaultCount, onInput: (e) => setNewDefaultCount(e.detail.value) })] }), _jsxs(View, { className: "flex gap-3", children: [_jsx(Button, { className: "flex-1 bg-gray-100 text-gray-700", onClick: () => setShowAddModal(false), children: _jsx(Text, { className: "block text-sm", children: "\u53D6\u6D88" }) }), _jsx(Button, { className: "flex-1 bg-blue-600", onClick: handleAddEditor, children: _jsx(Text, { className: "block text-sm text-white", children: "\u786E\u8BA4\u6DFB\u52A0" }) })] })] }) }))] }));
};
export default EditorsPage;
//# sourceMappingURL=index%202.js.map