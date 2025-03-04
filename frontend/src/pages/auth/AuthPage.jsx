import NavBar from "../../components/NavBar.jsx";
import AuthForm from "../../components/AuthForm.jsx"
const SignUp = () => {
    return (
        <div className = "w-screen h-screen flex justify-center items-center flex-col">
            <NavBar />
            <section className = "justify-around w-full  flex flex-row">
            <AuthForm type="SignUp" route = "api/auth/signup/"></AuthForm>
            <AuthForm type="Login" route = "api/auth/login/"></AuthForm>
        </section>
        </div>
    );

}
export default SignUp;
