import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useInstallmentsContext } from "../hooks/useInstallmentsContext";
import Header from '../components/Header';
import '../CSS/InstPlans.css';
import '../CSS/GemCard.css';
import '../CSS/BodyTemp.css';

import FirstPayment from '../components/firstPayment';
import MonthlyPayment from '../components/monthlyPayment';

const SelectedInstallmentPlan = () => {

    const { dispatch } = useInstallmentsContext();
    const navigate = useNavigate();

  const [plans, setPlans] = useState({
    name: '',
    months: '',
    initialPayment: '',
  }); //put 0 for a number

  const gem = JSON.parse(localStorage.getItem('gemInfo'));

  const { id } = useParams();

  const [user, setUser] = useState("");
    const [gemID, setGemID] = useState("");
    const [planID, setPlanID] = useState("");
    const [noOfMonths, setNoOfMonths] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [initialPayment, setInitialPayment] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState("");
    const [installmentDates, setInstallmentDates] = useState([]);
    const [status, setStatus] = useState("");
    const [error, setError] = useState(null);
  
    const userData = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch(`/api/plans/${id}`);
      const json = await response.json();

      if (response.ok) {
        setPlans(json);
        setUser(userData._id);
        setGemID(gem._id);
        setPlanID(json._id);
        setNoOfMonths(json.months);
        setTotalAmount(gem.price);
        setInitialPayment(200)
        setMonthlyPayment(149)
      }
    };

    fetchPlans();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const currentDate = new Date().toISOString().split("T")[0];
    const updatedInstallmentDates = [...installmentDates, currentDate];
    setStatus("Pending");
  
    const installment = {
      user,
      gemID,
      planID,
      noOfMonths,
      totalAmount,
      initialPayment,
      monthlyPayment,
      installmentDates: updatedInstallmentDates,
      status: "Pending"
    };
  
    const response = await fetch('/api/installments', {
      method: "POST",
      body: JSON.stringify(installment),
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    const json = await response.json();
  
    if (!response.ok) {
      setError(json.error);
      console.log(error);
    }
  
    if (response.ok) {
      setUser("");
      setGemID("");
      setPlanID("");
      setNoOfMonths("");
      setTotalAmount("");
      setInitialPayment("");
      setMonthlyPayment("");
      setInstallmentDates([]);
      setStatus("");
  
      setError(null);
      dispatch({ type: "CREATE_INSTALLMENTS", payload: json });
  
      console.log("new Installment added", json);
    }
    
    navigate("/payments");
  };

  return (
    <>
      <Header />
      <div className="gemhome">
        <div className="gems">
          <div className="lightBlueBodyBG">
            <div className="whiteBodyBG">
              <div className="darkBlueTopicBox">
                <h3 className="pageTopic">{plans.name} Plan</h3>
              </div>

              <div className="inst-plan-content">
                <div className="col-1-plans">
                  <div>
                    <h3 className="col-title-inst"> Gem Details </h3>
                    <hr className="inst-hr"></hr>
                    <div className="plan-white-box">
                      <h4 className="gem-detail-txt">
                        <b>Name:</b> {gem.name}
                      </h4>
                      <h4 className="gem-detail-txt">
                        <b>Price:</b> {gem.price}
                      </h4>
                    </div>
                    <div className="img-section-inst"></div>
                  </div>
                </div>
                <div className="col-2-slected-plan-details">
                  <h3 className="col-title-inst"> Plan Details </h3>
                  <hr className="inst-hr"></hr>
                  <div className="plan-white-box">
                    <h4 className="gem-detail-txt">
                      <u>{plans.name} Plan</u>{' '}
                    </h4>
                    <p className="gem-detail-txt">
                      <strong>Initial Payment : </strong> {plans.initialPayment}
                      %
                    </p>
                    <div>
                      <FirstPayment plans={plans} gem={gem}></FirstPayment>
                    </div>
                    <p className="gem-detail-txt">
                      <strong>No of Months : </strong> {plans.months}
                    </p>
                    <div>
                      <MonthlyPayment plans={plans} gem={gem}></MonthlyPayment>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="proceed-btn-inst"
                onClick={handleSubmit}
                
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedInstallmentPlan;
