/* eslint-disable react/prop-types */
import { useThree } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import { useSnapshot } from 'valtio'

const Controls = ({ state, modes }) => {
  // Get notified on changes to state
  const snap = useSnapshot(state)
  const scene = useThree((state) => state.scene)

  return (
    <>
      {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
      {snap.current && (
        <TransformControls 
          object={scene.getObjectByName(snap.current)} 
          mode={modes[snap.mode]}
          showX={modes[snap.mode] == "rotate" ? false : true}
          showY={modes[snap.mode] == "translate" ? false : true}
          showZ={modes[snap.mode] == "rotate" ? false : true}
        />
      )}
      {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
      <OrbitControls
        makeDefault 
        minPolarAngle={0.0} 
        maxPolarAngle={Math.PI / 2.75}
        minDistance={2.5}
        maxDistance={8}
      />
    </>
  )
}

export default Controls
