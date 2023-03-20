// import logo from '../svg/logo-no-background.svg';

import { useEffect, useState } from "react";



const MainPage = () => {
    const [search, setSearch] = useState('');
    const [shouldRun, setShouldRun] = useState(false)


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4dace60f82msh08a03dbd32f400fp14522djsna13e09b3e598',
            'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
        }
    };

    // const url = `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${search}`
    // useEffect(() => {
    //     if (shouldRun) {
    //         fetch(url, options)
    //             .then(response =>
    //                 response.json()
    //             ).then(json => {
    //                 console.log(json)
    //             }).catch(e => {
    //                 console.log("e", e)
    //             })
    //     }
    // }, [])

    const getData = async () => {
        const res = await fetch(`https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${search}`, options);
        const data = await res.json();
        // setUsers(data);
        console.log(data)
    };



    const test = (e) => {
        e.preventDefault();
        setShouldRun(true);
        getData();
        // console.log(search)
        // fetchData(search)
        // setShouldRun(false);

    }
    const updateInput = (event) => {
        // console.log(event.target.value);
        setSearch(event.target.value)
    }

    return (

        <div className="w-[100vw] h-[100vh] bg-slate-900 flex-col justify-center items-center flex ">
            <div>
                <div className="flex justify-center">
                    <h1 className="text-white">Youtube <span className="text-red-600">Search</span></h1>
                </div>

                <form onSubmit={test}>
                    <div className="w-fit ">
                        <input className="h-10 rounded-l-lg pl-4 w-[40vw]" type="text" name="id" onChange={updateInput} />
                        <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-r-lg">Search</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default MainPage;