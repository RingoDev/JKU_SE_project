import App from "./App";
import React, {useState} from "react";
import './landingPage.css'

const LandingPage: React.FC<{}> = () => {

    const [name, setName] = useState<string>()

    const [tempName, setTempName] = useState<string>('')

    if (name) return (<App name={name}/>)
    return (
        <>
            <div id={'landingContainer'}>
                <div className={'card p'}>
                    <div className={'card-content'}>Choose a Name</div>
                    <input onChange={(e) => setTempName(e.target.value)} type={'text'}/>
                    <button className={'btn'} onClick={() => {
                        console.log(tempName)
                        setName(tempName)
                    }}>Submit
                    </button>
                </div>
                <div>

                </div>
            </div>
        </>
    )

}

export default LandingPage;