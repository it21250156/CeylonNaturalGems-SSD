import { useEffect } from "react"
import { useGemsContext } from '../hooks/useGemsContext'
import '../CSS/GemAdmin.css';

// components
import GemDetails from "../components/GemDetails"


const GemAdminHome = () => {

  const {gems, dispatch} = useGemsContext()

  useEffect(() => {
    const fetchGems = async () => {
      const response = await fetch('/api/gems')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_GEMS', payload: json})
      }
    }

    fetchGems()
  }, [dispatch])

  return (
    <div className="home">
      <button className="addGemButton" onClick = {() => {window.location.href = "./AddGem"}}> Add a New Gem </button>
      <div className="gems">
        {gems && gems.map(gem => (
          <GemDetails gem={gem} key={gem._id} />
        ))}
      </div>
      {/*<GemAddForm/>*/}
      
    </div>
  )
}

export default GemAdminHome