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
