import { useEffect, useState } from 'react';

const useFetchUserInfo = (type) => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        try {
            let fetchData = async () => {
                const userData = JSON.parse(localStorage.getItem('userData'));
                setdata(userData);
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [type]);
    return { data };
};
export { useFetchUserInfo };
