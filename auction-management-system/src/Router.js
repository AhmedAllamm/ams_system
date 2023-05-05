import {
    createBrowserRouter,

  } from "react-router-dom";
  import ProductList from "./pages/ProductList";
  import App from "./App";
  import React from "react";
import { ChosenProduct } from "./pages/ChosenProduct";

  export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [
            
                  {
                    path: "/auctions",
                    element: <ProductList/>
                  },
                  {
                    path: "/auctions/:id",
                    element: <ChosenProduct/>
                  },
                  {
                      path: "/about",
                      element: <div>about</div>
                    },
                    {
                      path: "/contact",
                      element: <div>contact</div>
                    },
                    {
                      path: "/update",
                      element: <div>update</div>
                    },
                ]


    },
    {
        path:'*',
        element:<div>
            <h2>Page Not Found</h2>
        </div>
    }
    
]);