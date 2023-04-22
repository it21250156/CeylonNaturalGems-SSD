import { useEffect, useState } from "react"
import { useJewelleryesContext } from '../hooks/useJewelleryesContext'
import { useNavigate } from "react-router-dom"


// components
import JewelleryDetails from "../components/JewelleryDetails"
import JewelleryAddForm from "../components/JewelleryAddForm"

const JewelleryAdminDashboard = () => {
  const navigate = useNavigate()

  //const {jewellery, dispatch} = useJewelleryesContext()
  const [jewellery , setjewellery] = useState(null)

  useEffect(() => {
    const fetchJewelleryes = async () => {
      const response = await fetch('/api/jewelleryes')
      const json = await response.json()

      if (response.ok) {
        //dispatch({type: 'SET_JEWELLERY', payload: json})
        setjewellery(json)
      }
    }

    fetchJewelleryes()
  }, [])

  return (
    <div className="home">
      <div className="jewelleryes">
        {jewellery && jewellery.map(jewellery => (
          <JewelleryDetails jewellery={jewellery} key={jewellery._id} />
        ))}
      </div>
      {/* <JewelleryAddForm/> */}
      <button onClick={() => {navigate("/AddJewelleryes")}}>Add a new jewellery</button>
    </div>
  )
}

export default JewelleryAdminDashboard