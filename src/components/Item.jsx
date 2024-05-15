/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import glbFile from '../assets/items.glb?url'
import { useEffect, useRef } from 'react'

const Item = ({ id, name, pos, state }) => {
  const mesh = useRef()
  const { nodes } = useGLTF(glbFile)

  useEffect(()=>{
    console.log(nodes[name])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const meshClicked = (e) => {
    //console.log(props.state.current)
    e.stopPropagation()
    state.current = id
    state.label = name
    if (state.mode == 2) state.mode = 0
  }

  // const deselect = () => {
  //   state.current = null
  // }

  return (
    <>
      {nodes[name].type == "Mesh" || nodes[name].type == "Object3D" && <mesh
        ref={mesh}
        name={id}
        label={name}
        geometry={nodes[name].geometry}
        material={nodes[name].material}
        position={pos}
        onClick={meshClicked}
        //onPointerMissed={deselect}
        castShadow
      />}

      {nodes[name].type == "Group" && (
        <group 
          ref={mesh}
          name={id}
          position={pos}
          onClick={meshClicked}
          //onPointerMissed={deselect}
          castShadow
        >
          {nodes[name].children.map((child, index) => (
            <mesh
              key={index}
              name={`${id}-${index}`}
              geometry={child.geometry}
              material={child.material}
              castShadow
            />
          ))}
        </group>
      )}
    </>
  )
}

export default Item
