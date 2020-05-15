import axios from 'axios';

const url = `/api`;

export const fetchClients = async () => {
    try {
        const { data } = await axios.get(`${url}/clients`);
        const modifiedData = data.map((clientData) => ({
            ID: clientData.id,
            Client: clientData.name,
            ExpDate: clientData.membership_valid,
            Status: null,
            Update: null,
            Delete: null
        }));
        return modifiedData;
    }
    catch (err) {
    }
}

export const fetchExpenses = async () => {
    try {
        const { data } = await axios.get(`${url}/expenses`);
        const modifiedData = data.map((expense) => ({
            Expense: expense.name,
            Amount: expense.amount,
            Date:expense.date,
            Update: null,
            Delete: null
        }));
        return modifiedData;
    }
    catch (err) {
    }
}

export const fetchWorkouts = async () => {
    try {
        const { data } = await axios.get(`${url}/workouts`);
        const modifiedData = data.map((workout) => ({
            id:workout.id,
            Workout: workout.name,
            Link: workout.link,
            Date:workout.created_at,
            Update: null,
            Delete: null
        }));
        return modifiedData;
    }
    catch (err) {
    }
}


export const fetchAmount = async (dateFrom, toDate) => {
    try {
        const { data } = await axios.get(`${url}/amount`);
        const modifiedData = data.map((data) => ({
            payments:data.payments,
            expenses:data.expenses,
            profit:data.profit,
            date:data.date
        }));
        return modifiedData;
    }
    catch (err) {
    }
}
