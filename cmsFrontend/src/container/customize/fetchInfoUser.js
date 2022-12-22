import { useEffect, useState } from 'react';
import { TYPE_LOGIN } from '../../utils/constant';
const useFetchUserInfo = (type) => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        try {
            let fetchData = async () => {
                const userData = JSON.parse(localStorage.getItem(TYPE_LOGIN.USER_DATA));
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
