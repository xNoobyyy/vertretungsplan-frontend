import React, {useState} from 'react';
import DarkModeButton from "./components/DarkModeButton";
import {cookies} from "./utils/Cookies";
import './App.css'
import AutoSwitchButton from "./components/AutoSwitchButton";
import Navbar from "./components/Navbar";
import Slidebar from "./components/Slidebar";
import ClassData from "./components/ClassData";
import {cancel, schedule, setFunction} from "./utils/SchedulerUtils";
import Header from "./components/Header";
import Footer from "./components/Footer";

/*
About the project:
- used TailwindCSS where I could to learn it and to make styling easier (used some vanilla css for phone outline hovering and grid functionality)
- I've added some custom shadows and screens (pt (phone/tablet) and dt (desktop)) to the tailwind.config.js
- tried to add comments everywhere afterwarts to make everything more understandable (but since this is not a very big project it should be easy to get into)
- Used Constants for Components (I don't like the "class" or "function" syntax)
- The footer part is very hacky, but it works

Extra:
- Fix fetching of class-data from backend not working in safari browser (??)
- Maybe in the Future make both toggles into one class (?)
- Make the components and app component less clustered
- Just clean up everything
- If I want to go all out make an admin panel and own entry creation and designing
 */

const App = () => {

    // DarkMode handling (use useEffect() instead of own setter???)
    const [darkMode, _setDarkMode] = useState(cookies.get("darkmode") === "on")
    const setDarkMode = (darkMode: boolean) => {
        // Set background of the body element (there is probably a better way to do this, but it works so ...)
        document.getElementById("body")!!.style.backgroundColor = darkMode ? "#111111" : "#F5F5F5FF"
        _setDarkMode(darkMode)
        // Set "darkmode" cookie
        if (darkMode) cookies.set("darkmode", "on"); else cookies.set("darkmode", "off")
    }
    document.getElementById("body")!!.style.backgroundColor = darkMode ? "#111111" : "#F5F5F5FF"

    // Current Class handling (use useEffect() instead of own setter???)
    const [currentClass, _setCurrentClass] = useState<string>(cookies.get("currentclass") === undefined ? "7A" : cookies.get("currentclass"))
    const setCurrentClass = (currentClass: string, clicked?: boolean) => {
        _setCurrentClass(currentClass)
        // Set "currentclass" cookie

        cookies.set("currentclass", currentClass)
        if (clicked === true) {
            cancel()
            schedule()
        }
    }

    // Autoswitch Functionality (should maybe be in an own component or class)
    const [autoSwitch, _setAutoSwitch] = useState(cookies.get("autoswitch") === "on")
    const setAutoSwitch = (autoSwitch: boolean) => {
        _setAutoSwitch(autoSwitch)
        // Init Autoswitch again or cancel current and set "autoswitch" cookie
        if (autoSwitch) {
            initAutoSwitch()
            cookies.set("autoswitch", "on")
        } else {
            cancel()
            cookies.set("autoswitch", "off")
        }
    }

    // Class-Array just for sorting and getting the next class for autoswitch
    const classes = ["7A", "7B", "7E", "7N", "8A", "8B", "8E", "8N", "9A", "9B", "9E", "9N", "10A", "10B", "10E", "10N", "11", "12"]

    // Inits the Autoswitch Handling
    const initAutoSwitch = () => {
        // Get the index of current class in the class-array above
        const index = (className: string) => {
            for (let i = 0; i < classes.length; i++) {
                if (classes[i] === className) return i
            }
            return -1
        }

        // Set the function that should be executed every 10 seconds if autoswitch is enabled
        setFunction(() => {
            setCurrentClass((index(currentClass) === -1 || index(currentClass) >= (classes.length - 1)) ? classes[0] : classes[index(currentClass) + 1], false)
        })
        // Start scheduling
        schedule()
    }

    // Init the Autoswitch or cancel for safety if autoswitch is turned off
    if (autoSwitch) {
        initAutoSwitch()
    } else {
        cancel()
    }

    // Very clustered (maybe extract some stuff to own components?)
    // HTML
    return (
        <div className={(darkMode ? "dark" : "bright") + ""}>
            <Header darkMode={darkMode}/>
            <div className={"w-full dark:shadow-bright shadow-dark dark:bg-teal-900 bg-[#cbe1dc]"}>
                <div className={"gridContainer pt-8 dt:grid z-20"}>
                    <div className={"first pt:float-left pt:ml-5 dt:self-center dt:transition-all dt:ml-56"}>
                        <DarkModeButton defaultValue={darkMode} onEnable={() => setDarkMode(true)}
                                        onDisable={() => setDarkMode(false)}/>
                    </div>
                    <div
                        className={"second pt:float-right pt:mr-5 dt:self-center dt:transition-all dt:ml-56"}>
                        <AutoSwitchButton defaultValue={autoSwitch} onEnable={() => setAutoSwitch(true)}
                                          onDisable={() => setAutoSwitch(false)}/>
                    </div>
                    <div
                        className={"box-border z-90 relative third block text-center dt:m-auto pb-4 pt:mt-14 pt:mr-5 pt:ml-5 pr-4 pl-4 content-center items-center dt:transition-all dt:overflow-hidden"}>
                        <Navbar currentClass={currentClass} onClick={setCurrentClass}/>
                    </div>
                </div>
                <div
                    className={"fourth text-lg pb-6 pt-10 hover:cursor-pointer text-neutral-900 dark:text-teal-100 z-[1]"}>
                    <Slidebar/>
                </div>
            </div>
            <ClassData currentClass={currentClass}/>
            <Footer darkMode={darkMode}/>
        </div>
    );
}

export default App;
