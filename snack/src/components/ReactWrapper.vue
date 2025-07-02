<template>
  <div ref="reactContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

console.log('ReactWrapper script setup executed!')

const reactContainer = ref(null)
let reactRoot = null

const props = defineProps({
  remoteModule: {
    type: String,
    required: true
  },
  componentName: {
    type: String,
    default: 'default'
  }
})

onMounted(async () => {
  console.log('ReactWrapper mounted!')
  console.log('Props:', props)
  console.log('Container:', reactContainer.value)
  
  try {
    console.log('Loading module:', props.remoteModule)
    const module = await import(/* @vite-ignore */ props.remoteModule)
    console.log('Module loaded:', module)
    console.log('Available exports:', Object.keys(module))
    
    const Component = module[props.componentName] || module.default
    console.log('Component:', Component)
    
    if (Component) {
      console.log('Loading React...')
      const React = await import('react')
      const ReactDOM = await import('react-dom/client')
      console.log('React loaded, creating root...')
      
      reactRoot = ReactDOM.createRoot(reactContainer.value)
      console.log('Root created, rendering component...')
      reactRoot.render(React.createElement(Component))
      console.log('Component rendered!')
    } else {
      console.error('Component not found:', props.componentName)
    }
  } catch (error) {
    console.error('Failed to load React component:', error)
    console.error('Error details:', error.message)
    console.error('Error stack:', error.stack)
  }
})

onUnmounted(() => {
  if (reactRoot) {
    reactRoot.unmount()
  }
})
</script>