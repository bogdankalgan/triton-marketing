import DesktopTitle from "../../styles/DesktopTitle.module.css"
import AnimatedWaveBackground from "../../components/AnimatedWaveBackground";

function Home() {
    return (
        <div className="bg-black">
            <section className="h-[696px] relative flex flex-col items-center">
                <AnimatedWaveBackground/>
                <h1 className={`${DesktopTitle.DesktopTitle} z-10 relative`}>Make waves <br/> with affordable <br/> marketing experts</h1>
            </section>
        </div>
    )
}

export default Home;