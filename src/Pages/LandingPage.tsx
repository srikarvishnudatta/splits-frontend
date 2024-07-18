import { FormEvent, useRef } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../api/customFetch";
import Button from "../components/Button";
function LandingPage() {
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function submitHandler(ev: FormEvent){
        ev.preventDefault();
        const email = ref.current!.value;
        const response = await customFetch("/user", "POST", email);
        if(!response) throw new Error("cannot process request")
        const resData = await response.json()
        localStorage.setItem('userId', resData.id);
        console.log(response);
        
        navigate('/home')
    }
  return (
    <main className="main-page">
      <form className="form" onSubmit={submitHandler}>
        <p>Enter your email to begin your journey</p>
        <input ref={ref} type="text" required/>
        <Button 
        textOnly={false}
        text="Submit"
        type="submit"
        />
      </form>
    </main>
  );
}

export default LandingPage;
