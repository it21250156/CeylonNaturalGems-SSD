const Paymentdetails = ({payment}) => {
    return (
        <div className="payment-details">
            <p>Payment Amount : {payment.amount}</p>
            <p>Payment Method : {payment.pmethod}</p>
            <p>Delivery Method : {payment.dmethod}</p>
            <p>Address : {payment.address}</p>
            <p>District : {payment.district}</p>
            <p>Country : {payment.country}</p>
            <p>Phone No. : {payment.phoneNo}</p>
            <p>{payment.createdAt}</p>

<div>
    <table>
        <thead>
            <tr>
                <th>Payment Amount</th>
                <th>Payment Method</th>
                <th>Delivery Method</th>
                <th>Address</th>
                <th>District</th>
                <th>Country</th>
                <th>Phone No.</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <tr key={payment._id}>
                <td>{payment.amount}</td>
                <td>{payment.pmethod}</td>
                <td>{payment.dmethod}</td>
                <td>{payment.address}</td>
                <td>{payment.district}</td>
                <td>{payment.country}</td>
                <td>{payment.phoneNo}</td>
                <td>{payment.createdAt}</td>
            </tr>
        </tbody>
    </table>
</div>

        </div>
    )
}

export default Paymentdetails