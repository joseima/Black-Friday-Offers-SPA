import { CartProvider, CartContext } from './context/cart'
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { Home } from './views/Home'
import { Navbar } from './components/NavBar'
import { MyAccount } from './views/MyAccount'
import { NotFound } from './views/NotFound'
import { SignIn } from './views/SignIn'

const AppRouter = () => {
  const context = useContext(CartContext)

  if (!context) {
    return null;
  }

  const { signed } = context

  const routes = useRoutes([
    { path: '/', element: signed ? <Home /> : <Navigate replace to={'/sign-in'} />},
    { path: '/my-account', element: <MyAccount />},
    { path: '/sign-in', element: <SignIn />},
    { path: '/*', element: <NotFound />}
  ])
  return routes
}


export const App = () : JSX.Element  => {

  return (
    <CartProvider>
        <main>
          <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
      </main>
    </CartProvider>
  )
}
