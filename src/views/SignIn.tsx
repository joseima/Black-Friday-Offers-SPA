import { Link, Navigate } from 'react-router-dom'
import { useContext,useRef, FormEvent } from 'react'
import { CartContext } from '../context/cart'
 import { type User } from "../types";



export const  SignIn : React.FC  =  () => {

  const context = useContext(CartContext);  
  if (!context) {
    throw new Error("The conext must be used within a Provider");
  }
  const { account, signed, signInUser }  = context
  const form = useRef<HTMLFormElement>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    if (form.current) {
      const formData = new FormData(form.current);
      const dataForm: User = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      signInUser(dataForm);
      return <Navigate replace to={'/'} />;
    }
  };

const renderLogIn = () => {
  return (
    <div className='flex flex-col w-80'>
             <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome Admin !</h1>
             <p>This is your demo info</p>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{account?.email}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Password: </span>
          <span>{account?.password}</span>
        </p>
        <Link
          to="/">
          <button
              className='mt-5 bg-gray-dark text-yellow w-full rounded-lg py-3'
            onClick={() => {}}
            disabled= {!signed}>
             Lets see the offers
          </button>
        </Link>
      </div>
  ) 
}
const renderUserInfo = () => {
  if (signed) {
    console.log('signed')
    return <Navigate replace to="/" />;
  };
  return (
    <form ref={form} className='flex flex-col gap-4 w-80' onSubmit={handleLogin}>
           <h1>Black Friday Offers</h1>
      <p>We got you. Just hit Login  and go see the offers</p>
    <div className='flex flex-col gap-1'>
      <label htmlFor="name" className='font-light text-sm'>Your name:</label>
      <input
        type="text"
        id="name"
        name="name"
        defaultValue="Admin"
        placeholder="User"
        className='rounded-lg border border-black placeholder:font-light
        placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
      />
    </div>
    <div className='flex flex-col gap-1'>
      <label htmlFor="email" className='font-light text-sm'>Your email:</label>
      <input
        type="text"
        id="email"
        name="email"
        defaultValue="mail@web.com"
        placeholder="hi@helloworld.com"
        className='rounded-lg border border-black
        placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
      />
    </div>
    <div className='flex flex-col gap-1'>
      <label htmlFor="password" className='font-light text-sm'>Your password:</label>
      <input
        type="password"
        id="password"
        name="password"
        defaultValue="123"
        placeholder="***"
        className='rounded-lg border border-black
        placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
      />
    </div>
        <button
          className='bg-gray-dark text-yellow w-full rounded-lg py-3' type='submit'>
          Login
        </button>
  </form>
  )
}
const renderView = () => signed === false ? renderUserInfo() : renderLogIn()

  return (
    <div className='flex flex-col mt-20 items-center'>
      {renderView()}
    </div>
  )
}
