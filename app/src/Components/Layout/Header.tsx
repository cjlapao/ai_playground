import { useEffect, useState } from "react"
import './Header.scss'
import logo from '../../../assets/pl-logo-dk.png'
import { Checkbox } from "@mui/material"

let checkBoxState = false

export const StartOnLoginCheckbox = () => {
    const [isChecked, setIsChecked] = useState(false)
    window.electron.ipcRenderer.on('get-start-on-login-state', (response) => {
        console.log('there')
        console.log(`response: ${response}`)
        checkBoxState = response as boolean
        setIsChecked(response as boolean)
    })

    const checkHandler = () => {
        const toggleTo = isChecked ? 'off' : 'on'
        setIsChecked(!isChecked)
        window.electron.ipcRenderer.sendMessage('start-on-login', [toggleTo])
    }

    useEffect(() => {
        console.log('here')
        console.log('getting state')
    }, [])

    return (
        <div className="show-on-start-container">
            <a onClick={checkHandler}>
                <Checkbox checked={isChecked} />
                <label >Show on Startup</label>
            </a>
        </div>
    )
}

export default function Header() {
    return (
        <div className="header-root">
            <div>
                <img width="250px" src={logo}/>
            </div>
            <div className="title-container">
            AI Developer Package
            </div>
                <StartOnLoginCheckbox />
        </div>
    )
}