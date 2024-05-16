import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

const SaveData = ({ saveData, activateSave }) => {
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    saveData(scene)

  }, [activateSave])

  return (
    <>
      
    </>
  )
}

export default SaveData
