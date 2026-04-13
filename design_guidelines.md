# 剪辑师计数应用 - 设计指南

## 品牌定位

**应用类型**：专业工具/效率管理
**设计风格**：简洁、专业、数据可视化优先
**目标用户**：剪辑工作室管理者、助理
**核心价值**：高效统计、清晰数据、易用性

## 配色方案

### 主色调（蓝灰冷色系 - 工具/效率类应用）

**主色**：专业蓝
- `bg-blue-600` / `text-blue-600` - 主要操作、标题、重点信息
- `bg-blue-500` / `text-blue-500` - 按钮、选中态
- `bg-blue-50` / `text-blue-700` - 轻量标签、信息提示

**辅色**：中性灰
- `bg-gray-50` / `bg-gray-100` - 页面背景、卡片背景
- `bg-gray-200` / `bg-gray-300` - 分割线、边框
- `text-gray-900` - 主标题、重要文本
- `text-gray-600` / `text-gray-500` - 次要文本、说明文字

**语义色**
- `text-green-600` / `bg-green-50` - 正数、增加、成功状态
- `text-red-600` / `bg-red-50` - 负数、减少、警告状态
- `text-orange-600` / `bg-orange-50` - 节假日、加班提醒
- `text-purple-600` / `bg-purple-50` - 统计数据、汇总信息

## 字体规范

| 层级      | 类名                 | 用途场景           |
| --------- | -------------------- | ------------------ |
| H1 标题   | `text-2xl font-bold` | 页面主标题         |
| H2 标题   | `text-xl font-bold`  | 区块标题           |
| H3 标题   | `text-lg font-bold`  | 卡片标题           |
| 正文      | `text-sm`            | 正文内容           |
| 辅助文本  | `text-xs text-gray-500` | 说明、备注       |
| 数字强调  | `text-lg font-semibold text-blue-600` | 统计数据   |

## 间距系统

**页面边距**：`p-4`（16px）
**卡片内边距**：`p-4`
**组件间距**：`gap-3`（12px）、`gap-4`（16px）
**区块间距**：`mb-4`（16px）、`mb-6`（24px）
**输入框内边距**：`px-4 py-3`

## 组件使用原则

**核心规则**：按钮、输入框、弹窗、Tabs、Toast、Card、表单控件等通用组件，必须优先从 `@/components/ui/*` 导入，禁止用 View/Text 手搓。

**页面组件选型示例**：
- 录入页：Input（输入数量）、Select（选择剪辑师）、Button（提交/一键默认）
- 统计页：Card（数据卡片）、Tabs（切换视图）、Table（数据列表）
- 导出页：Button（导出按钮）、Select（时间范围选择）
- 设置页：Input（设置价格）、Button（保存/删除）、Dialog（确认弹窗）

**容器样式原则**：
- 卡片：`bg-white rounded-xl shadow-sm border border-gray-100`
- 页面背景：`bg-gray-50 min-h-screen`
- 分组容器：`bg-white rounded-xl p-4 mb-4`

## 导航结构

### TabBar 配置（4个主要页面）

1. **首页**（录入页）
   - 路径：`pages/index/index`
   - 图标：`FileText`（文件图标）
   - 文本：录入

2. **统计**（查看页）
   - 路径：`pages/statistics/index`
   - 图标：`BarChart3`（图表图标）
   - 文本：统计

3. **剪辑师**（管理页）
   - 路径：`pages/editors/index`
   - 图标：`Users`（用户图标）
   - 文本：剪辑师

4. **设置**（设置页）
   - 路径：`pages/settings/index`
   - 图标：`Settings`（设置图标）
   - 文本：设置

### 页面跳转规范
- TabBar 页面之间使用 `Taro.switchTab()`
- 普通页面跳转使用 `Taro.navigateTo()`
- 导出等功能使用 Modal/Dialog，不单独页面

## 状态展示原则

### 空状态
- 使用 `@/components/ui/empty`（需添加）或自定义 View
- 显示图标 + 提示文字 + 引导操作
- 示例：暂无数据、今日未录入

### 加载态
- 使用 `@/components/ui/skeleton`（骨架屏）
- 列表加载、页面切换时显示

### 错误状态
- 使用 `@/components/ui/alert`（警告提示）
- 显示错误信息 + 重试按钮

## 小程序约束

### 包体积优化
- 图片/视频资源使用 TOS 对象存储（TabBar 图标除外）
- TabBar 图标使用 CLI 生成，放在 `src/assets/tabbar/`
- 避免引入不必要的大型依赖

### 性能优化
- 列表数据使用虚拟列表（数据量大时）
- 图片懒加载：`lazyLoad` 属性
- 按需加载页面（分包）

### 平台兼容
- 使用 Tailwind CSS 跨端样式
- 平台检测：`Taro.getEnv() === Taro.ENV_TYPE.WEAPP`
- H5 降级提示：原生组件（Camera、RecorderManager 等）需添加 H5 提示

## 数据可视化规范

### 统计卡片布局
```
┌─────────────────────┐
│  总数量              │  bg-blue-50
│  1,234              │  text-2xl font-bold text-blue-600
│  本月新增 +128       │  text-xs text-gray-500
└─────────────────────┘
```

### 数据列表项
- 使用 `Card` + `CardContent` 布局
- 每行显示：日期、剪辑师、数量、金额
- 金额使用颜色区分（正数绿色、节假日橙色）

### 汇总区域
- 固定在页面底部：`fixed bottom-0 left-0 right-0 bg-white border-t p-4`
- 显示总数量、总金额
- 使用大字体 + 主色调突出显示
