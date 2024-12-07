import axios from "../configs/axios.config"

export async function SignUp(email : string , password : string , username : string){
    try{
        const res = await axios.post('/auth/signup' , {
            email : email,
            password : password,
            username : username        
        })

        if(res.status === 200){
            return res?.data;
        }else{
            return res;
        }
    }catch(err : any){
        console.log("error occured while signin up" , err);
        return err.toString()
    }
}

export async function SignIn(email : string , password : string){
    try{
        const res = await axios.post('/auth/signin' , {
            email : email,
            password : password,   
        })
    
        if(res.status === 200){
            return res.data;
        }else{
            return res;
        }
    }catch(err : any){

        console.log("error occured while signin up" , err);
        return err.toString()
    }
}