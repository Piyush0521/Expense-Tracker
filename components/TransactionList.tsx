import fetchTransactions from "@/app/actions/fetchTransactions";
import { Transaction } from "@/types/transaction";
import TransactionItem from "./TransactionItem";

const TransactionList = async() => {

    const {transaction, error} = await fetchTransactions();
    // console.log('transactions are here >>> ', transaction);

    if(error){
        return <p className="error">{error}</p>
    }
    return ( 
      <>
        <h3>History</h3>
        <ul className="list">
            {transaction && transaction.map((transaction: Transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction}/>
            )
            )}
        </ul>
      </>
     );
}
 
export default TransactionList;