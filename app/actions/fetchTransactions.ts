'use server'
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/transaction";

async function fetchTransactions() : Promise<{
    transaction?: Transaction[];
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

        return {transaction: transactions};
    } catch (error) {
        return {error: 'Database error'}
    }
}

export default fetchTransactions;