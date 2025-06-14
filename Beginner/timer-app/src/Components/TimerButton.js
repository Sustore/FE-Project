import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TimerButton = (props) => {
    const {
        className,
        onClick,
        datatTooltip,
        dataTooltipSize,
        arialAbel,
        icon
    } = props;

    return (
        <button 
            className={className} 
            onClick={onClick}
            data-tooltip={datatTooltip}
            data-tooltip-size={dataTooltipSize}
            aria-label={arialAbel}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}

export default TimerButton;
// This component is a reusable button for the Timer component.