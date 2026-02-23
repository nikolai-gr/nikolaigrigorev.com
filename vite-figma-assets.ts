import type { Plugin } from 'vite'

// Placeholder: 1x1 transparent PNG (valid so img src works)
const PLACEHOLDER_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

const FIGMA_ASSET_PREFIX = 'figma:asset/'
const VIRTUAL_PREFIX = '\0virtual:figma-asset:'

export function figmaAssetPlugin(): Plugin {
  return {
    name: 'vite-plugin-figma-asset',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith(FIGMA_ASSET_PREFIX)) {
        return VIRTUAL_PREFIX + id
      }
      return null
    },
    load(id) {
      if (id.startsWith(VIRTUAL_PREFIX)) {
        return `export default ${JSON.stringify(PLACEHOLDER_PNG)}`
      }
      return null
    },
  }
}
