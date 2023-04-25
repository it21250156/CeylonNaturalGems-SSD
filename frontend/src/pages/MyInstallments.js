import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../CSS/BodyTemp.css'
import Header from '../components/Header';

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
        <div className="allInstallments">
            <h2>My Installments </h2>
            {<div className="instalments">
                <table border='1' >
                    <tr> 
                        <th>Gem</th>
                        <th>Monthly Payment</th>
                        <th>Payment Date</th>
                        <th></th>
                    </tr>
                
                    {Installments && Installments.map((installment) => (
                        <InstallmentTableRow key={installment._id} installment={installment} />
                    ))}
                
                </table>
            </div> }
        </div>
        </>
    )
}


//table row
const InstallmentTableRow = ({ installment }) => {

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
            <td> {gems.find((gem) => gem._id === installment.gemID)?.name} </td>
            <td> {installment.gemID} </td>
            <td> {installment.monthlyPayment} </td>
            <td> {installment.createdAt} </td>
        </tr>
    )
}



export default MyInstallments