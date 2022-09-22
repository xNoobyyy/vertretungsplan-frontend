import {FC} from "react";
import GithubBrightLogo from "../images/github-logo-bright.svg";
import GithubDarkLogo from "../images/github-logo-dark.svg";
import PaulsenBrightLogo from "../images/paulsen-logo-bright.svg";
import PaulsenDarkLogo from "../images/paulsen-logo-dark.svg";
import LernraumBrightLogo from "../images/lernraum-logo-bright.svg";
import LernraumDarkLogo from "../images/lernraum-logo-dark.svg";

// Empty Footer Props
type FooterProps = {
    darkMode: boolean
}

// the footer, everything is a bit hacky, but it works
const Footer:FC<FooterProps> = (props) => {

    return (
        <div className={"h-20 absolute bottom-0 w-[100%] pt:pt-8"}>
            <div className={"flex text-center justify-center items-center dark:bg-[#0b0b0b] bg-[#e7edec]"}>
                <a className={"hover:cursor-auto"} href={"https://github.com/xNoobyyy/vertretungsplan-frontend"}>
                    <img className={"h-10 w-auto hover:cursor-pointer m-5 grayscale"} src={props.darkMode ? GithubBrightLogo : GithubDarkLogo} alt={"Github"}/>
                </a>
                <a className={"hover:cursor-auto"} href={"https://www.paulsen-gymnasium.de/"}>
                    <img className={"h-10 w-auto hover:cursor-pointer m-5 grayscale"} src={props.darkMode ? PaulsenBrightLogo : PaulsenDarkLogo} alt={"Paulsen"}/>
                </a>
                <a className={"hover:cursor-auto"} href={"https://pg-berlin.de/lernRAUM/"}>
                    <img className={"h-10 w-auto hover:cursor-pointer m-5 grayscale"} src={props.darkMode ? LernraumBrightLogo : LernraumDarkLogo} alt={"Lernraum"}/>
                </a>
            </div>
        </div>
    )

}

export default Footer