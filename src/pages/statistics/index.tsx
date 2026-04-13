import { useState, useEffect } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Network } from '@/network'
import { Calendar, TrendingUp, User, Trash2 } from 'lucide-react-taro'

interface Work {
  id: number
  editor_id: number
  date: string
  count: number
  title: string
  price: number
  is_overtime: boolean
  editors?: {
    name: string
  }
}

interface EditorStats {
  editor_id: number
  editor_name: string
  total_count: number
  total_amount: number
  average_price: number
}

const StatisticsPage = () => {
  const [works, setWorks] = useState<Work[]>([])
  const [editorStats, setEditorStats] = useState<EditorStats[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    initCurrentMonth()
  }, [])

  useEffect(() => {
    if (startDate && endDate) {
      fetchStatistics()
    }
  }, [startDate, endDate])

  const initCurrentMonth = () => {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    setStartDate(formatDate(firstDay))
    setEndDate(formatDate(lastDay))
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const fetchStatistics = async () => {
    if (!startDate || !endDate) return

    try {
      const res = await Network.request({
        url: '/api/works/by-range',
        method: 'GET',
        data: { startDate, endDate }
      })
      if (res.data && res.data.data) {
        const worksData = res.data.data
        setWorks(worksData)

        const count = worksData.reduce((sum, work: Work) => sum + work.count, 0)
        const amount = worksData.reduce((sum, work: Work) => sum + (work.count * work.price), 0)

        setTotalCount(count)
        setTotalAmount(amount)

        // 计算每个剪辑师的统计
        const statsMap = new Map<number, EditorStats>()
        worksData.forEach((work: Work) => {
          const editorName = work.editors?.name || '未知'
          if (!statsMap.has(work.editor_id)) {
            statsMap.set(work.editor_id, {
              editor_id: work.editor_id,
              editor_name: editorName,
              total_count: 0,
              total_amount: 0,
              average_price: 0
            })
          }
          const stats = statsMap.get(work.editor_id)!
          stats.total_count += work.count
          stats.total_amount += work.count * work.price
        })

        // 计算平均单价
        const statsArray = Array.from(statsMap.values()).map(stats => ({
          ...stats,
          average_price: stats.total_count > 0 ? stats.total_amount / stats.total_count : 0
        }))

        // 按总金额降序排序
        statsArray.sort((a, b) => b.total_amount - a.total_amount)
        setEditorStats(statsArray)
      }
    } catch (error) {
      console.error('获取统计数据失败', error)
    }
  }

  const handleStartChange = (e: any) => {
    const { value } = e.detail
    setStartDate(value)
  }

  const handleEndChange = (e: any) => {
    const { value } = e.detail
    setEndDate(value)
  }

  const handleCurrentMonth = () => {
    initCurrentMonth()
  }

  const handleLastMonth = () => {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth(), 0)

    setStartDate(formatDate(firstDay))
    setEndDate(formatDate(lastDay))
  }

  const handleDeleteWork = async (id: number, editorName: string) => {
    Taro.showModal({
      title: '确认删除',
      content: `确定要删除 ${editorName} 的这条记录吗？`,
      success: async (res) => {
        if (res.confirm) {
          try {
            await Network.request({
              url: `/api/works/${id}`,
              method: 'DELETE'
            })
            fetchStatistics()
            Taro.showToast({
              title: '删除成功',
              icon: 'success'
            })
          } catch (error) {
            console.error('删除失败', error)
            Taro.showToast({
              title: '删除失败',
              icon: 'none'
            })
          }
        }
      }
    })
  }

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      <View className="bg-white p-4 border-b border-gray-200">
        <Text className="block text-xl font-bold text-gray-900">数据统计</Text>
        <Text className="block text-xs text-gray-500 mt-1">查看稿件数量和金额统计</Text>
      </View>

      <View className="p-4">
        {/* 快捷按钮 */}
        <View className="flex gap-3 mb-4">
          <View
            className="flex-1 bg-blue-50 rounded-xl px-4 py-3 text-center border border-blue-100"
            onClick={handleCurrentMonth}
          >
            <Text className="block text-sm font-semibold text-blue-600">本月</Text>
          </View>
          <View
            className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-center border border-gray-100"
            onClick={handleLastMonth}
          >
            <Text className="block text-sm font-semibold text-gray-600">上月</Text>
          </View>
        </View>

        {/* 日期选择 */}
        <View className="flex gap-3 mb-4">
          <View className="flex-1 bg-white rounded-xl px-4 py-3 border border-gray-100">
            <Text className="block text-xs text-gray-500 mb-1">开始日期</Text>
            <Picker
              mode="date"
              value={startDate}
              onChange={handleStartChange}
            >
              <View className="flex items-center justify-between">
                <Text className="block text-sm font-semibold text-gray-900">{startDate}</Text>
                <Calendar size={18} color="#2563eb" />
              </View>
            </Picker>
          </View>
          <View className="flex-1 bg-white rounded-xl px-4 py-3 border border-gray-100">
            <Text className="block text-xs text-gray-500 mb-1">结束日期</Text>
            <Picker
              mode="date"
              value={endDate}
              onChange={handleEndChange}
            >
              <View className="flex items-center justify-between">
                <Text className="block text-sm font-semibold text-gray-900">{endDate}</Text>
                <Calendar size={18} color="#2563eb" />
              </View>
            </Picker>
          </View>
        </View>

        <View className="grid grid-cols-2 gap-3 mb-4">
          <View className="bg-blue-50 rounded-xl p-4">
            <View className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} color="#2563eb" />
              <Text className="text-xs text-gray-600">总时长</Text>
            </View>
            <Text className="block text-2xl font-bold text-blue-600">{totalCount}</Text>
            <Text className="block text-xs text-gray-500 mt-1">分钟</Text>
          </View>
          <View className="bg-green-50 rounded-xl p-4">
            <View className="flex items-center gap-2 mb-2">
              <Calendar size={16} color="#16a34a" />
              <Text className="text-xs text-gray-600">总金额</Text>
            </View>
            <Text className="block text-2xl font-bold text-green-600">¥{totalAmount.toFixed(2)}</Text>
            <Text className="block text-xs text-gray-500 mt-1">总收入</Text>
          </View>
        </View>

        {/* 剪辑师统计 */}
        <Text className="block text-sm font-semibold text-gray-900 mb-3">剪辑师统计</Text>
        {editorStats.map((stat) => (
          <View key={stat.editor_id} className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
            <View className="flex items-center gap-3 mb-3">
              <View className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <User size={20} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="block text-base font-semibold text-gray-900">{stat.editor_name}</Text>
                <Text className="block text-xs text-gray-500">¥{stat.average_price.toFixed(2)}/分钟</Text>
              </View>
            </View>
            <View className="grid grid-cols-2 gap-3">
              <View className="bg-gray-50 rounded-lg p-3">
                <Text className="block text-xs text-gray-500 mb-1">时长（分钟）</Text>
                <Text className="block text-lg font-bold text-blue-600">{stat.total_count}</Text>
              </View>
              <View className="bg-gray-50 rounded-lg p-3">
                <Text className="block text-xs text-gray-500 mb-1">总金额</Text>
                <Text className="block text-lg font-bold text-green-600">¥{stat.total_amount.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ))}

        {editorStats.length === 0 && works.length > 0 && (
          <View className="text-center py-8">
            <Text className="block text-gray-500">暂无剪辑师数据</Text>
          </View>
        )}

        <Text className="block text-sm font-semibold text-gray-900 mb-3 mt-4">明细列表</Text>
        {works.map((work) => (
          <View key={work.id} className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
            <View className="flex justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="block text-sm font-semibold text-gray-900">{work.title}</Text>
                <Text className="block text-xs text-gray-500 mt-1">{work.editors?.name}</Text>
              </View>
              <View className="flex items-center gap-2">
                <Text className="text-sm font-bold text-blue-600">¥{(work.count * work.price).toFixed(2)}</Text>
                <View
                  className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center ml-2"
                  onClick={() => handleDeleteWork(work.id, work.editors?.name || '未知剪辑师')}
                >
                  <Trash2 size={16} color="#dc2626" />
                </View>
              </View>
            </View>
            <View className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
              <Text className="text-xs text-gray-500">{work.date}</Text>
              <Text className="text-xs text-gray-600">{work.count} 分钟 × ¥{work.price}</Text>
            </View>
          </View>
        ))}

        {works.length === 0 && (
          <View className="text-center py-12">
            <Text className="block text-gray-500">暂无数据</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default StatisticsPage
