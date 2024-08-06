'use server'
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function deleteTransaction(transactionId: string) : Promise<{
    message?: string;
    error?: string;
}> {
    const {userId} = auth();

    if(!userId){
        return {error : 'No User found'}
    }

    try {
        await db.transaction.delete({
            where:{
                id: transactionId,
                userId: userId
            }
        })

        revalidatePath('/');
        return {message: 'Transaction Deleted'};
    } catch (error) {
        return {error: 'Database error while deleting'}
    }
}

export default deleteTransaction;