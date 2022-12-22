import { PROJECT, FORMAT } from '../../utils/constant';
import { put, takeEvery, call } from 'redux-saga/effects';
import { getAllProjects } from '../../services/userService';
import moment from 'moment';
function* getAllProjectStart(action) {
    try {
        let res = yield call(getAllProjects, action.payload);
        res.data = res.data.map((item) => {
            return {
                ...item,
                startDate: moment(item.startDate).format(FORMAT.FORMAR_DATE),
                endDate: moment(item.endDate).format(FORMAT.FORMAR_DATE),
                statusName: item.statusProjectData.value,
            };
        });
        yield put({ type: PROJECT.GET_ALL_PROJECT_SUCCESS, payload: res.data });
    } catch (e) {
        console.log(e.message);
    }
}
export default function* rootSaga() {
    yield takeEvery(PROJECT.GET_ALL_PROJECT_START, getAllProjectStart);
}
