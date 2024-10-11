import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import googleIcon from "./assets/google-svg.svg"
import { useEffect, useState } from "react"

function App() {
  const [redirectApp, setRedirectApp] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectAppParam = searchParams.get("redirectApp");

    const token = getCookie("token");
    console.log(token);
    
    if (redirectAppParam) setRedirectApp(redirectAppParam);
  }, [])
  
  return (
      // <div className="w-full h-[100vh] flex items-center justify-center border-2">
        <form 
            method="POST" 
            action={`http://localhost:5000/auth/login?redirectApp=${redirectApp}`} 
            className="shadow-md rounded-lg p-10 min-w-[280px] max-w-[400px] m-auto translate-y-1/2"
        >
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">Login To Your Account</h1>
            <Input type="email" name="email" placeholder="Email" className="focus:shadow-lg shadow rounded" /> 
            <Button variant="outline" type="submit" className="bg-foreground w-full text-background rounded shadow-lg my-2">
                <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
            </Button>
            <p className="flex items-center text-gray-500 gap-2 my-4">
                <span className="h-[1px] bg-gray-500 flex-1"></span>
                <span className="text-xs font-bold">OR CONTINUE WITH GOOGLE</span>
                <span className="h-[1px] bg-gray-500 flex-1"></span>
            </p>
            <a href={`http://localhost:5000/auth/google?redirectApp=${redirectApp}`}>
                <Button variant="outline" type="button" className="w-full rounded shadow">
                    <img src={googleIcon} width={20} className="w-4" />
                    <span className="ml-2 text-lg ">Google</span>
                </Button>
            </a>
        </form>
      // </div>
  )
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
}


export default App
