import { View, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Settings, Info, Bell, UserPlus, Trash2 } from 'lucide-react-taro'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Network } from '@/network'

interface Admin {
  id: number
  openid: string
  nickname: string
  is_active: boolean
  created_at: string
}

const SettingsPage = () => {
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [admins, setAdmins] = useState<Admin[]>([])
  const [showAddAdminModal, setShowAddAdminModal] = useState(false)
  const [newAdminOpenid, setNewAdminOpenid] = useState('')

  useEffect(() => {
    loadSettings()
    fetchAdmins()
  }, [])

  const loadSettings = () => {
    try {
      const enabled = Taro.getStorageSync('reminderEnabled')
      setReminderEnabled(enabled === true)
    } catch (error) {
      console.error('加载设置失败', error)
    }
  }

  const fetchAdmins = async () => {
    try {
      const res = await Network.request({
        url: '/api/admins',
        method: 'GET'
      })
      if (res.data && res.data.data) {
        setAdmins(res.data.data)
      }
    } catch (error) {
      console.error('获取管理员列表失败', error)
    }
  }

  const handleReminderToggle = (checked: boolean) => {
    try {
      Taro.setStorageSync('reminderEnabled', checked)
      setReminderEnabled(checked)
      console.log('提醒设置已更新', checked)
    } catch (error) {
      console.error('保存设置失败', error)
    }
  }

  const handleAddAdmin = async () => {
    if (!newAdminOpenid.trim()) {
      Taro.showToast({
        title: '请输入管理员OpenID',
        icon: 'none'
      })
      return
    }

    try {
      const res = await Network.request({
        url: '/api/admins',
        method: 'POST',
        data: {
          openid: newAdminOpenid.trim(),
          nickname: '管理员'
        }
      })
      console.log('添加成功', res.data)
      setNewAdminOpenid('')
      setShowAddAdminModal(false)
      fetchAdmins()
      Taro.showToast({
        title: '添加成功',
        icon: 'success'
      })
    } catch (error) {
      console.error('添加失败', error)
      Taro.showToast({
        title: '添加失败',
        icon: 'none'
      })
    }
  }

  const handleDeleteAdmin = async (id: number) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除该管理员吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await Network.request({
              url: `/api/admins/${id}`,
              method: 'DELETE'
            })
            fetchAdmins()
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

  const handleSubscribeMessage = async () => {
    try {
      // TODO: 实现订阅消息授权
      // Taro.requestSubscribeMessage({
      //   tmplIds: ['模板ID'],
      //   success: (res) => {
      //     console.log('订阅成功', res)
      //   }
      // })

      Taro.showToast({
        title: '请等待管理员配置订阅消息模板',
        icon: 'none',
        duration: 3000
      })
    } catch (error) {
      console.error('订阅消息授权失败', error)
    }
  }
  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      <View className="bg-white p-4 border-b border-gray-200">
        <Text className="block text-xl font-bold text-gray-900">设置</Text>
        <Text className="block text-xs text-gray-500 mt-1">应用配置和说明</Text>
      </View>

      <View className="p-4">
        {/* 提醒设置 */}
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
          <View className="flex items-center justify-between">
            <View className="flex items-center gap-3">
              <Bell size={20} color="#2563eb" />
              <View>
                <Text className="block text-sm font-semibold text-gray-900">每晚提醒</Text>
                <Text className="block text-xs text-gray-500">每天晚上11点提醒录入</Text>
              </View>
            </View>
            <Switch
              checked={reminderEnabled}
              onCheckedChange={handleReminderToggle}
            />
          </View>
        </View>

        {/* 订阅消息授权 */}
        {reminderEnabled && (
          <View className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
            <View className="flex items-center gap-3 mb-2">
              <Bell size={20} color="#2563eb" />
              <Text className="block text-sm font-semibold text-blue-900">订阅消息授权</Text>
            </View>
            <Text className="block text-xs text-blue-700 mb-3">
              开启提醒后，需要授权订阅消息才能收到通知
            </Text>
            <Button
              className="bg-blue-600"
              onClick={handleSubscribeMessage}
            >
              <Text className="text-white text-sm">授权订阅消息</Text>
            </Button>
          </View>
        )}

        {/* 管理员管理 */}
        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
          <View className="flex items-center justify-between mb-3">
            <View className="flex items-center gap-3">
              <Settings size={20} color="#2563eb" />
              <Text className="block text-sm font-semibold text-gray-900">管理员管理</Text>
            </View>
            <Button
              className="bg-blue-600"
              size="sm"
              onClick={() => setShowAddAdminModal(true)}
            >
              <UserPlus size={16} color="white" />
              <Text className="text-white text-xs ml-1">添加</Text>
            </Button>
          </View>

          {admins.length === 0 ? (
            <View className="text-center py-6">
              <Text className="text-xs text-gray-500">暂无管理员</Text>
            </View>
          ) : (
            admins.map((admin) => (
              <View
                key={admin.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-2"
              >
                <View>
                  <Text className="text-sm font-semibold text-gray-900">{admin.nickname}</Text>
                  <Text className="text-xs text-gray-500">{admin.openid}</Text>
                </View>
                <Button
                  className="bg-red-50"
                  size="sm"
                  onClick={() => handleDeleteAdmin(admin.id)}
                >
                  <Trash2 size={14} color="#dc2626" />
                </Button>
              </View>
            ))
          )}
        </View>

        {/* 功能说明 */}
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
            • 数据保存3年，自动清理过期数据{'\n'}
            • 每天晚上11点提醒未录入数据{'\n'}
            • 价格修改后，已有数据不受影响
          </Text>
        </View>
      </View>

      {/* 添加管理员弹窗 */}
      {showAddAdminModal && (
        <View className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <View className="bg-white rounded-xl p-6 w-full max-w-sm">
            <Text className="block text-lg font-bold text-gray-900 mb-4">添加管理员</Text>
            <View className="mb-4">
              <Text className="block text-sm font-medium text-gray-700 mb-2">OpenID</Text>
              <Input
                className="w-full bg-gray-50"
                placeholder="输入管理员的微信OpenID"
                value={newAdminOpenid}
                onInput={(e) => setNewAdminOpenid(e.detail.value)}
              />
            </View>
            <View className="mb-6">
              <Text className="block text-xs text-gray-500">
                OpenID是微信用户的唯一标识，可以在小程序开发工具中获取
              </Text>
            </View>
            <View className="flex gap-3">
              <Button
                className="flex-1 bg-gray-100 text-gray-700"
                onClick={() => setShowAddAdminModal(false)}
              >
                <Text className="block text-sm">取消</Text>
              </Button>
              <Button
                className="flex-1 bg-blue-600"
                onClick={handleAddAdmin}
              >
                <Text className="block text-sm text-white">确认添加</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default SettingsPage
