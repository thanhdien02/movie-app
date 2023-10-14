import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { fetcher, tmdbAPI } from "../apiConfig/config";
import useSWR from "swr";
import MovieList from "../components/Movies/MovieList";

const MovieDetail = () => {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
    console.log(
        "🚀 ~ file: MovieDetailsPage.js:10 ~ MovieDetailsPage ~ data:",
        data
    );
    if (!data) return null;
    const { backdrop_path, genres, overview } = data;

    return (
        <Fragment>
            <div>
                <div className="w-[1200px] h-[500px] mx-auto relative">
                    <div className="absolute inset-0 bg-gray-500 opacity-50 rounded-xl"></div>
                    <img
                        src={tmdbAPI.imageOriginal(backdrop_path)}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
                <div className="w-full h-[400px] max-w-[800px] mx-auto relative -mt-[200px]">
                    <img
                        src={tmdbAPI.imageOriginal(backdrop_path)}
                        alt=""
                        className="rounded-lg w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-[1000px] mx-auto mt-10 text-center">
                    <p>{overview}</p>
                </div>
                <div className="flex justify-center gap-10 mt-5 w-[1100px] mx-auto">
                    {genres.length > 0 &&
                        genres.map((item, index) => (
                            <div
                                key={index}
                                className="px-5 py-3 border-primary border rounded-lg"
                            >
                                {item.name}
                            </div>
                        ))}
                </div>
                <h3 className="mt-10 text-center text-3xl font-bold mb-10">
                    Casts
                </h3>

                <MovieMeta type="credits"></MovieMeta>
                <MovieVideo></MovieVideo>
                <div className="mt-10">
                    <h2 className="capitalize text-white mb-10 text-3xl font-bold">
                        Relative
                    </h2>
                    <MovieList type="popular"></MovieList>
                </div>
            </div>
        </Fragment>
    );
};

function MovieMeta({ type }) {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
    if (!data) return null;

    return (
        <div className="grid grid-cols-4 gap-10 w-[1200px] mx-auto">
            {data.cast.length > 0 &&
                data.cast.slice(0, 4).map((item) => (
                    <div className=" " key={item.id}>
                        <img
                            src={tmdbAPI.imageOriginal(item.profile_path)}
                            alt=""
                            className="w-full h-[400px] rounded-xl object-cover"
                        />
                        <h3 className="text-lg mt-2 ml-2">{item.name}</h3>
                    </div>
                ))}
        </div>
    );
}
function MovieVideo() {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
    console.log("🚀 ~ file: MovieDetail.js:90 ~ MovieVideo ~ data:", data);
    if (!data?.results) return null;

    //
    return (
        <div>
            {data.results.length > 0 &&
                data.results.slice(0, 3).map((item) => (
                    <div key={item.id} className="mt-10 w-[1000px] mx-auto">
                        <h3 className="mb-5 text-xl font-medium px-7 py-3 bg-secondary inline-block">
                            {item.name}
                        </h3>
                        <div className="w-full aspect-video">
                            <iframe
                                width="1208"
                                height="516"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title="EM CHỈ CẦN NÓI CÓ | DOÃN HIẾU (OFFICIAL MV)"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                                className="w-full h-full object-cover"
                            ></iframe>
                        </div>
                    </div>
                ))}
        </div>
    );
}
export default MovieDetail;
