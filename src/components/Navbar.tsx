import React, {FC} from "react";

// Navbar Props
type NavbarProps = {
    onClick: (className: string) => void,
    currentClass: string
}

// the navbar buttons wrapped in a div
const Navbar: FC<NavbarProps> = (props) => {

    // a single button with a different color for when its clicked or when it's not
    const classButton = (className: string) => {
        return (
            <div key={className} className={"text-center inline-block pt:w-[22%] z-90 box-border"}>
                <button key={className} onClick={() => {
                    props.onClick(className)
                }} className={`dark:text-teal-100 box-border text-neutral-900 m-1 dt:h-10 dt:w-14 h-7 w-12 ${props.currentClass === className ? " dark:bg-[#293942] dark:shadow-darkBlue bg-teal-500 shadow-neonBlue" : " shadow-lgDark"}`}>{className}</button>
            </div>
        )
    }

    // classes-array to loop through and get buttons for all the classes (maybe make dynamic with the fetched data for rest-api to get data from classes not listed here?)
    const classes = ["7A", "7B", "7E", "7N", "8A", "8B", "8E", "8N", "9A", "9B", "9E", "9N", "10A", "10B", "10E", "10N", "11", "12"]

    // all buttons in an array to place into the html return
    const buttons: JSX.Element[] = []

    // loop over each class and add the button element to the buttons-array
    classes.forEach(className => buttons.push(classButton(className)))

    // HTML
    return (
        <div className={"pt:ml-[6%] pt:mr-[6%]"}>
            {buttons}
        </div>
    )

}

export default Navbar