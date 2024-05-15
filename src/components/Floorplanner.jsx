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
import { Environment } from "@react-three/drei"

// Reactive state model, using Valtio ...
const modes = ['translate', 'rotate', 'scale']
const state = proxy({ current: null, mode: 1, label: null })

const Floorplanner = () => {
  const canvasRef = useRef()
  const snap = useSnapshot(state)
  const [hudText, setHudText] = useState("")

  const [placementMode, setPlacementMode] = useState(null)
  const [items, setItems] = useState([{ id: uuidv4(), pos: [4,0,0], name: "door" }])
  const [rooms, setRooms] = useState([{ id: uuidv4(), pos: [0,0,0] }])

  //Items
  const placeObject = (e) => {
    if (!placementMode) return
    
    if (placementMode == "room") placeRoom(e)
    else placeItem(e)
  }

  const deleteObject = () => {
    if (state.label == "room") deleteRoom()
    else deleteItem()
  }

  const addItemPlacement = (itemName) => {
    state.current = null
    setPlacementMode(itemName)
  }

  const placeItem = (e) => {
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
    state.label = null
  }

  //Rooms
  const addRoomPlacement = () => {
    state.current = null
    setPlacementMode("room")
  }

  const placeRoom = (e) => {
    const pos = e.point
    const tempRooms = [...rooms]
    const id = uuidv4()
    tempRooms.push({
      id: id,
      pos: [
        pos.x,
        pos.y < 0 ? 0 : pos.y,
        pos.z
      ]
    })
    setRooms(tempRooms)
    setPlacementMode(null)

    state.current = id
  }

  const deleteRoom = () => {
    const id = snap.current
    setRooms( prevItems => {
      const filteredItems = prevItems.filter((item) => item.id !== id)
      return filteredItems
    })
    state.current = null
    state.label = null
  }

  // Leva Controls
  const { trimWalls, floorColor, wallColor } = useControls('Rooms',
    {
      "Add Room": button(() => {
        addRoomPlacement()
      }),
      "Add Door": button(() => {
        addItemPlacement("door")
      }),
      trimWalls: {
        label: "Trim Walls",
        value: true
      },
      floorColor: {
        label: "Floor Color",
        value: '#BBAAAA'
      },
      wallColor: {
        label: "Walls Color",
        value: '#DDDDAA'
      }
    },
    { collapsed: false},
    [addRoomPlacement]
  )
  useControls('Items',
    {
      "Bed": button(() => {
        addItemPlacement("bed")
      }),
      "Cabinet": button(() => {
        addItemPlacement("cabinet")
      }),
      "Cabinet Tall": button(() => {
        addItemPlacement("cabinet_tall")
      }),
      "Computer Desk": button(() => {
        addItemPlacement("computer_desk")
      }),
      "Cooker": button(() => {
        addItemPlacement("cooker")
      }),
      "Desk": button(() => {
        addItemPlacement("desk")
      }),
      "File Cabinet": button(() => {
        addItemPlacement("file_cabinet")
      }),
      "Footstool": button(() => {
        addItemPlacement("footstool")
      }),
      "Office Chair": button(() => {
        addItemPlacement("office_chair")
      }),
      "Plant Pot": button(() => {
        addItemPlacement("plantpot1")
      }),
      "Plant Pot 2": button(() => {
        addItemPlacement("plantpot2")
      }),
      "Refridgerator": button(() => {
        addItemPlacement("refridgerator")
      }),
      "Shrubs": button(() => {
        addItemPlacement("shrubs")
      }),
      "Sink": button(() => {
        addItemPlacement("sink")
      }),
      "Sofa": button(() => {
        addItemPlacement("sofa")
      }),
      "Toilet": button(() => {
        addItemPlacement("toilet")
      }),
      "Tree": button(() => {
        addItemPlacement("tree1")
      }),
      "Tree 2": button(() => {
        addItemPlacement("tree2")
      }),
      "TV Stand": button(() => {
        addItemPlacement("tv_stand")
      }),
      "Vending Machine": button(() => {
        addItemPlacement("vending_machine")
      }),
      "Washing Machine": button(() => {
        addItemPlacement("washing_machine")
      }),
      "Wildflower": button(() => {
        addItemPlacement("wildflower")
      }),
    },
    { collapsed: true}, 
    [addItemPlacement]
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
      if (!snap.label) return
      const itemName = snap.label.split("_").join(" ")
      setHudText(`${itemName}: Use button or spacebar to toggle gizmo.`)
      return
    }
    if (placementMode) {
      const itemName = placementMode.split("_").join(" ")
      setHudText("Click to place " + itemName)
      return
    }

    setHudText("")
  }, [snap, placementMode])

  const gizmoModes = state.label == "room" ? 3 : 2

  // Keyboard Events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        state.mode = state.mode + 1 < gizmoModes ? state.mode += 1 : state.mode = 0;
      }
    }
  
    window.addEventListener('keydown', handleKeyDown)
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snap])
  
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas 
        ref={canvasRef}
        shadows
      >
        <Suspense>

          <Controls state={state} modes={modes} />

          <Environment 
            preset="forest" 
            background={true} 
            backgroundBlurriness={0.0}
            backgroundIntensity={1} 
            ground={true}
          />
          <directionalLight 
            intensity={2} 
            position={[1,8,1]} 
            color={"#FFAAAA"} 
            castShadow 
          />
          
          <Ground placeObject={placeObject} placementMode={placementMode} />
          
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
              trimWalls={trimWalls}
              color={wallColor}
              floorColor={floorColor}
              placementMode={placementMode}
            />
          ))}

        </Suspense>
      </Canvas>

      {snap.current && 
        <button 
          className="hud-gizmo"
          onClick={() => state.mode + 1 < gizmoModes ? state.mode += 1 : state.mode = 0 }
        >
          {snap.mode === 0 ? "Translate" : snap.mode == 1 ? "Rotate" : "Scale"}
        </button>
      }

      <p className="hud-text">{hudText}</p>

      <div className="hud-buttons">
        {snap.current && 
          <button 
            onClick={deleteObject}
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
