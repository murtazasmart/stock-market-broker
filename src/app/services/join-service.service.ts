import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';

@Injectable()
export class JoinServiceService {

  constructor(private http : Http, private router : Router) {}

public startGame()
{
  return this.http.get('https://exithost.000webhostapp.com/bank/account')
  .subscribe(response=>{
    const account:any=response.json();
    if(account!=null)
    {
  this.http.post('https://stock-market-simulator.herokuapp.com/api/v1/game', {gameName: "StockGame"})
  .subscribe(response=>{
    const decoded:any=response.json();
    if(decoded.name==="StockGame"){
      
      const userData={
        isStartGame:true,
        isLoggedIn:true,
        ...decoded
      }
      localStorage.setItem("userData", JSON.stringify(userData));
      this
      .router
      .navigate(['/dashboard']);
      console.log(userData);
}
    
  })

    }//check account is null
    else{
      alert('Please Add Players');
    }
  })

  
}
public endGame()
{
  return this
            .http
            .get('https://exithost.000webhostapp.com/bank/startgame')
            .subscribe(response => {
              // after game is reset
              const responseStart : any = response.json();
              console.log('startGame', responseStart);
              })

}
public loggin(name:string)
{
  
/*return this.http.get('https://exithost.000webhostapp.com/bank/account')
  .subscribe(response=>{
    const account:any=response.json();
    if(account==null)
    {
      this.http.get('https://exithost.000webhostapp.com/bank/startgame')
     .subscribe(response=>{
    const responseStart : any = response.json();
    console.log('startGame', responseStart);
    if (responseStart.message === "Ready to start game") {*/
    return this
                  .http
                  .post('https://exithost.000webhostapp.com/bank/account', {
                    Name: name
                  }, {
                    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
                  })
                  .subscribe(response => {
                    const decodedBankAccount : any = response.json();
                    console.log('create join', decodedBankAccount);
                    if (decodedBankAccount.Name === name) {
                      localStorage.setItem("userData", JSON.stringify(name));
                      this
                        .router
                        .navigate(['/join']);
                    }
                  })

    }
  //})
   // }
   /* else
    {
      this
                  .http
                  .post('https://exithost.000webhostapp.com/bank/account', {
                    Name: name
                  }, {
                    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
                  })
                  .subscribe(response => {
                    const decodedBankAccount : any = response.json();
                    console.log('create join', decodedBankAccount);
                    if (decodedBankAccount.Name === name) {
                      localStorage.setItem("userData", JSON.stringify(name));
                      this
                        .router
                        .navigate(['/join']);
                    }
                  })
    }*/
 // })



  




//}


 /*public logIn(name : string) {

    return this
      .http
      .post('https://stock-market-simulator.herokuapp.com/api/v1/game', {gameName: "StokMarketGame"})
      .subscribe(response => {
        const decoded : any = response.json();
        if (decoded.name === "StokMarketGame") {
          const userData = {
            isLoggedIn: true,
            ...decoded
          }
          console.log(userData);

          this
            .http
            .get('https://exithost.000webhostapp.com/bank/startgame')
            .subscribe(response => {
              // after game is reset
              const responseStart : any = response.json();
              console.log('startGame', responseStart);
              if (responseStart.message === "Ready to start game") {

                this
                  .http
                  .post('https://exithost.000webhostapp.com/bank/account', {
                    Name: name
                  }, {
                    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
                  })
                  .subscribe(response => {
                    const decodedBankAccount : any = response.json();
                    console.log('create join', decodedBankAccount);
                    if (decodedBankAccount.Name === name) {
                      localStorage.setItem("userData", JSON.stringify(userData));
                      this
                        .router
                        .navigate(['/dashboard']);
                    }
                  })
              }

            })
        } else {
          alert("Login Failed")
        }
      })
 }*/

}
