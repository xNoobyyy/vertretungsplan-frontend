import {FC, useState} from "react";

// Darkmode Button Props
type DarkModeButtonProps = {
    defaultValue: boolean,
    onEnable: () => void,
    onDisable: () => void
}

// Toggle to turn darkmode on and off
const DarkModeButton:FC<DarkModeButtonProps> = (props) => {

    // enabled or disabled handling with custom setter (use useEffect() maybe?)
    const [enabled, _setEnabled] = useState(props.defaultValue);
    const setEnabled = (enabled: boolean) => {
        _setEnabled(enabled)
        if (enabled) props.onEnable(); else props.onDisable()
    }

    // HTML
    return (
        <div id={"toggle"}>
            <label htmlFor="toggle-darkmode" className="inline-flex shrink-0 relative items-center cursor-pointer dt:mt-2.5">
                <input type="checkbox" value="" id="toggle-darkmode" className="sr-only peer" checked={enabled} onClick={() => setEnabled(!enabled)} readOnly/>
                <div className="dark:shadow-lgBright shadow-lgDark w-11 h-6 dark:bg-[#293942] bg-neutral-900 rounded-full peer peer-checked:after:translate-x-full dark:peer-checked:after:border-teal-50 peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[4.5px] dark:after:bg-teal-50 after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-[1.1rem] after:w-[1.1rem] after:transition-all dark:peer-checked:bg-teal-500 peer-checked:bg-teal-500"></div>
                <span className="ml-2 text-sm font-medium text-neutral-900 dark:text-teal-100">Darkmode</span>
            </label>
        </div>
    )

}

export default DarkModeButton