import { useEffect, useState } from 'react';
import { getAllCodeService } from '../../services/userService';

const useFetchAllcode = (type) => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        try {
            let fetchData = async () => {
                let arrData = await getAllCodeService(type);
                if (arrData && arrData.errCode === 0) {
                    arrData.data = arrData.data.map((item) => {
                        return {
                            label: item.value,
                            value: item.code,
                        };
                    });
                    setdata(arrData.data);
                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [type]);
    return { data };
};
export { useFetchAllcode };
