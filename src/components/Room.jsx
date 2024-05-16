/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box, Plane } from "@react-three/drei"
import { useRef } from "react"

const Room = ({ id, pos, rot, scl, state, trimWalls, floorColor, color, placementMode }) => {
  const group = useRef()

  const meshClicked = (e) => {
    //console.log(e)
    if (placementMode) return
    if (e.object.name == "floor") return

    e.stopPropagation()
    state.current = id
    state.label = "room"
  }

  const deselect = () => {
    state.current = null
  }

  const scale = 4
  const wallThickness = scale * 0.05
  const wallWidth = scale * 2.05
  const wallHeight = trimWalls ? 1 : 4

  return (
    <>
      <group    
        ref={group}
        name={id}
        label={"room"}
        position={pos}
        onClick={meshClicked}
        onPointerMissed={deselect}
        scale-y={wallHeight}
        receiveShadow
        castShadow
      >
        
        <Plane
          name="floor"
          rotation-x={-Math.PI/2}
          scale={scale*2}
          style={{pointerEvents: false}}
          receiveShadow
          //onClick={(e) => e.stopPropagation()}
        >
          <meshStandardMaterial color={floorColor} receiveShadow />
        </Plane>

        <Box
          position-x={-scale}
          scale-x={wallThickness}
          scale-z={wallWidth}
          castShadow
        >
          <meshStandardMaterial color={color} castShadow />
        </Box>
        <Box
          position-x={scale}
          scale-x={wallThickness}
          scale-z={wallWidth}
        >
          <meshStandardMaterial color={color} />
        </Box>
        <Box
          position-z={-scale}
          scale-x={wallWidth}
          scale-z={wallThickness}
        >
          <meshStandardMaterial color={color} />
        </Box>
        <Box
          position-z={scale}
          scale-x={wallWidth}
          scale-z={wallThickness}
        >
          <meshStandardMaterial color={color} />
        </Box>
      </group>
    </>
  )
}

export default Room
