/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import glbFile from '../assets/items.glb?url'
import { useEffect, useRef } from 'react'

const Item = ({ id, name, x, z, state }) => {
  const mesh = useRef()
  const { nodes } = useGLTF(glbFile)

  useEffect(()=>{
    console.log(nodes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const meshClicked = (e) => {
    // Click sets the mesh as the new target
    e.stopPropagation()
    state.current = id
    //console.log(props.state.current)
  }

  const deselect = () => {
    state.current = null
  }

  return (
    <>
      <mesh
        ref={mesh}
        name={id}
        label={name}
        geometry={nodes[name].geometry}
        material={nodes[name].material}
        position={[x,0,z]}
        onClick={meshClicked}
        onPointerMissed={deselect}
      />
    </>
  )
}

export default Item
