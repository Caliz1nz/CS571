import { BrowserRouter, Route, Routes } from "react-router-dom";
import BadgerBudsAdoptable from "./pages/BadgerBudsAdoptable.jsx"
import BadgerBudsBasket from "./pages/BadgerBudsBasket.jsx"
import BadgerBudsLanding from "./pages/BadgerBudsLanding.jsx"
import BadgerBudsNoMatch from "./pages/BadgerBudsNoMatch.jsx"


import BadgerBuds from "../BadgerBuds";


export default function BadgerBudsRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<BadgerBuds />} >
                <Route index element={<BadgerBudsLanding />} />
                {/* TODO: Add your routes here! */}
                <Route path="/available-cats" element={<BadgerBudsAdoptable />} />
                <Route path="/basket" element={<BadgerBudsBasket />} />
                <Route path="*" element={<BadgerBudsNoMatch />} />
            </Route>
        </Routes>
    </BrowserRouter>
}