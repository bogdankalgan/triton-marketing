function DesktopBtn(props) {
    const {text, padding} = props;

    return (
            <button className="text-white bg-gradient-to-r from-[#E295F0] to-[#8402D9] rounded-[30px] text-base hover:from-[#8402D9] hover:to-[#8402D9] transition-all duration-1000 active:from-[#E295F0] active:to-[#8402D9]" style={{padding: padding}}>
                {text}
            </button>
    )
}

export default DesktopBtn;