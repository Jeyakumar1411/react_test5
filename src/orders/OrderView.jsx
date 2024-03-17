import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const OrdersView = () => {

    const navigate = useNavigate()
    const params = useParams()
    const {id} = params

    const [order, setOrder] = useState(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:1000/order/${id}/`)
        .then(response => {
            console.log(response.data)
            setOrder(response.data)
        })
        .catch(error => console.log(error))
    }, [])

    let ParentData = order !== null && <div>
        <p>Customer: {order.customer.customer_name}</p>
        <p>Bill Date: {order.bill_date}</p>
        <p>Bill Amount: {order.bill_amount}</p>
    </div>

    let ChildData = order !== null && order.bill_products.map((data, index) => <tr key={index}>
        <td>{data.product.product_name}</td>
        <td>{data.product.price}</td>
        <td>{data.quantity}</td>
        <td>{data.amount}</td>
        <td>{data.gst_amount}</td>
        <td>{data.sub_total}</td>
    </tr>)

    return (
        <div>
            <button className='btn btn-outline-primary m-2 ' onClick={() => navigate('/all/orders/')}>All Orders</button>
            {ParentData}

            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price/Item</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Gst Amount</th>
                        <th>Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ChildData}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersView