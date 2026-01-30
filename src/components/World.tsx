import { MathUtils } from 'three'

export function World() {
  return (
    <>
      <mesh castShadow position-y={0.5}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh receiveShadow scale={5} rotation-x={MathUtils.degToRad(-90)}>
        <planeGeometry />
        <meshStandardMaterial color="limegreen" />
      </mesh>
    </>
  )
}
