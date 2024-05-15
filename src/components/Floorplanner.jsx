/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import Controls from "./Controls"
import { proxy, useSnapshot } from 'valtio'
import { v4 as uuidv4 } from 'uuid'
import Item from "./Item"
import { button, useControls } from "leva"
import Ground from "./Ground"
import Room from "./Room"

// Reactive state model, using Valtio ...
const modes = ['translate', 'rotate', 'scale']
const state = proxy({ current: null, mode: 1 })

const Floorplanner = () => {
  const canvasRef = useRef()
  const snap = useSnapshot(state)
  const [hudText, setHudText] = useState("")

  const [placementMode, setPlacementMode] = useState(null)
  const [items, setItems] = useState([{ id: uuidv4(), pos: [0,0,0], name: "file_cabinet" }])
  const [rooms, setRooms] = useState([{ id: uuidv4(), pos: [0,0,0] }])

  const addItemPlacement = (itemName) => {
    state.current = null
    setPlacementMode(itemName)
  }

  const placeItem = (e) => {
    if (!placementMode) return

    const pos = e.point
    const tempItems = [...items]
    const id = uuidv4()
    tempItems.push({
      id: id,
      name: placementMode,
      pos: [
        pos.x,
        pos.y < 0 ? 0 : pos.y,
        pos.z
      ]
    })
    setItems(tempItems)
    setPlacementMode(null)

    state.current = id
  }

  const deleteItem = () => {
    const id = snap.current
    setItems( prevItems => {
      const filteredItems = prevItems.filter((item) => item.id !== id)
      return filteredItems
    })
    state.current = null
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
      setHudText("Transform Item. Use button or spacebar to toggle gizmo.")
      return
    }
    if (placementMode) {
      const itemName = placementMode.split("_").join(" ")
      setHudText("Click to place " + itemName)
      return
    }

    setHudText("")
  }, [snap, placementMode])

  // Keyboard Events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        state.mode = state.mode === 0 ? 1 : 0;
      }
    }
  
    window.addEventListener('keydown', handleKeyDown)
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas 
        ref={canvasRef}
        shadows
      >
        <Suspense>
          <Controls state={state} modes={modes} />
          <ambientLight intensity={0.3} />
          <directionalLight intensity={0.9} position={[1,8,1]} castShadow />
          
          <Ground placeItem={placeItem} placementMode={placementMode} />
          
          {items.map(item=>(
            <Item 
              key={item.id}
              id={item.id}
              name={item.name} 
              pos={item.pos}
              state={state}
            />
          ))}

          {rooms.map(room=>(
            <Room 
              key={room.id}
              id={room.id}
              pos={room.pos}
              state={state}
            />
          ))}

        </Suspense>
      </Canvas>

      {snap.current && 
        <button 
          className="hud-gizmo"
          onClick={() => state.mode == 0 ? state.mode = 1 : state.mode = 0 }
        >
          {snap.mode == 0 ? "Translate" : "Rotate"}
        </button>
      }

      <p className="hud-text">{hudText}</p>

      <div className="hud-buttons">
        {snap.current && 
          <button 
            onClick={deleteItem}
            style={{ backgroundColor: "rgba(222,222,222,.1)", padding: "5px" }}
          >
            <img src="./trash.svg" alt="Delete" style={{width:"32px", height:"32px"}} />
          </button>
        }
      </div>

    </div>
  )
}

export default Floorplanner
