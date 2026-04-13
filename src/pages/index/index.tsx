import { useState, useEffect } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import { useLoad, useDidShow } from '@tarojs/taro'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, User } from 'lucide-react-taro'
import { Network } from '@/network'

interface Editor {
  id: number
  name: string
  price: number
  default_count: number
}

interface EditorWork {
  editor_id: number
  editor_name: string
  count: number
  title: string
  price: number
}

  const IndexPage = () => {
  const [editors, setEditors] = useState<Editor[]>([])
  const [works, setWorks] = useState<EditorWork[]>([])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  useLoad(() => {
    fetchEditors()
  })

  useDidShow(() => {
    fetchEditors()
  })

  useEffect(() => {
    initializeWorks()
  }, [editors])

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

  const initializeWorks = () => {
    const worksData = editors.map((editor) => ({
      editor_id: editor.id,
      editor_name: editor.name,
      count: editor.default_count,
      title: '常规剪辑稿件',
      price: editor.price
    }))
    setWorks(worksData)
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
    initializeWorks()
  }

  const handleSubmit = async () => {
    const validWorks = works.filter((work) => work.count > 0)

    if (validWorks.length === 0) {
      console.log('请至少输入一个剪辑师的稿件数量')
      return
    }

    setLoading(true)
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
      })
      console.log('批量录入成功', res.data)
      initializeWorks()
    } catch (error) {
      console.error('录入失败', error)
    } finally {
      setLoading(false)
    }
  }

  const updateWorkCount = (editorId: number, count: string) => {
    setWorks((prevWorks) =>
      prevWorks.map((work) => (work.editor_id === editorId ? { ...work, count: parseInt(count) || 0 } : work))
    )
  }

  const updateWorkTitle = (editorId: number, title: string) => {
    setWorks((prevWorks) =>
      prevWorks.map((work) => (work.editor_id === editorId ? { ...work, title } : work))
    )
  }

  const handleDateChange = (e: any) => {
    const { value } = e.detail
    const selectedDate = new Date(value)
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    setDate(formattedDate)
  }

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      <View className="bg-white p-4 border-b border-gray-200">
        <Text className="block text-xl font-bold text-gray-900">稿件录入</Text>
        <Text className="block text-xs text-gray-500 mt-1">批量录入多个剪辑师的稿件</Text>
      </View>

      <View className="p-4">
        {/* 日期选择 */}
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
          <Text className="block text-sm font-semibold text-gray-900 mb-3">录入日期</Text>
          <Picker
            mode="date"
            value={date}
            onChange={handleDateChange}
          >
            <View className="bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between">
              <Text className="block text-sm text-gray-700">{date}</Text>
              <Calendar size={20} color="#2563eb" />
            </View>
          </Picker>
        </View>

        {/* 批量录入列表 */}
        {works.map((work) => (
          <View key={work.editor_id} className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
            <View className="flex items-center gap-3 mb-3">
              <View className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <User size={16} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="block text-sm font-semibold text-gray-900">{work.editor_name}</Text>
                <Text className="block text-xs text-gray-500">¥{work.price}/条</Text>
              </View>
            </View>

            {/* 稿件标题 */}
            <View className="mb-3">
              <Text className="block text-xs text-gray-600 mb-1">稿件标题</Text>
              <View className="bg-gray-50 rounded-lg px-3 py-2">
                <Input
                  className="w-full bg-transparent text-xs"
                  placeholder="输入稿件标题"
                  value={work.title}
                  onInput={(e) => updateWorkTitle(work.editor_id, e.detail.value)}
                />
              </View>
            </View>

            {/* 稿件数量 */}
            <View>
              <Text className="block text-xs text-gray-600 mb-1">稿件数量</Text>
              <View className="bg-gray-50 rounded-lg px-3 py-2">
                <Input
                  className="w-full bg-transparent text-sm"
                  type="number"
                  placeholder="输入稿件数量"
                  value={work.count.toString()}
                  onInput={(e) => updateWorkCount(work.editor_id, e.detail.value)}
                />
              </View>
            </View>
          </View>
        ))}

        {editors.length === 0 && (
          <View className="text-center py-12">
            <Text className="block text-gray-500">暂无剪辑师，请先在&quot;剪辑师&quot;页面添加</Text>
          </View>
        )}

        {/* 操作按钮 */}
        <View className="flex gap-3 mt-4">
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
            <Text className="block text-sm text-white">{loading ? '提交中...' : '批量提交'}</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default IndexPage
