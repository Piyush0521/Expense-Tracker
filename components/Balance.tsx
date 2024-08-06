import fetchBalance from "@/app/actions/fetchBalance";
import { addCommas } from "@/lib/utils";

const Balance  = async () => {
    const {balance} = await fetchBalance();
    
    return ( 
    <>
    <h3>Your Balance -</h3>
    <h2>${addCommas(Number(balance?.toFixed(2)) ?? 0) }</h2>
    </> 
  );
}
 
export default Balance;