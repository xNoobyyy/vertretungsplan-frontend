import React, {FC} from "react";
import BrightLogo from "../images/paulsen-logo-bright.svg";
import DarkLogo from "../images/paulsen-logo-dark.svg";

// Header Props
type HeaderProps = {
    darkMode: boolean
}

// the header which is just text and an image
const Header:FC<HeaderProps> = (props) => {

    return (
        <header className={"font-bold text-center m-8"}>
            <div
                className={"dt:text-4xl pt:text-3xl dark:text-teal-100 text-neutral-900 content-center items-center justify-center flex"}>
                <h1>Vertretungsplan</h1>
                <img className={"object-cover dt:h-16 pt:h-12 w-auto ml-6"} src={props.darkMode ? BrightLogo : DarkLogo}
                     alt={"Paulsen-Logo"}/>
            </div>
        </header>
    )

}

export default Header