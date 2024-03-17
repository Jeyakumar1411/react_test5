import React, { useState } from 'react'
import { newUser} from './react-redux/slices/userSlice'
import { useDispatch } from 'react-redux'

const User = () => {

    const [user, setUser] = useState('')

    const userDispatch = useDispatch()

    const AddNewUser = event => {
        userDispatch(newUser(user))
        setUser('')
    }

  return (

    <div className='w-50'>
        <label htmlFor="">user Name:</label>
        <input className='form-control ' type="text" value={user} onChange={event => setUser(event.target.value)} />
        <input className='btn btn-outline-dark m-2' type="submit" onClick={AddNewUser} />
    </div>
  )
}

export default User