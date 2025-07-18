import DesktopText from "../../styles/DesktopText.module.css"

function Header() {
    return (
        <header className="flex items-center justify-between bg-black p-[24px_113px_35px_113px] relative z-10">
            <img src="./icons/site-icon/site-icon.svg" alt="header"/>

            <nav>
                <ul className="flex text-white gap-[36px]">
                    <li>
                        <a href="/home" className={DesktopText.DesktopText}>Home</a>
                    </li>

                    <li className={DesktopText.DesktopText}>
                        <select className="bg-transparent border-none outline-none">
                            <option className={DesktopText.DesktopText}>
                                Services
                            </option>
                        </select>
                    </li>

                    <li>
                        <a href="/clientSuccess" className={DesktopText.DesktopText}>Client Success</a>
                    </li>

                    <li>
                        <a href="/blog" className={DesktopText.DesktopText}>Blog</a>
                    </li>

                    <li>
                        <a href="/contact" className={DesktopText.DesktopText}>Contact</a>
                    </li>

                    <li className={DesktopText.DesktopText}>
                        <select className="bg-transparent border-none outline-none" >
                            <option className={DesktopText.DesktopText}>
                                EN
                            </option>

                            <option className={DesktopText.DesktopText}>
                                RU
                            </option>

                            <option className={DesktopText.DesktopText}>
                                UA
                            </option>
                        </select>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;