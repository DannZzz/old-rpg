import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navigation from "../Navigation/Navigation"
import "./App.scss"
import "../../i18n/config"

const Home = React.lazy(() => import("../../pages/Home/Home"))

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path="/"
            index
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
