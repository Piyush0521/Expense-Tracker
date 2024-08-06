'use server';
import { auth } from "@clerk/nextjs/server";
import {db} from '@/lib/db';
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string;
}

async function addTransaction(formData:FormData): Promise<TransactionResult> {
    const textValue = formData.get('text');
    const amountValue = formData.get('amount');

    //Check for the input values
    if(!textValue || textValue ==='' || !amountValue || amountValue ===''){
        return {error: 'Text or amount is missing'};
    }

    const text: string = textValue.toString();   //ensure text is a string
    const amount: number = parseFloat(amountValue.toString());  //Parse amount as number

    //get logged in user
    const {userId} = auth();

    //if no user is found
    if(!userId){
        return {error: 'User Not Found'};
    }

    try {
        const transactionData: TransactionData = await db.transaction.create({
            data: {
                text,
                amount,
                userId
            }
        });
        revalidatePath('/');  
        return {data: transactionData};
    } catch (error) {
        return {error: 'Transaction not added'}
    }

    
}

export default addTransaction;