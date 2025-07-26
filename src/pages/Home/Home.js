import DesktopTitle from "../../styles/DesktopTitle.module.css"
import AnimatedWaveBackground from "../../components/3D/AnimatedWaveBackground";
import DesktopBtn from "../../components/DesktopBtn/DesktopBtn";
import {Canvas} from '@react-three/fiber'
import BlokElement from "../../components/3D/BlokElement";

function Home() {
    return (
        <div className="bg-black">
            <section className="h-[696px] relative flex flex-col items-center">
                <AnimatedWaveBackground/>
                <h1 className={`${DesktopTitle.DesktopTitle} z-10 relative mb-[117px]`}>Make waves <br/> with affordable <br/> marketing experts</h1>
                <div className="z-10">
                    <DesktopBtn text="View services" padding="11px 36px"/>
                </div>
            </section>


            <section>
                <div>
                    <Canvas camera={{position: [0, 0, 4]}}>
                        <ambientLight camera={{position: [0, 0, 3]}} intensity={1.0}/>
                        <directionalLight intensity={2.0} position={[5,5,5]}/>
                        <BlokElement/>
                    </Canvas>
                </div>
            </section>
        </div>
    )
}

export default Home;