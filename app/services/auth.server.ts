import { parse } from "cookie";

export async function ValidateCurrentSession(request: Request, hankoUrl: string){

    const cookies = parse(request.headers.get("Cookie") || "");
    const cookieToken = cookies.hanko;
    
    const validationOptions = { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: `{"session_token":"${cookieToken}"}`
  }

      try {
        const response = await fetch(hankoUrl + '/sessions/validate', validationOptions);
    
        if (!response.ok) throw new Error('Session validation failed');
        
        const verifiedResponse = await response.json();
    
        return verifiedResponse.is_valid
        
      } catch (error) {
        console.log(error)
        return false;
      }
}
