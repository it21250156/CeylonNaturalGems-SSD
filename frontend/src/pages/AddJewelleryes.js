// components
import { useEffect } from "react"
import JewelleryAddForm from "../components/JewelleryAddForm"
import { useJewelleryesContext } from "../hooks/useJewelleryesContext"



const AddJewellery = () => {

  const {Jewelleryes, dispatch} = useJewelleryesContext()

  useEffect(() => {
    const fetchJewelleryes = async () => {
    const response = await fetch('/api/jewelleryes')
    const json = await response.json()

    if(response.ok) {

      dispatch({type: 'SET_JEWELLERYES', payload: json})
    }
}
  fetchJewelleryes()


},[dispatch])

  return (
    <div className="addJewellery">
      
      <JewelleryAddForm/>
    </div>
  )
}

export default AddJewellery