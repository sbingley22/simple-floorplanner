import { useState } from 'react'
import './App.css'
import Floorplanner from './components/Floorplanner'

const examples = [
  {
    label: "Example 1: Small Room",
    rooms: [

    ],
    items: [
      {
          "name": "door",
          "pos": [
              4,
              0,
              2
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "sofa",
          "pos": [
              0,
              0,
              -3.45
          ],
          "rot": [
              0,
              -1.5707963267948966,
              0
          ]
      },
      {
          "name": "sofa",
          "pos": [
              2,
              0,
              -3.45
          ],
          "rot": [
              0,
              -1.5707963267948966,
              0
          ]
      },
      {
          "name": "tv_stand",
          "pos": [
              1,
              0,
              0.45
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "footstool",
          "pos": [
              1.5,
              0,
              -2.45
          ],
          "rot": [
              0,
              -1.5707963267948966,
              0
          ]
      },
      {
          "name": "footstool",
          "pos": [
              0.5,
              0,
              -2.45
          ],
          "rot": [
              0,
              -1.0471975511965976,
              0
          ]
      },
      {
          "name": "plantpot2",
          "pos": [
              3.5333908244521446,
              0,
              -3.37660615856536
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "computer_desk",
          "pos": [
              -3.4000000000000004,
              0,
              3
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "office_chair",
          "pos": [
              -2.653803853854827,
              0,
              3.0884193847757113
          ],
          "rot": [
              -3.141592653589793,
              0.7853981633974482,
              -3.141592653589793
          ]
      },
      {
          "name": "wildflower",
          "pos": [
              3.4000000000000004,
              0,
              4.800000000000001
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "wildflower",
          "pos": [
              5.1000000000000005,
              0,
              -0.2
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "tree2",
          "pos": [
              6.9,
              0,
              -1.8
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "desk",
          "pos": [
              -3.5,
              0,
              -3.3000000000000003
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "cabinet_tall",
          "pos": [
              3.6,
              0,
              3.3620410676126347
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "cabinet",
          "pos": [
              -3.6,
              0,
              0.1
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "cabinet",
          "pos": [
              -3.5,
              0,
              -0.9
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "office_chair",
          "pos": [
              -2.7,
              0,
              -3.4000000000000004
          ],
          "rot": [
              3.141592653589793,
              -0.7853981633974485,
              3.141592653589793
          ]
      },
      {
          "name": "vending_machine",
          "pos": [
              -3.3000000000000003,
              0,
              1.4000000000000001
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "plantpot2",
          "pos": [
              -0.39218700912641924,
              0,
              3.5294350018482303
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "plantpot2",
          "pos": [
              1.0116193673268685,
              0,
              3.571350088338146
          ],
          "rot": [
              -3.141592653589793,
              0.7853981633974485,
              -3.141592653589793
          ]
      },
      {
          "name": "tree2",
          "pos": [
              -8.861304097472608,
              0,
              -9.579968856061944
          ],
          "rot": [
              0,
              0.7853981633974484,
              0
          ]
      },
      {
          "name": "tree2",
          "pos": [
              3.0099134137271664,
              0,
              -9.366601330254717
          ],
          "rot": [
              3.141592653589793,
              -1.2246467991473532e-16,
              3.141592653589793
          ]
      },
      {
          "name": "tree2",
          "pos": [
              8.200000000000001,
              0,
              -8.200000000000001
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "tree2",
          "pos": [
              -2.833119753581911,
              0,
              -8.160269007330465
          ],
          "rot": [
              3.141592653589793,
              -0.7853981633974485,
              3.141592653589793
          ]
      },
      {
          "name": "shrubs",
          "pos": [
              4.800000000000001,
              0,
              1
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "shrubs",
          "pos": [
              4.759333045064213,
              0,
              2.9697570916997513
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "wildflower",
          "pos": [
              4.807245599484362,
              0,
              4.2149063002509735
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "wildflower",
          "pos": [
              0.7383035692273705,
              0,
              -9.037826008829974
          ],
          "rot": [
              -3.141592653589793,
              0.7853981633974482,
              -3.141592653589793
          ]
      },
      {
          "name": "wildflower",
          "pos": [
              -7.433788211719065,
              0,
              -9.13465549945284
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "wildflower",
          "pos": [
              2.5801923383009218,
              0,
              -8.154392068360112
          ],
          "rot": [
              0,
              0,
              0
          ]
      },
      {
          "name": "wildflower",
          "pos": [
              3.8216874261744236,
              0,
              -8.999093914229023
          ],
          "rot": [
              0,
              -1.5707963267948966,
              0
          ]
      }
  ]
  },
  {
    label: "Blank Room",
    rooms: [

    ],
    items: [
      {
        name: "door",
        pos: [
          4,
          0,
          2
        ],
        rot: [
          0,
          0,
          0
        ]
      },
    ]
  }
]

function App() {
  const [mode, setMode] = useState(0)
  const [level, setLevel] = useState(examples[0])

  const loadLevel = (lvl) => {
    setLevel(examples[lvl])
    setMode(1)
  }

  if (mode == 0) return (
    <div className='main-menu'>
      <div 
      style={{
        backgroundColor: "#FFDDDD",
        color: "#000000",
        marginBottom: 0, 
        paddingBottom: 0,
        boxShadow: 2
      }}
      >
        <h3 style={{ marginBottom: 0, paddingBottom: 0 }}>
          Simple Floor Planner
        </h3>
      </div>
      <div style={{ padding: "0 40px"}}>
        <p>Plan out your dream house layout with this simple floor planning app.</p>
        <p>Once you have opened an example, use the floating pannel in the top right to place items. Use the gizmo button in the top left to change between rotation, translation, and scaling modes. Use the eye icon in the bottom right to switch between 2d and 3d views.</p>
        <p>Try out an example below:</p>
      </div>
      <div
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: "start", 
          height: "100%",
          padding: "0 20vw"
        }}
      >
        { examples.map( (ex, index) => (
          <button 
            key={ex.label} 
            onClick={()=>loadLevel(index)}
            style={{
              fontSize: "larger",
              padding: "20px",
              margin: "20px"
            }}
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <Floorplanner level={level} />
    </>
  )
}

export default App
