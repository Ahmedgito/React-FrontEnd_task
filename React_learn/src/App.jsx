import { useContext } from "react";
import AxiosLearn from "./Axios";
import { Datacontext } from "./context/Context";


const App = () => {

  const data = useContext(Datacontext)
  console.log(data);

  return (
    <>
      <AxiosLearn />
    </>
  )

}

export default App;