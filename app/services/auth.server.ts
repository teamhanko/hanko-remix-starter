import { parse } from "cookie";

export async function ValidateCurrentSession(request: Request, hankoUrl: string){

    const cookies = parse(request.headers.get("Cookie") || "");
    const cookieToken = cookies.hanko;

    const validationOptions = { 
        method: 'GET',
        headers: {
            'Cookie': `hanko=${cookieToken}` // If using cookie
            // 'Authorization': `Bearer ${token}` // If using Authorization header
        }
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
