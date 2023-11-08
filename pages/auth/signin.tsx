import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import SignInPage from "@/components/User/SignInPage";

import { getProviders, getCsrfToken, getSession } from "next-auth/react";


export const getServerSideProps = async (context: any) => {
    const { req, query } = context;
    
    let callbackUrl = "";
    if (query) {
        let getcall = query.callbackUrl.toString();

        callbackUrl = getcall;
        
    }


    // console.log('call:',callbackUrl, query)

    const session = await getSession({req});

    if (session) {


        
        
        if (callbackUrl) {
            return {
                redirect: {
                    destination: callbackUrl // Assuming callbackUrl is a string
                }
            };
        } else {
            return {
                redirect: {
                    destination: '/' // Redirect to a default URL
                }
            };
        }
    }
    const csrfTokenDummy = await getCsrfToken(context);
    const csrfToken = csrfTokenDummy?.toString();
    
    let providers = await getProviders();
   
    console.log("Provider" + providers, "CSRFToken", csrfToken, "callbackUrl", callbackUrl);
    
    return{
        props: {
            providers,
            csrfToken,
            callbackUrl
        }
    }
}


const SignIn = ({ providers, csrfToken, callbackUrl }: any) => {
    if (!providers) {
        providers = []; 
      }
    
      providers = Object.values(providers);
      console.log("Providers are :", providers);
    
    return ( 
        <>
            <Header />
                <main className="bg-slate-100 w-full h-auto">
                    <SignInPage providers={providers} csrfToken={csrfToken} callbackUrl={callbackUrl}/>
                </main>
            <Footer />
            <MenuSideBar />
        </>
     );
}
 
export default SignIn;




