import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { CartContext } from "../context/cart"

export const Navbar = () => {
    const context = useContext(CartContext);

    if (!context) {
      return null;
    }
  
    const { signed, account, signOutUser } = context;
    const activeStyle = 'underline underline-offset-4'

    const handleSignOut = () => {
        signOutUser() 
    }
    const renderView = () => {
        if (signed == true) {
            return  (
                <>
             <li className="text-black/60">
                 <b> User: {account.email}</b>
                </li>
                <li className='menu'>
                    <NavLink to='/'  className={({isActive}) => isActive ?activeStyle : undefined }>
                        Home
                    </NavLink>
                </li>
                <li className='menu'>
                    <NavLink to='/my-account'  className={({isActive}) => isActive ?activeStyle : undefined }>
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-in'  
                        className={({isActive}) => isActive ?activeStyle : undefined }
                        onClick={() => handleSignOut()}
                    >
                        Sign Out
                    </NavLink>
                </li>
            </>
               
            )
        } else  {
            <li>
            <NavLink to='/sign-in'  
                className={({isActive}) => isActive ?activeStyle : undefined }
                onClick={() => handleSignOut()}
            >
                Sign In
            </NavLink>
        </li>
        }
    }

    return (
        <nav className='flex justify-between items-center bg-white fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
        <ul className='flex gap-4 items-center'>
           {renderView()}
        </ul>
    </nav>
    )
}