import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OrdersRender from './OrdersRender'
import { useNavigate } from 'react-router-dom'

const OrdersGet = () => {

    const navigate = useNavigate()

    const [orders_data, setOrdersData] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:1000/order')
        .then(response => setOrdersData(response.data))
        .catch(error => console.log(error))
    }, [])

    const DeleteHandler = (id) => {
        axios.delete(`http://127.0.0.1:1000/order/${id}/`)
        .then(response => setOrdersData(response.data))
        .catch(error => console.log(error))
    }

    let table_data = orders_data.map(order => <OrdersRender order={order} DeleteHandler={DeleteHandler}></OrdersRender>)

    return (
        <div>
            <button className='btn btn-success' onClick={() => navigate('/add/orders/')}>Add Orders</button>
            <br />
            <table className='table m-2 p-2'>
                <thead>
                    <tr>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Bill Date</th>
                        <th scope="col">Bill Amount</th>
                        <th scope="col">View</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody scope="row">
                    {table_data}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersGet