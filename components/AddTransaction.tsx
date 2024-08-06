'use client';
import { useRef } from "react";
import addTransaction from "@/app/actions/addTransaction";
import { toast } from 'react-toastify';

const AddTransaction = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const clientAction = async(formData: FormData) => {
        const result = await addTransaction(formData);

        if(result.error){
            toast.error(result.error);
        }else{
            toast.success('Transaction added');
            formRef.current?.reset();
            console.log(result.data);
        }
    }

    return ( 
        <>
        <h3>Add Transaction</h3>
        <form ref={formRef} action={clientAction}>
            <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" name="text" id="text" placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount<br/> (negative - expense, positive - income) </label>
                    <input type="number" name="amount" id="amount" placeholder="Enter amount..." step='0.01'/>
            </div>
            <button className="btn">Add Transaction</button>
        </form>
        </>
     );
}
 
export default AddTransaction;