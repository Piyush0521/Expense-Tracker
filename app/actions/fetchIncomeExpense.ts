'use server'
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function fetchIncomeExpense() : Promise<{
    income?: number;
    expenses?: number;
    error?: string;
}> {
    const {userId} = auth();

    if(!userId){
        return {error : 'No User found'}
    }

    try {
        const transactions = await db.transaction.findMany({
            where:{
                userId: userId
            }
        });

        // console.log('transactions >>', transactions);
        //get amounts from the transaction object
        const amounts = transactions.map((transaction) => transaction.amount);
        // console.log('transaction.amount >>', amounts);
        const income = amounts
        .filter(amount => amount>0)
        .reduce((acc, amount) => acc + amount, 0);
        const expenses = amounts
        .filter(amount => amount<0)
        .reduce((acc, amount) => acc + amount, 0);

        return {income: income, expenses: Math.abs(expenses)};
    } catch (error) {
        return {error: 'Database error'}
    }
}

export default fetchIncomeExpense;