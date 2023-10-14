import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const Banner = lazy(() => import("./components/Movies/Banner"));
const Main = lazy(() => import("./layout/Main"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));

function App() {
    return (
        <Fragment>
            <Suspense fallback={<></>}>
                <Routes>
                    <Route element={<Main></Main>}>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Banner></Banner>
                                    <HomePage></HomePage>
                                </>
                            }
                        ></Route>
                        <Route
                            path="/movies"
                            element={<MoviePage></MoviePage>}
                        ></Route>
                        <Route
                            path="/movie/:movieId"
                            element={<MovieDetail></MovieDetail>}
                        ></Route>
                    </Route>
                </Routes>
            </Suspense>
        </Fragment>
    );
}

export default App;
