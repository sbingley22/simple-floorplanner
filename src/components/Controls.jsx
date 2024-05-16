/* eslint-disable react/prop-types */
import { useThree } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'

const Controls = ({ state, modes, view }) => {
  // Get notified on changes to state
  const snap = useSnapshot(state)
  const scene = useThree((state) => state.scene)
  const { camera } = useThree()

  useEffect(()=>{
    if (view == 1) {
      camera.rotation.set(-Math.PI / 2, 0, 0)
      camera.position.set(0, 10, 0)
      camera.lookAt(0, 0, 0.1)
      camera.updateProjectionMatrix()
    } else {
      //camera.position.set(5, 5, 0)
      //camera.updateProjectionMatrix()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[view])

  return (
    <>
      {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
      {snap.current && (
        <TransformControls 
          object={scene.getObjectByName(snap.current)} 
          mode={modes[snap.mode]}
          showX={modes[snap.mode] == "rotate" ? false : true}
          showY={modes[snap.mode] == "translate" || modes[snap.mode] == "scale" ? false : true}
          showZ={modes[snap.mode] == "rotate" ? false : true}
          rotationSnap={Math.PI/4}
          translationSnap={0.1}
          scaleSnap={0.1}
        />
      )}
      {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
      <OrbitControls
        makeDefault 
        minPolarAngle={0.0} 
        maxPolarAngle={Math.PI / 2.75}
        minDistance={8}
        maxDistance={15}
        enableRotate={view == 0 ? true : false}
      />
    </>
  )
}

export default Controls
