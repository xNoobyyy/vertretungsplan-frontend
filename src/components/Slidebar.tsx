import Marquee from "react-fast-marquee";
import {FC, useEffect, useState} from "react";

// Empty Slidebar Props
type SlidebarProps = { }

// Slidebar to display the extra information text using the "react-fast-marquee" library
const Slidebar: FC<SlidebarProps> = (props) => {

    // async fetch handling with states
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    // fetch the data from rest-api backend and handle text asynchronously
    const fetchData = async () => {
        fetch("http://88.214.57.206:8080/vertretungsplan-info", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Connection": "keep-alive",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36"
            }
        })
            .then(response => response.text())
            .then(data => {
                setIsLoading(false)
                setData(data)
            })
            .catch(error => {
                setIsLoading(false)
                setIsError(true)
                console.log(error)
            })
    }

    // execute the data fetching when everything is ready
    useEffect(() => {
        fetchData()
    }, [])

    // HTML
    return (
        <Marquee gradient={false} direction={"left"} pauseOnHover={true} speed={15}>
            {(isLoading ? "Loading .." : (isError ? "An Error Occurred!" : data))}
        </Marquee>
    )

}

export default Slidebar