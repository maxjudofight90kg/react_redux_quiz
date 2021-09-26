import React, {useContext} from 'react'
import { AlertContext } from '../context/alert/AlertContext'

const Alert = () => {
const {alert, hide} = useContext(AlertContext)
    if (!alert) return null
    return (
        <div 
            className={`alert alert-${alert.type || 'secondary'} alert-dismissible`} 
            role="alert"
        >
        {alert.text}
            <button type="button" className="btn-close" aria-label="Close" onClick={hide}></button>
        </div>
    )
}

export default Alert
