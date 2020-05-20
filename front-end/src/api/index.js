import axios from 'axios';

const url = `/api`;

export const fetchClients = async () => {
    try {
        const {
            data
        } = await axios.get(`${url}/clients`);
        const modifiedData = data.map((clientData) => ({
            ID: clientData.id,
            Client: clientData.name,
            ExpDate: clientData.membership_valid,
            Status: null,
            Update: null,
            Delete: null
        }));
        return modifiedData;
    } catch (err) {}
}

export const fetchExpenses = async () => {
    try {
        const {
            data
        } = await axios.get(`${url}/expenses`);
        const modifiedData = data.map((expense) => ({
            id: expense.id,
            Expense: expense.name,
            Amount: expense.amount,
            Date: expense.date,
            Update: null,
            Delete: null
        }));
        return modifiedData;
    } catch (err) {}
}

export const fetchWorkouts = async () => {
    try {
        const {
            data
        } = await axios.get(`${url}/workouts`);
        const modifiedData = data.map((workout) => ({
            id: workout.id,
            Workout: workout.name,
            Link: workout.link,
            Date: workout.created_at,
            Update: null,
            Delete: null
        }));
        return modifiedData;
    } catch (err) {}
}

export const fetchAmount = async (fromDate, toDate) => {
    try {
        const {
            data
        } = await axios.get(`${url}/amount/${fromDate}/${toDate}`);
        let objArr = [];
        for (let i = 0; i < data.length; i += 1) {
            let index = checkIfValueExistsInObj(objArr, 'date', data[i].date);
            if (index || index === 0) {
                if (data[i].type === 'payment') {
                    objArr[index].payment += data[i].payments;
                } else if (data[i].type === 'expense') {
                    objArr[index].expense += data[i].payments;
                }
            } else {
                let obj;
                if (data[i].type === 'payment') {
                    obj = {
                        date: data[i].date,
                        type: data[i].type,
                        payment: data[i].payments,
                        expense: 0
                    }
                } else if (data[i].type === 'expense') {
                    obj = {
                        date: data[i].date,
                        type: data[i].type,
                        expense: data[i].payments,
                        payment: 0,
                    }
                }
                objArr[i] = obj;
            }
        }
        const modifiedData = objArr.map((data) => ({
            expenses: Number(data.expense),
            profit: Number(data.expense - data.payment),
            payments: Number(data.payment),
            date: data.date
        }));
        return modifiedData;
    } catch (err) {}
}

function checkIfValueExistsInObj(objArr, property, value) {
    let found = false;
    for (let i = 0; i < objArr.length; i++) {
        if (objArr[i][property] == value) {
            found = i;
            break;
        }
    }
    return found;
}