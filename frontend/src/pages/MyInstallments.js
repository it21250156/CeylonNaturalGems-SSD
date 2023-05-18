import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../CSS/BodyTemp.css'
import Header from '../components/Header';

import format from 'date-fns/format'
import '../CSS/table.css';

//components

const MyInstallments = () => {
    const [Installments , setInstallments] = useState(null)
    const [Gem , setGem] = useState(null)
    //const {userID} =  useParams()
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchInstallments = async () => {
            const response = await fetch(`/api/installments/userInstallments/${user._id}`)
            const json = await response.json()

            if(response.ok){
                setInstallments(json)
            }
        }

        fetchInstallments()
    },[])
    

    return (
        <>
        <Header/>
        <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
                <h3 className="pageTopic">My Installments</h3>
            </div>
            <div style = {{padding: '30px' } } >
                <table className="table table-striped table-hover" >
                    <thead> 
                        <tr> 
                            <th> # </th>
                            <th>ID</th>
                            <th>Gem</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Installments && Installments.map((installment , index ) => (
                            <InstallmentTableRow key={installment._id} installment={installment} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div> 
        </div>
        </>
    )
}


//table row
const InstallmentTableRow = ({ installment , index }) => {

    const [gems, setGems] = useState([]);

    useEffect(() => {
        const fetchGems = async () => {
          try {
            const response = await fetch('/api/gems&jewelleries/gems');
            const json = await response.json();
            setGems(json);
          } catch (err) {
            console.log(err);
          }
        };
        fetchGems();
    }, []);

    return(
        <tr>
            <td> {index + 1} </td>
            <td> {installment._id} </td>
            <td> {gems.find((gem) => gem._id === installment.gemID)?.name} </td>
            <td> {installment.status} </td>
            <td> <button > details </button> </td>
        </tr>
    )
}



export default MyInstallments