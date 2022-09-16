import {FC, useEffect, useState} from "react";
import {shortenString} from "../utils/StringUtils";

// Class Data Props
type ClassDataProps = {
    currentClass: string
}

// Display the actual class-data
const ClassData: FC<ClassDataProps> = (props) => {

    // async fetch handling with states
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    // fetch the data from rest-api backend and handle json asynchronously
    const fetchData = async () => {
        fetch("http://88.214.57.206:8080/vertretungsplan-data", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Connection": "keep-alive",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36"
            }
        })
            .then(response => response.json())
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

    if (isLoading) {
        // if it's still fetching the data return this
        return (
            <div className={"flex content-center items-center text-center self-center justify-center dark:text-teal-100 text-neutral-900 text-2xl mt-10"}>
                <h1>Loading ..</h1>
            </div>
        )
    }

    if (isError) {
        // if there was an error whilst fetching the data return this
        return (
            <div className={"flex content-center items-center text-center self-center justify-center dark:text-teal-100 text-neutral-900 text-2xl mt-10"}>
                <h1>An Error Occurred!</h1>
            </div>
        )
    }

    // get the full table element for one class on one day (extract to extra component?)
    const classDataTable = (className: string, frame: number) => {
        const frameData = data[frame]

        // get one line of data with given columns
        const classDataLine = (text: string, lesson: string, substitute: string | undefined, subject: string, room: string) => {
            return (
                <tr key={className + text + lesson + substitute + subject + room} className={"text-center mt-10 border-solid"}>
                    <td className={"pt-5"}>{shortenString(text)}</td>
                    <td className={"pt-5"}>{shortenString(lesson)}</td>
                    <td className={"pt-5"}>{substitute === undefined ? "---" : shortenString(substitute)}</td>
                    <td className={"pt-5"}>{shortenString(subject)}</td>
                    <td className={"pt-5"}>{shortenString(room)}</td>
                </tr>
            )
        }

        // lines to insert into table
        const lines: JSX.Element[] = []

        // loop over data and filter for the current-class and push to line-array
        frameData.data.forEach((subData: any) => {
            if (subData.class === className) {
                subData.data.forEach((lineData: any) => {
                    lines.push(classDataLine(lineData.info, lineData.lesson, lineData.substitute === null ? undefined : lineData.substitute, lineData.subject, lineData.room))
                })
            }
        })

        // if there are no entries for the current class just return a plain info text
        if (lines.length === 0) {
            return (<div className={"dark:text-teal-100 text-neutral-900 text-2xl text-center mt-5"}>
                <h1>Keine Vertretungsplan Einträge!</h1>
            </div>)
        }

        // return the html table element
        return (
            <table className={"mt-5"}>
                <thead>
                <tr>
                    <th className={"dt:w-[10vw] pt:w-[15%]"}>Info</th>
                    <th className={"dt:w-[5vw] pt:w-[15%]"}>Stunde</th>
                    <th className={"dt:w-[5vw] pt:w-[15%]"}>Vertretung</th>
                    <th className={"dt:w-[5vw] pt:w-[15%]"}>Fach</th>
                    <th className={"dt:w-[5vw] pt:w-[15%]"}>Raum</th>
                </tr>
                </thead>
                <tbody>
                    {lines}
                </tbody>
            </table>
        )
    }

    // HTML
    return (
        <div className={"mb-10 dt:flex dt:justify-between"}>
            <div className={"dt:ml-[12%] pt:mr-3 pt:ml-3 dark:text-teal-100 text-neutral-900"}>
                <div className={"text-center mt-16 dt:w-[30vw]"}>
                    <h2 className={"text-xl"}>{data[0].date}</h2>
                    <h3 className={"text-lg"}>{data[0].state}</h3>
                </div>
                { classDataTable(props.currentClass, 0) }
            </div>
            <div className={"dt:mr-[14%] pt:mr-3 pt:ml-3 dark:text-teal-100 text-neutral-900"}>
                <div className={"text-center mt-16 dt:w-[30vw]"}>
                    <h2 className={"text-xl"}>{data[1].date}</h2>
                    <h3 className={"text-lg"}>{data[1].state}</h3>
                </div>
                { classDataTable(props.currentClass, 1) }
            </div>
        </div>
    )

}

export default ClassData