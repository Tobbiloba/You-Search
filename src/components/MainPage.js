import { useEffect, useState } from "react";
// import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedIcon from '@mui/icons-material/Verified';
import './Loading.css'


const MainPage = () => {
    const [search, setSearch] = useState('');
    const [apiData, setApiData] = useState([]);
    const [border, setBorder] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [showSteps, setShowSteps] = useState(true)
    // const [showItems, setShowItems] = useState(false)

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

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4dace60f82msh08a03dbd32f400fp14522djsna13e09b3e598',
            'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
        }
    };


    const getData = async () => {


        const response = await fetch(`https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${search}`, options);

        const data = await response.json();

        let filtered = data.items.filter((item) => item.bestThumbnail)
        setApiData(filtered);









        // console.log(apiData)




    };

    const updateInput = (event) => {
        setSearch(event.target.value)

        if (event.target.value.length === 0) {
            setShowSteps(true)
            setBorder(false)
            setApiData('')
        }
    }

    const test = (e) => {

        // setBorder(true)
        e.preventDefault();
        setBorder(false)
        setShowSteps(false)
        setShowAnimation(true);
        getData();
        // console.log("I just clicked this button")
        setTimeout(() => {
            setShowAnimation(false);
            setBorder(true)
            // console.log("THis button is loadingH")
            // setShowItems(true);

        }, 5000);


        // console.log("This button has loaded")

    }




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

            {showSteps && <div className="border w-[80vw] lg:w-[60vw] h-[55vh] flex flex-col items-center pt-8">
                <h1 className="text-white text-3xl mb-12">How to use You<span className="text-red-600">Search</span>:</h1>
                <div className="text-white w-[80vw] lg:w-[60vw] h-[40vh] px-8">
                    {steps.map((items) => (
                        <div key={items.id} className="flex flex-row mb-4">
                            <p className="mr-4">{items.id}:</p>
                            <p className="text-[12px] lg:text-[17px]">{items.instruction}</p>
                        </div>
                    ))}

                </div>
            </div>}

            {showAnimation && <div className="w-[94vw] lg:w-[60vw] h-[80vh] flex justify-center items-center">
                <div class="wrapper">

                    <div class="box-wrap">
                        <div class="box one"></div>
                        <div class="box two"></div>
                        <div class="box three"></div>
                        <div class="box four"></div>
                        <div class="box five"></div>
                        <div class="box six"></div>
                    </div>
                </div>
            </div>}



            {border && <div>

                <div className="w-[94vw] border-4 border-slate-800 border-t-red-500 border-b-red-500 lg:w-[60vw] h-[80vh] overflow-y-scroll">



                    {/* {showItems && */}
                    <div>
                        {apiData?.map((item) => (
                            <div key={item.title} className="mb-12 border rounded-lg pb-8 overflow-hidden">
                                <img src={item.bestThumbnail.url} alt={item.title} className="w-[94vw] lg:w-[60vw] mb-8" />

                                <div className="flex justify-center items-center">
                                    <a href={item.url} target="_blank" className="text-white hover:text-gray-500 text-center w-[94vw] lg:w-[60vw]">{item.name ? item.name : item.title}</a>
                                </div>
                                <div className="pl-8 grid grid-rows-2 grid-flow-col gap-4 text-white mt-8">
                                    <p className="text-red-500">Views: <span className="ml-3 text-white">{item.views}</span></p>
                                    <p className="text-red-500">Time of upload: <span className="ml-3 text-white">{item.uploadedAt}</span></p>
                                    <p className="text-red-500">Duration: <span className="ml-3 text-white">{item.duration}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* } */}
                </div>
            </div>}
        </div>
    )
}
export default MainPage;