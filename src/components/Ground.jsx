/* eslint-disable react/prop-types */
import { Plane } from '@react-three/drei'

const Ground = ({ placeItem, placementMode }) => {
  const scale = 25

  const handleClick = (e) => {
    //console.log(e)
    e.stopPropagation()
    placeItem(e)
  }

  return (
    <>
      <Plane 
        position-y={-0.01}
        scale={[scale * 0.75, scale, 1]}
        rotation-x={-Math.PI/2} 
        material-color="#445522"
        receiveShadow
        onClick={placementMode && handleClick}
      />
    </>
  )
}

export default Ground
