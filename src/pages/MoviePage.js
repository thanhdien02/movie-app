import React, { Fragment, useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "../apiConfig/config";
import useSWR from "swr";
import MovieCard, {
    CardSkeleton,
    MovieCardSkeleton,
} from "../components/Movies/MovieCard";
import { debounce } from "debounce";
import ReactPaginate from "react-paginate";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";

const MoviePage = () => {
    const [query, setQuery] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [nextPage, setNextPage] = useState(1);
    const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
    const { data, error } = useSWR(url, fetcher);

    const movies = data?.results || [];
    const loading = !data && !error;

    const handleFind = debounce((e) => {
        setQuery(e.target.value);
    }, 500);
    useEffect(() => {
        if (query) {
            setUrl(tmdbAPI.getMovieSearch(query, nextPage));
        } else {
            setUrl(tmdbAPI.getMovieList("popular", nextPage));
        }
    }, [nextPage, query]);

    const itemsPerPage = 20;

    useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };
    return (
        <Fragment>
            <div className="w-[800px] mx-auto mb-10 relative">
                <input
                    type="text"
                    placeholder="Enter your film"
                    className="px-5 py-3 w-full rounded bg-gray-200 text-black outline-none focus:bg-gray-100"
                    onChange={handleFind}
                />
                <div className="absolute right-0 top-0">
                    <button className="px-7 py-3 bg-red-400 rounded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {/* {loading && (
                <div className="mt-20 border-4 border-primary w-10 h-10 rounded-full border-t-transparent animate-spin mx-auto"></div>
            )} */}
            {loading && (
                <div className="grid grid-cols-4 gap-10 mx-10">
                    {new Array(20).fill(0).map((item, index) => (
                        <CardSkeleton key={index}></CardSkeleton>
                    ))}
                </div>
            )}
            <div className="grid grid-cols-4 gap-10 mx-10">
                {!loading &&
                    movies.length > 0 &&
                    movies.map((item) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>

            {/* <div className="flex justify-center gap-2 mt-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                    />
                </svg>

                {new Array(5).fill(0).map((item, index) => (
                    <span
                        onClick={() => setNextPage(index + 1)}
                        className="bg-gray-300 px-3 rounded-md text-black cursor-pointer"
                    >
                        {index + 1}
                    </span>
                ))}

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                </svg>
            </div> */}
            <div className="nagination mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className="flex justify-center gap-5"
                />
            </div>
        </Fragment>
    );
};

export default MoviePage;
