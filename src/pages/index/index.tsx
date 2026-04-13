import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from 'lucide-react-taro'
import { Network } from '@/network'

interface Editor {
  id: number
  name: string
  price: number
}

const IndexPage = () => {
  const [editors, setEditors] = useState<Editor[]>([])
  const [selectedEditorId, setSelectedEditorId] = useState<number | null>(null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [count, setCount] = useState('')
  const [title, setTitle] = useState('常规剪辑稿件')
  const [loading, setLoading] = useState(false)

  useLoad(() => {
    fetchEditors()
  })

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

  const handleSubmit = async () => {
    if (!selectedEditorId) {
      console.log('请选择剪辑师')
      return
    }
    if (!count || parseInt(count) <= 0) {
      console.log('请输入有效的稿件数量')
      return
    }
    if (!date) {
      console.log('请选择日期')
      return
    }

    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/works',
        method: 'POST',
        data: {
          editor_id: selectedEditorId,
          date,
          count: parseInt(count),
          title
        }
      })
      console.log('录入成功', res.data)
      setCount('')
      setTitle('常规剪辑稿件')
    } catch (error) {
      console.error('录入失败', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDefaultValues = () => {
    const today = new Date().toISOString().split('T')[0]
    const todayDate = new Date(today)
    const dayOfWeek = todayDate.getDay()

    if (dayOfWeek === 0) {
      console.log('今天是周日，不需要录入')
      return
    }

    setDate(today)
    setCount('1')
    setTitle('常规剪辑稿件')
  }

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      <View className="bg-white p-4 border-b border-gray-200">
        <Text className="block text-xl font-bold text-gray-900">稿件录入</Text>
        <Text className="block text-xs text-gray-500 mt-1">选择剪辑师、日期和数量</Text>
      </View>

      <View className="p-4">
        {/* 剪辑师选择 */}
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
          <Text className="block text-sm font-semibold text-gray-900 mb-3">选择剪辑师</Text>
          <View className="flex flex-wrap gap-2">
            {editors.map((editor) => (
              <View
                key={editor.id}
                className={`px-4 py-2 rounded-lg border ${
                  selectedEditorId === editor.id
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-gray-50 border-gray-200'
                }`}
                onClick={() => setSelectedEditorId(editor.id)}
              >
                <Text className={`text-sm ${
                  selectedEditorId === editor.id ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}
                >
                  {editor.name}
                </Text>
                <Text className={`block text-xs ${
                  selectedEditorId === editor.id ? 'text-blue-500' : 'text-gray-500'
                }`}
                >
                  ¥{editor.price}/条
                </Text>
              </View>
            ))}
            {editors.length === 0 && (
              <Text className="block text-sm text-gray-500 text-center py-4">
                暂无剪辑师，请先在&quot;剪辑师&quot;页面添加
              </Text>
            )}
          </View>
        </View>

        {/* 日期选择 */}
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
          <Text className="block text-sm font-semibold text-gray-900 mb-3">录入日期</Text>
          <View className="bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between">
            <Text className="block text-sm text-gray-700">{date}</Text>
            <Calendar size={20} color="#2563eb" />
          </View>
        </View>

        {/* 稿件标题 */}
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
          <Text className="block text-sm font-semibold text-gray-900 mb-3">稿件标题</Text>
          <View className="bg-gray-50 rounded-xl px-4 py-3">
            <Input
              className="w-full bg-transparent text-sm"
              placeholder="输入稿件标题"
              value={title}
              onInput={(e) => setTitle(e.detail.value)}
            />
          </View>
        </View>

        {/* 稿件数量 */}
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
          <Text className="block text-sm font-semibold text-gray-900 mb-3">稿件数量</Text>
          <View className="bg-gray-50 rounded-xl px-4 py-3">
            <Input
              className="w-full bg-transparent text-sm"
              type="number"
              placeholder="输入稿件数量"
              value={count}
              onInput={(e) => setCount(e.detail.value)}
            />
          </View>
        </View>

        {/* 操作按钮 */}
        <View className="flex gap-3">
          <Button
            className="flex-1 h-11 bg-gray-100 text-gray-700"
            onClick={handleDefaultValues}
          >
            <Text className="block text-sm">一键默认</Text>
          </Button>
          <Button
            className="flex-1 h-11 bg-blue-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            <Text className="block text-sm text-white">
              {loading ? '提交中...' : '提交录入'}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default IndexPage
