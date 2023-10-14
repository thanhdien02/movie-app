import React, { Fragment } from "react";
import Button from "../button/Button";
import { tmdbAPI } from "../../apiConfig/config";
import { useNavigate } from "react-router-dom";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
    const { poster_path, original_title, release_date, vote_average } = item;
    const navigate = useNavigate();
    return (
        <Fragment>
            <div className="flex flex-col p-3 bg-gray-500 rounded-lg h-full">
                <img
                    src={tmdbAPI.imageOriginal(poster_path)}
                    alt=""
                    className="w-full h-[300px] object-cover rounded-lg"
                />
                <div className="mt-5 flex flex-col gap-5 flex-1">
                    <h3 className="text-xl">{original_title}</h3>
                    <div className="flex justify-between">
                        <span>{new Date(release_date).getFullYear()}</span>
                        <span>{vote_average}</span>
                    </div>
                    <div className="mt-auto w-full">
                        <Button
                            title="Watch now"
                            bg="bg"
                            width="width"
                            onClick={() => navigate(`/movie/${item.id}`)}
                        ></Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export function CardSkeleton() {
    return (
        <div className="flex flex-col p-3 bg-gray-500 rounded-lg h-full">
            <LoadingSkeleton
                width="100%"
                height="300px"
                radius="8px"
                className="mb-5 z-10"
            ></LoadingSkeleton>
            <div className=" flex flex-col gap-5 flex-1">
                <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
                <div className="flex justify-between">
                    <LoadingSkeleton
                        width="50px"
                        height="10px"
                    ></LoadingSkeleton>
                    <LoadingSkeleton
                        width="50px"
                        height="10px"
                    ></LoadingSkeleton>
                </div>
                <div className="mt-auto w-full">
                    <LoadingSkeleton height="40px" className="rounded-xl"></LoadingSkeleton>
                </div>
            </div>
        </div>
    );
}

export const MovieCardSkeleton = () => {
    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
            <LoadingSkeleton
                width="100%"
                height="250px"
                radius="8px"
                className="mb-5"
            ></LoadingSkeleton>
            <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3">
                    <LoadingSkeleton
                        width="100%"
                        height="20px"
                    ></LoadingSkeleton>
                </h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                    <span>
                        <LoadingSkeleton
                            width="50px"
                            height="10px"
                        ></LoadingSkeleton>
                    </span>
                    <span>
                        <LoadingSkeleton
                            width="30px"
                            height="10px"
                        ></LoadingSkeleton>
                    </span>
                </div>
                <LoadingSkeleton
                    width="100%"
                    height="45px"
                    radius="6px"
                ></LoadingSkeleton>
            </div>
        </div>
    );
};
export default MovieCard;
