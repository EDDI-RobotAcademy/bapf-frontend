import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SnackAppWrapper from "./components/SnackAppWrapper";

const SnackChatReact = lazy(() => {
  console.log('Loading SnackChatReact...');
  return import("SnackChatReact/App").catch(err => {
    console.error('Failed to load SnackChatReact:', err);
    return { default: () => <div>Failed to load Chat App</div> };
  });
});


const App = () => (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/*" element={<SnackAppWrapper/>}/>
            </Routes>
        </Suspense>
    </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App/>);