/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box } from "@react-three/drei"
import { useRef } from "react"

const Room = ({ id, pos, state, trimWalls, color }) => {
  const group = useRef()

  const meshClicked = (e) => {
    //console.log(props.state.current)
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
    <group    
      ref={group}
      name={id}
      label={"room"}
      position={pos}
      onClick={meshClicked}
      onPointerMissed={deselect}
      scale-y={wallHeight}
    >
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
  )
}

export default Room
