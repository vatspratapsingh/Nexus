import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css"
import { useNavigate } from "react-router";

const CallContent = () => {
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState()

  const navigate = useNavigate();

  if(callingState === CallingState.LEFT){
    navigate("/");
    return null;
  }     
  return (
    <StreamTheme>
        <SpeakerLayout />
        <CallControls />
    </StreamTheme>
  )
}

export default CallContent;