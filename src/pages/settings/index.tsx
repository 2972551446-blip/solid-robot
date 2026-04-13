import { View, Text } from '@tarojs/components'
import { Settings, Info } from 'lucide-react-taro'

const SettingsPage = () => {
  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      <View className="bg-white p-4 border-b border-gray-200">
        <Text className="block text-xl font-bold text-gray-900">设置</Text>
        <Text className="block text-xs text-gray-500 mt-1">应用配置和说明</Text>
      </View>

      <View className="p-4">
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
          <View className="flex items-center gap-3 mb-3">
            <Settings size={20} color="#2563eb" />
            <Text className="block text-sm font-semibold text-gray-900">功能说明</Text>
          </View>
          <Text className="block text-xs text-gray-600 leading-relaxed">
            • 录入页面：录入每日稿件数量和标题{'\n'}
            • 统计页面：查看稿件数量和金额统计{'\n'}
            • 剪辑师管理：添加、删除和管理剪辑师{'\n'}
            • 单休制度：周日无需录入（节假日加班除外）{'\n'}
            • 价格锁定：录入时的单价保持不变{'\n'}
            • 节假日：国家法定节假日自动识别
          </Text>
        </View>

        <View className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <View className="flex items-center gap-3 mb-2">
            <Info size={20} color="#2563eb" />
            <Text className="block text-sm font-semibold text-blue-900">注意事项</Text>
          </View>
          <Text className="block text-xs text-blue-700 leading-relaxed">
            • 数据保存1年，自动清理过期数据{'\n'}
            • 每天晚上11点提醒未录入数据{'\n'}
            • 价格修改后，已有数据不受影响
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SettingsPage
