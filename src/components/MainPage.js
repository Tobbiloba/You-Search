// import logo from '../svg/logo-no-background.svg';

import { useEffect, useState } from "react";



const MainPage = () => {
    const [search, setSearch] = useState('');
    // const [shouldRun, setShouldRun] = useState(false);
    // const [input, setInput] = useState('');
    // const [output, setOutput] = useState([]);
    const [apiData, setApiData] = useState([]);

    const [post, setPost] = useState(null);
    let myObject;


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4dace60f82msh08a03dbd32f400fp14522djsna13e09b3e598',
            'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
        }
    };

    // const getData = () => {
    //     fetch(`https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${search}`, options)
    //         .then(response => response.json())
    //         .then(data => {
    //             // console.log(data);
    //             setOutput(data);
    //             // myObject = JSON.parse(data)
    //             console.log(output.items)
    //             setSearch('');
    //         })
    //         .catch(error => console.error(error));
    // };

    const getData = async () => {
        const response = await fetch(`https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${search}`, options);
        const data = await response.json();
        setApiData(data.items);
        console.log(data.items)
        // console.log(apiData)
    };

    const updateInput = (event) => {
        setSearch(event.target.value)
    }

    const test = (e) => {
        e.preventDefault();

        getData();

        // setSearch('');


    }


    return (

        <div className="w-[100vw] h-[100vh] bg-slate-900 flex-col justify-center items-center flex ">
            <div>
                <div className="flex justify-center mb-4">
                    <h1 className="text-white text-3xl">You<span className="text-red-600">Search</span></h1>
                </div>

                <form onSubmit={test}>
                    <div className="w-fit rounded-lg">
                        <input className="h-10 rounded-l-lg pl-4 lg:w-[20vw] w-[40vw]" type="text" name="id" value={search} onChange={updateInput} />
                        <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-r-lg">Search</button>
                    </div>
                </form>
                <div>
                    {apiData?.map((item) => (
                        <div>
                            <p>{item.name ? item.name : item.title}</p>
                            {/* <img src={item?.bestThumbnail.url} alt={item.title} /> */}
                            {/* <p>{item?.author.avatars.url}</p> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default MainPage;