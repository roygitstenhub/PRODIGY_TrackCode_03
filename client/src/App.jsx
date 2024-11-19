import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Header from './components/Header'
import Register from "./components/Register"
import Login from "./components/Login"
import Error from './components/Error'
import Home from './components/Home'
import CreateProduct from './components/CreateProduct'
import ProductDetails from './components/screens/ProductDetails'
import ProductList from './components/screens/ProductList'
import Cart from "./components/screens/Cart"
import BuyNow from './components/screens/BuyNow'
import Footer from './components/screens/Footer'
import ScrollToTop from './components/screens/ScrollToTop'

const Layout = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
      <ScrollToTop/>
    </>
  )
}

const router = createBrowserRouter([
  {

    path: '/',
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path:'/all/products',
        element:<ProductList/>

      },
      {
        path: '/create/product',
        element: <CreateProduct />
      },
      {
        path:'/product/:id',
        element:<ProductDetails/>

      },
      {
          path:`/cart/:userId`,
          element:<Cart/>
      },
      {
        path:`/buy`,
        element:<BuyNow/>
      },
      {
        path: '/logout',
        element: <Login />
      },
    ]

  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
    </>

  )
}

export default App