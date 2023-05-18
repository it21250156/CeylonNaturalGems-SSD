import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../CSS/InstPlans.css';
import '../CSS/GemCard.css';
import '../CSS/BodyTemp.css';

import FirstPayment from '../components/firstPayment';
import MonthlyPayment from '../components/monthlyPayment';

const SelectedInstallmentPlan = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState({
    name: '',
    months: '',
    initialPayment: '',
  }); //put 0 for a number

  const gem = JSON.parse(localStorage.getItem('gemInfo'));

  const { id } = useParams();

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch(`/api/plans/${id}`);
      const json = await response.json();

      if (response.ok) {
        setPlans(json);
      }
    };

    fetchPlans();
  }, []);

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
                onClick={() => {
                  navigate(`/payments`);
                }}
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
