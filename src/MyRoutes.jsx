import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react';

const  Home = lazy(()=> import('./pages/Home'));
const  Search = lazy(()=> import('./pages/Search'));
const  Tv = lazy(()=> import('./pages/Tv'));
const  Movie = lazy(()=> import('./pages/Movie'));
const  Detail = lazy(()=> import('./pages/Detail'));
const  CatSc = lazy(()=> import('./pages/CatSc'));

const MyRoutes = () => {
    return (
        
            <Suspense fallback={<div className='text-center'>Loading..</div>}>
            <Routes>
            <Route path='/' element={<Home />}>

            </Route>
            <Route path="/tv" element={<Tv />}>    
            </Route>
            <Route path="/movie" element={<Movie />}>
            </Route>
            <Route path='/search/:query' element={<Search />}>
            </Route>
            <Route path='/:type/:cat/:catname' element={<CatSc/>}/>
            <Route path=":cat/:typ/details/:id/:name" element={<Detail/>}/>
            </Routes>
            </Suspense>
        
    )
}

export default MyRoutes