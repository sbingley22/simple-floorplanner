/* eslint-disable react/prop-types */
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

const SaveData = ({ saveData, activateSave }) => {
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    saveData(scene)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activateSave])

  return (
    <>
      
    </>
  )
}

export default SaveData
