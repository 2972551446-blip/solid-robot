import { useState, useEffect } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import { Network } from '@/network'
import { Calendar, TrendingUp } from 'lucide-react-taro'

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

const StatisticsPage = () => {
  const [works, setWorks] = useState<Work[]>([])
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
              <Text className="text-xs text-gray-600">总数量</Text>
            </View>
            <Text className="block text-2xl font-bold text-blue-600">{totalCount}</Text>
            <Text className="block text-xs text-gray-500 mt-1">条稿件</Text>
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

        <Text className="block text-sm font-semibold text-gray-900 mb-3">明细列表</Text>
        {works.map((work) => (
          <View key={work.id} className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
            <View className="flex justify-between items-start mb-2">
              <View>
                <Text className="block text-sm font-semibold text-gray-900">{work.title}</Text>
                <Text className="block text-xs text-gray-500 mt-1">{work.editors?.name}</Text>
              </View>
              <Text className="text-sm font-bold text-blue-600">¥{(work.count * work.price).toFixed(2)}</Text>
            </View>
            <View className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
              <Text className="text-xs text-gray-500">{work.date}</Text>
              <Text className="text-xs text-gray-600">{work.count} 条 × ¥{work.price}</Text>
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
