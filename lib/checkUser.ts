import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async() => {
    const clerkUser = await currentUser();
    // console.log('clerkUser >>', clerkUser);

    //if there is no clerkUser i.e. not logged in
    if(!clerkUser){
        return null;
    }

    //check if clerkUser is already in database
    const databaseUser = await db.user.findUnique({
        where:{
            clerkUserId: clerkUser.id,
        }
    });

    //if clerkUser is present in database -> return the databaseUser
    if(databaseUser){
        return databaseUser;
    }

    //if no such user is present -> create new and return
    const newUser = await db.user.create({
        data:{
            clerkUserId: clerkUser.id,
            name: `${clerkUser.firstName} ${clerkUser.lastName}`,
            imageUrl: clerkUser.imageUrl,
            email: clerkUser.emailAddresses[0].emailAddress,
        }
    })
    return newUser;
};