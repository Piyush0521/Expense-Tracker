import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import Guest from "@/components/Guest";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/TransactionList";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async() => {
const user = await currentUser();

if(!user){
  return <Guest/>;
}

  return ( 
    <main className="main" >
    <div className="column">
      <h1>Welcome, {user.firstName}</h1>
      <Balance/>
      <IncomeExpense/>
    <div  className="column">
      <AddTransaction/>
    </div>
    </div>
    <div className="column" style={{padding: '0px 20px 20px 30px'}}>
      <TransactionList/>
    </div>
  </main>
   );
}
 
export default HomePage;