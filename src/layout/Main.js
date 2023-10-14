import React, { Fragment } from "react";
import Header from "./Header";
import Banner from "../components/Movies/Banner";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <Fragment>
            <Header></Header>
            <Outlet></Outlet>;
        </Fragment>
    );
};

export default Main;
