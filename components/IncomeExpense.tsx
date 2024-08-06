import fetchIncomeExpense from "@/app/actions/fetchIncomeExpense";
import { addCommas } from "@/lib/utils";

const IncomeExpense = async() => {
    const {income, expenses} = await fetchIncomeExpense();

    return ( 
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">${addCommas(Number(income?.toFixed(2)) ?? 0)}</p>
            </div>
            <div>
                <h4>Expenses</h4>
                <p className="money minus">${addCommas(Number(expenses?.toFixed(2)) ?? 0)}</p>
            </div>
        </div>
     );
}
 
export default IncomeExpense;