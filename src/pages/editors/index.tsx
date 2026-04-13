import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react-taro'
import { Network } from '@/network'

interface Editor {
  id: number
  name: string
  price: number
  default_count: number
  is_active: boolean
}

const EditorsPage = () => {
  const [editors, setEditors] = useState<Editor[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('8')
  const [newDefaultCount, setNewDefaultCount] = useState('2')
  const [editingPrices, setEditingPrices] = useState<Record<number, string>>({})
  const [editingCounts, setEditingCounts] = useState<Record<number, string>>({})

  useEffect(() => {
    fetchEditors()
  }, [])

  const fetchEditors = async () => {
    try {
      const res = await Network.request({
        url: '/api/editors',
        method: 'GET'
      })
      if (res.data && res.data.data) {
        setEditors(res.data.data)
      }
    } catch (error) {
      console.error('获取剪辑师列表失败', error)
    }
  }

  const handleAddEditor = async () => {
    if (!newName.trim()) {
      console.log('请输入剪辑师姓名')
      return
    }
    if (!newPrice || parseFloat(newPrice) <= 0) {
      console.log('请输入有效的价格')
      return
    }
    if (!newDefaultCount || parseInt(newDefaultCount) <= 0) {
      console.log('请输入有效的默认时长')
      return
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
      })
      console.log('添加成功', res.data)
      setNewName('')
      setNewPrice('8')
      setNewDefaultCount('2')
      setShowAddModal(false)
      fetchEditors()
    } catch (error) {
      console.error('添加失败', error)
    }
  }

  const handleDeleteEditor = async (id: number) => {
    try {
      const res = await Network.request({
        url: `/api/editors/${id}`,
        method: 'DELETE'
      })
      console.log('删除成功', res.data)
      fetchEditors()
    } catch (error) {
      console.error('删除失败', error)
    }
  }

  const handleUpdatePrice = async (id: number, price: string) => {
    try {
      const res = await Network.request({
        url: `/api/editors/${id}`,
        method: 'PUT',
        data: { price: parseFloat(price) }
      })
      console.log('更新成功', res.data)
      fetchEditors()
    } catch (error) {
      console.error('更新失败', error)
    }
  }

  const handleUpdateDefaultCount = async (id: number, defaultCount: string) => {
    try {
      const res = await Network.request({
        url: `/api/editors/${id}`,
        method: 'PUT',
        data: { default_count: parseInt(defaultCount) }
      })
      console.log('更新成功', res.data)
      fetchEditors()
    } catch (error) {
      console.error('更新失败', error)
    }
  }

  const handlePriceInput = (id: number, value: string) => {
    setEditingPrices(prev => ({ ...prev, [id]: value }))
  }

  const handleCountInput = (id: number, value: string) => {
    setEditingCounts(prev => ({ ...prev, [id]: value }))
  }

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      <View className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <View>
          <Text className="block text-xl font-bold text-gray-900">剪辑师管理</Text>
          <Text className="block text-xs text-gray-500 mt-1">添加、删除和管理剪辑师</Text>
        </View>
        <Button className="bg-blue-600" onClick={() => setShowAddModal(true)}>
          <Plus size={18} color="white" />
          <Text className="text-white text-sm ml-1">添加</Text>
        </Button>
      </View>

      <View className="p-4">
        {editors.map((editor) => (
          <View key={editor.id} className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
            <View className="flex justify-between items-center mb-3">
              <View className="flex items-center gap-3">
                <View className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Text className="text-blue-600 font-bold">{editor.name[0]}</Text>
                </View>
                <View>
                  <Text className="block text-sm font-semibold text-gray-900">{editor.name}</Text>
                  <Text className="block text-xs text-gray-500">ID: {editor.id}</Text>
                </View>
              </View>
              <Button className="bg-red-50" onClick={() => handleDeleteEditor(editor.id)}>
                <Trash2 size={16} color="#dc2626" />
              </Button>
            </View>
            <View className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 mb-2">
              <Text className="block text-sm text-gray-600">单价（元/分钟）</Text>
              <View className="flex items-center gap-2">
                <Input
                  className="w-20 bg-white text-right text-sm"
                  type="number"
                  value={editingPrices[editor.id] ?? editor.price.toString()}
                  onInput={(e) => handlePriceInput(editor.id, e.detail.value)}
                  onBlur={() => {
                    const price = editingPrices[editor.id]
                    if (price && price !== editor.price.toString()) {
                      handleUpdatePrice(editor.id, price)
                    }
                  }}
                />
                <Text className="text-sm text-gray-500">元</Text>
              </View>
            </View>
            <View className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
              <Text className="block text-sm text-gray-600">默认时长（分钟）</Text>
              <View className="flex items-center gap-2">
                <Input
                  className="w-20 bg-white text-right text-sm"
                  type="number"
                  value={editingCounts[editor.id] ?? editor.default_count.toString()}
                  onInput={(e) => handleCountInput(editor.id, e.detail.value)}
                  onBlur={() => {
                    const count = editingCounts[editor.id]
                    if (count && count !== editor.default_count.toString()) {
                      handleUpdateDefaultCount(editor.id, count)
                    }
                  }}
                />
                <Text className="text-sm text-gray-500">分钟</Text>
              </View>
            </View>
          </View>
        ))}

        {editors.length === 0 && (
          <View className="text-center py-12">
            <Text className="block text-gray-500">暂无剪辑师，点击右上角添加</Text>
          </View>
        )}
      </View>

      {showAddModal && (
        <View className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <View className="bg-white rounded-xl p-6 w-full max-w-sm">
            <Text className="block text-lg font-bold text-gray-900 mb-4">添加剪辑师</Text>
            <View className="mb-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">姓名</Text>
              <Input
                className="w-full bg-gray-50"
                placeholder="输入剪辑师姓名"
                value={newName}
                onInput={(e) => setNewName(e.detail.value)}
              />
            </View>
            <View className="mb-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">单价（元/分钟）</Text>
              <Input
                className="w-full bg-gray-50"
                type="number"
                placeholder="输入单价"
                value={newPrice}
                onInput={(e) => setNewPrice(e.detail.value)}
              />
            </View>
            <View className="mb-6">
              <Text className="block text-sm font-medium text-gray-700 mb-2">默认时长（分钟）</Text>
              <Input
                className="w-full bg-gray-50"
                type="number"
                placeholder="输入默认时长"
                value={newDefaultCount}
                onInput={(e) => setNewDefaultCount(e.detail.value)}
              />
            </View>
            <View className="flex gap-3">
              <Button className="flex-1 bg-gray-100 text-gray-700" onClick={() => setShowAddModal(false)}>
                <Text className="block text-sm">取消</Text>
              </Button>
              <Button className="flex-1 bg-blue-600" onClick={handleAddEditor}>
                <Text className="block text-sm text-white">确认添加</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default EditorsPage
