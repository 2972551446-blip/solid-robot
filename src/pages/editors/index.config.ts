export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '剪辑师' })
  : { navigationBarTitleText: '剪辑师' }
