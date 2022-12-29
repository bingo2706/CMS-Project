import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';

const useFetchAllUser = (limit, offset, keyword, isDeleted) => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        try {
            let fetchData = async () => {
                let arrData = await getAllUsers({
                    limit: limit,
                    offset: offset,
                    keyword: keyword,
                    isDeleted: isDeleted,
                });
                if (arrData && arrData.errCode === 0) {
                    setdata(arrData.data);
                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [limit, offset, keyword, isDeleted]);
    return { data };
};
export { useFetchAllUser };
