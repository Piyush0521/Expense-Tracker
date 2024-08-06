import { checkUser } from '@/lib/checkUser';
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'


const Header = async () => {
    const user = await checkUser();

    return ( 
        <nav className="navbar">
            <div className="navbar-container">
                <h2>Expense Tracker</h2>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
     );
}
 
export default Header;