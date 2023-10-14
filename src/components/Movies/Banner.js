import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../apiConfig/config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
const Banner = () => {
    const { data, error, isLoading } = useSWR(
        tmdbAPI.getMovieList("upcoming", 1),
        fetcher
    );
    const movies = data?.results || [];
    const navigate = useNavigate();
    return (
        <Fragment>
            <Swiper grabCursor={"true"} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <BannerItem
                                item={item}
                                onClick={() => navigate(`/movie/${item.id}`)}
                            ></BannerItem>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </Fragment>
    );
};
function BannerItem({ item, onClick }) {
    return (
        <div className=" text-white max-w-[1200px] mx-auto h-[400px] relative">
            <div className="w-full h-[400px]">
                <img
                    src={tmdbAPI.imageOriginal(item.poster_path)}
                    alt=""
                    className="h-full w-full object-cover rounded-lg"
                />
            </div>
            <div className=" flex flex-col gap-5 ml-10 absolute bottom-5 boder-4 border-solid border-primary">
                <h1 className="text-2xl font-bold text-white">
                    This is title film
                </h1>
                <div className="flex justify-start gap-5 m">
                    <Link className="px-5 py-1 border-2 border-white rounded-lg">
                        Action
                    </Link>
                    <Link className="px-5 py-1 border-2 border-white rounded-lg">
                        Advante
                    </Link>
                    <Link className="px-5 py-1 border-2 border-white rounded-lg">
                        Drama
                    </Link>
                </div>
                <div className="inline-block">
                    <Button
                        title="Watch now"
                        bg="bg-blue-500"
                        onClick={onClick}
                    ></Button>
                </div>
            </div>
        </div>
    );
}
export default Banner;
