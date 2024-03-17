import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrdersRender = ({order, DeleteHandler}) => {

    const navigate = useNavigate()

    return (
        <tr>
            <td>{order.customer.customer_name}</td>
            <td>{order.bill_date}</td>
            <td>{order.bill_amount}</td>
            <td>
                <button className='btn btn-primary' onClick={() => navigate(`/view/orders/${order.id}/`)}>View</button>
            </td>
            <td>
                <button className='btn btn-secondary' onClick={() => navigate(`/edit/orders/${order.id}/`)}>Edit</button>
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => DeleteHandler(order.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default OrdersRender