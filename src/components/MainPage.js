// import logo from '../svg/logo-no-background.svg';

import { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';



const MainPage = () => {
    const [search, setSearch] = useState('');
    // const [shouldRun, setShouldRun] = useState(false);
    // const [input, setInput] = useState('');
    // const [output, setOutput] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [border, setBorder] = useState(false);

    const [post, setPost] = useState(null);
    let myObject;

    const steps = [
        {
            id: 1,
            instruction: 'Input the name of the name of the youtuber or video you are searching for.'
        },
        {
            id: 2,
            instruction: 'Click the enter button.'
        },
        {
            id: 3,
            instruction: 'Wait for it to load.'
        },
        {
            id: 4,
            instruction: 'Click on the name under the video to be redirected to the video on youtube.'
        },
    ]

    //     <p>1.  Input the name of the name of the youtuber or video you are searching for</p>
    // <p>2: Click the enter button</p>
    // <p>3: Wait for it to load</p>
    // <p>4: Click on the name under the video to be redirected to the video on youtube</p>
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
        let filtered = data.items.filter((item) => item.bestThumbnail)
        setApiData(filtered);
        setBorder(true)
        console.log(filtered)

    };

    const updateInput = (event) => {
        setSearch(event.target.value)

        if (event.target.value.length === 0) {
            setBorder(false)
            setApiData('');
        }
    }

    const test = (e) => {
        e.preventDefault();

        getData();

        // setSearch('');


    }

    // console.log(apiData)



    return (

        <div className="w-[100vw] h-[100vh] bg-slate-900 flex-col justify-center items-center flex ">
            <div className="mb-8">
                <div className="flex justify-center mb-4">
                    <h1 className="text-white text-3xl">You<span className="text-red-600">Search</span></h1>
                </div>

                <form onSubmit={test}>
                    <div className="w-fit rounded-lg">
                        <input className="h-10 rounded-l-lg pl-4 lg:w-[20vw] w-[40vw]" type="text" name="id" value={search} onChange={updateInput} />
                        <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-r-lg">Search</button>
                    </div>
                </form>
            </div>

            {!border && <div className="border w-[80vw] lg:w-[60vw] h-[70vh] flex flex-col items-center pt-8">
                <h1 className="text-white text-3xl mb-12">How to use You<span className="text-red-600">Search</span>:</h1>
                <div className="text-white w-[80vw] lg:w-[60vw] h-[40vh] px-8">
                    {steps.map((items) => (
                        <div key={items.id} className="flex flex-row mb-4">
                            <p className="mr-4">{items.id}:</p>
                            <p>{items.instruction}</p>
                        </div>
                    ))}

                </div>
            </div>}
            {border && <div>

                <div className="w-[94vw] lg:w-[60vw] h-[70vh] overflow-y-scroll">
                    {apiData?.map((item) => (
                        <div key={item.title}>
                            <img src={item.bestThumbnail.url} alt={item.title} className="w-[94vw] lg:w-[60vw]" />
                            <a href={item.url} target="_blank" className="text-white">{item.name ? item.name : item.title}</a>

                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}
export default MainPage;