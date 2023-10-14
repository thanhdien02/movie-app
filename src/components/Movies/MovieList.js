import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../apiConfig/config";
const MovieList = (props) => {
    const { data, error } = useSWR(
        tmdbAPI.getMovieList(props.type, 1),
        fetcher
    );
    const movies = data?.results || [];
    return (
        <div className="movie-list">
            <Swiper
                grabCursor={"true"}
                spaceBetween={40}
                slidesPerView={"auto"}
            >
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
