import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const OrdersPost = () => {

    const navigate = useNavigate()

    const [customers, setCustomers] = useState([])

    const [selected_customer, setSelectedCustomer] = useState('')
    const [bill_date, setBillDate] = useState('')

    const [products, setProducts] = useState([])

    const [products_list, setProductList] = useState([])

    useEffect(() => {
        
        axios.get('http://127.0.0.1:1000/customer')
        .then(response => setCustomers(response.data))
        .catch(error => console.log(error))
        
        axios.get('http://127.0.0.1:1000/product')
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))
        
    }, [])


    const AddNewValue = () => {

        const new_product_list = [...products_list, {
            product_id: '',
            quantity: '',
            price: '',
            gst: ''
        }]

        setProductList(new_product_list)
    }

    const UpdateProductData = (event, index, key_name) => {

        const new_product_list = [...products_list]
        const selected_product = new_product_list[index]

        selected_product[key_name] = event.target.value

        for (let x of products) {

            if (x.id === Number(event.target.value)) {

                selected_product['price'] = x.price
                selected_product['gst'] = x.gst
            }
        }

        setProductList(new_product_list)
    }

    const SubmitHandler = event => {
        event.preventDefault()

        const orders_data = [
            {
                customer_id: selected_customer,
                bill_date: bill_date
            },
            products_list
        ]

        axios.post('http://127.0.0.1:1000/order/', orders_data)
        .then(response => navigate('/all/orders/'))
        .catch(error => console.log(error))
    }

    let all_customers = customers.map((customer, index) => <option key={index} value={customer.id}>{customer.customer_name}</option>)

    let all_products = products.map((product, index) => <option key={index} value={product.id}>{product.product_name}</option>)

    let new_product = products_list.map((data, index) => {
        return (
            <div key={index}>

                <label htmlFor="">Product: </label>

                <select value={data.product_id} onChange={event => UpdateProductData(event, index, "product_id")}>
                    <option value="no_product">Select Product</option>
                    {all_products}
                </select>

                <label htmlFor="">Price</label>
                <input type="text" value={data.price} readOnly/>

                <label htmlFor="">Quantity: </label>
                <input type="number" value={data.quantity} onChange={event => UpdateProductData(event, index, "quantity")}/>
                
                <label htmlFor="">Gst: </label>
                <input type="number" value={data.gst} readOnly/>
                
            </div>
        )
    })

    return (
        <div>

            <button className='btn btn-info' onClick={() => navigate('/all/orders/')}>Back</button>

            <form className='orders-form'>

                <div>

                    <label htmlFor="">Customer:</label>
                    <select className='' value={selected_customer} onChange={event => setSelectedCustomer(event.target.value)}>
                        <option value="no_customer">Select Customer</option>
                        {all_customers}
                    </select>

                    <label htmlFor="">Bill Date</label>
                    <input type="date" value={bill_date} onChange={event => setBillDate(event.target.value)}/>

                </div>

                <div>
                <input className='btn btn-outline-success m-2' type="button" value='Add Product' onClick={AddNewValue}/>

                {new_product}

                </div>

                <input className='btn btn-outline-primary m-2' type="submit" onClick={SubmitHandler}/>

            </form>

        </div>
    )
}

export default OrdersPost