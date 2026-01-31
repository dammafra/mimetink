import { useTexture } from '@react-three/drei'

/**
 * Loads textures from glob import results.
 * @param modules Result of import.meta.glob(..., { eager: true, as: 'url' })
 * @returns Array of textures
 */
export function useFolderTextures(modules: Record<string, unknown>) {
  const paths = Object.values(modules).map(url => (url as string).replace('/public', ''))
  return useTexture(paths)
}
