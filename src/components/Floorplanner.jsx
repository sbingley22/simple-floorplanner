/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import Controls from "./Controls"
import { proxy, useSnapshot } from 'valtio'
import { v4 as uuidv4 } from 'uuid'
import Item from "./Item"
import { button, useControls } from "leva"

// Reactive state model, using Valtio ...
const modes = ['translate', 'rotate', 'scale']
const state = proxy({ current: null, mode: 1 })

const Floorplanner = () => {
  const canvasRef = useRef()
  const snap = useSnapshot(state)
  const [hudText, setHudText] = useState("")

  const [placementMode, setPlacementMode] = useState(null)
  const [items, setItems] = useState([{id: uuidv4(), name: "file_cabinet", x: 0, z: 0}])

  const addItemPlacement = (itemName) => {
    state.current = null
    setPlacementMode(itemName)
  }

  // Leva Controls
  useControls('Items',
    {
      "File Cabinet": button(() => {
        addItemPlacement("file_cabinet")
      }),
      "Office Chair": button(() => {
        addItemPlacement("office_chair")
      }),
    }, [addItemPlacement]
  )
  useControls('Gizmo',
    {
      translate: button(() => {
        state.mode = 0
      }),
      rotate: button(() => {
        state.mode = 1
      }),
    },
    { collapsed: true}
  )

  // Update HUD text
  useEffect(()=>{
    if (snap.current) {
      setHudText(snap.current)
      return
    }
    if (placementMode) {
      const itemName = placementMode.split("_").join(" ")
      setHudText("Click to place " + itemName)
      return
    }

  }, [snap, placementMode])
  
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas 
        ref={canvasRef}
        shadows
      >
        <Suspense>
          <Controls state={state} modes={modes} />
          <ambientLight intensity={0.9} />

          {items.map(item=>(
            <Item 
              key={item.id}
              id={item.id}
              name={item.name} 
              x={item.x} 
              z={item.z}
              state={state}
            />
          ))}
        </Suspense>
      </Canvas>

      {state.current && 
        <button 
          className="hud-gizmo"
          onClick={() => state.mode == 0 ? state.mode = 1 : state.mode = 0 }
        >
          {state.mode == 0 ? "Translate" : "Rotate"}
        </button>
      }

      <p className="hud-text">{hudText}</p>

    </div>
  )
}

export default Floorplanner
