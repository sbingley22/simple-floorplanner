/* eslint-disable react/prop-types */
import { Plane } from '@react-three/drei'

const Ground = ({ placeObject, placementMode }) => {
  const scale = 25

  const handleClick = (e) => {
    //console.log(e)
    e.stopPropagation()
    placeObject(e)
  }

  return (
    <>
      <Plane 
        position-y={-0.001}
        scale={[scale * 0.9, scale, 1]}
        rotation-x={-Math.PI/2} 
        material-color="#998877"
        receiveShadow
        onClick={placementMode && handleClick}
      />
    </>
  )
}

export default Ground
