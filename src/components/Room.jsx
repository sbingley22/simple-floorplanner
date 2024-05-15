/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Box } from "@react-three/drei"
import { useRef } from "react"

const Room = ({ id, pos, state }) => {
  const group = useRef()
  const color = "#DDDDAA"

  const meshClicked = (e) => {
    //console.log(props.state.current)
    e.stopPropagation()
    state.current = id
  }

  const deselect = () => {
    state.current = null
  }

  const scale = 2

  return (
    <group    
      ref={group}
      name={id}
      label={"room"}
      position={pos}
      onClick={meshClicked}
      onPointerMissed={deselect}
      scale={0.9}
    >
      <Box
        position-x={-scale}
        scale-x={scale * 0.1}
        scale-z={scale * 2}
        castShadow
      >
        <meshStandardMaterial color={color} castShadow />
      </Box>
      <Box
        position-x={scale}
        scale-x={scale * 0.1}
        scale-z={scale * 2}
      >
        <meshStandardMaterial color={color} />
      </Box>
      <Box
        position-z={-scale}
        scale-x={scale * 2}
        scale-z={scale * 0.1}
      >
        <meshStandardMaterial color={color} />
      </Box>
      <Box
        position-z={scale}
        scale-x={scale * 2}
        scale-z={scale * 0.1}
      >
        <meshStandardMaterial color={color} />
      </Box>
    </group>
  )
}

export default Room
