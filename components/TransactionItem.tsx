'use client'
import { Transaction } from "@/types/transaction";
import { addCommas } from "@/lib/utils";
import { toast } from "react-toastify";
import deleteTransaction from "@/app/actions/deleteTransaction";

const TransactionItem = ({transaction}: {transaction: Transaction}) => {

    const handleDeleteTransaction = async(transactionId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this transaction?');

        if(!confirmed){
            return;
        }

        const {message, error} = await deleteTransaction(transactionId);
        if(error){
            toast.error('Try again after sometime')
        }
        toast.success(message);
    }

    return ( 
        <li className={transaction.amount > 0 ? 'plus' : 'minus'}>
            {transaction.text}
            <span>
                {(transaction.amount>0 ? '+ ' : '- ') + '$' + addCommas(Math.abs(transaction.amount))}
                <button onClick={() => handleDeleteTransaction(transaction.id)} className="delete-btn"  >x</button>
            </span>
        </li>
     );
}
 
export default TransactionItem;