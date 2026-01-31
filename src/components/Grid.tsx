import { Center } from '@react-three/drei'

import { GRID_CONFIG } from '@logic'

export function Grid() {
  return (
    <Center position-y={-0.4} scale={2}>
      {GRID_CONFIG.flatMap((cells, row) =>
        cells.map(
          (cell, column) =>
            cell && (
              <mesh
                receiveShadow
                key={`cell-${row}-${column}`}
                position={[column, 0, row]}
                scale={[0.9, 0.4, 0.9]}
              >
                <boxGeometry />
                <meshMatcapMaterial color={cell === 1 ? 'white' : cell} />
              </mesh>
            ),
        ),
      )}
    </Center>
  )
}
