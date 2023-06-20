interface IconPanelOptionsProps {
    onClick?: () => void;
}

const IconPanelOptions = ({ onClick }: IconPanelOptionsProps) => {
    return (
        <svg onClick={onClick} viewBox="0 0 18 18" className="h-5 w-5 hover:opacity-70" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 18 18" xmlSpace="preserve">
            <path fill="currentColor" d="M3.3,4.6L9,10.3l5.7-5.7l1.6,1.6L9,13.4L1.7,6.2L3.3,4.6z"></path>
        </svg>
    )
}

export default IconPanelOptions
