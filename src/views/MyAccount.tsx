import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { NavLink } from 'react-router-dom'


export const MyAccount  : React.FC = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("The conext must be used within a Provider")
  }
  const { account,  signOutUser }  = context

  const handleSignOut = () => {
    signOutUser() 
}
  
  return (
      <div className='flex flex-col w-80'>
      <h1 className="font-medium text-xl text-center mb-6 w-80">My account</h1>
        <p>
          <span className='font-light text-sm'>Name: </span>
          <span>{account.name}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{account.email}</span>
        </p>
        <NavLink to='/sign-in'  
          className='border border-black rounded-lg mt-6 py-3'
          onClick={() => handleSignOut()}>
          Sign Out
          </NavLink>
      </div>
  )
}