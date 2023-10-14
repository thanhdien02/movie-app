import React, { Fragment } from "react";
import "swiper/scss";
import MovieList from "../components/Movies/MovieList";
const HomePage = () => {
    return (
        <Fragment>

            <div className="w-[1400px] mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-5">Playing now</h2>

                <MovieList type="now_playing"></MovieList>
            </div>
            <div className="w-[1400px] mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-5">Trending</h2>

                <MovieList type="top_rated"></MovieList>
            </div>
            <div className="w-[1400px] mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-5">Top rate</h2>

                <MovieList type="popular"></MovieList>
            </div>
        </Fragment>
    );
};

export default HomePage;
