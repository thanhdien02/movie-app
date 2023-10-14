import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <Fragment>
            <div className="p-10 flex justify-center gap-10 text-white">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                    }
                >
                    Movies
                </NavLink>
            </div>
        </Fragment>
    );
};

export default Header;
