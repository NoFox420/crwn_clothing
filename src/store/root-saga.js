import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";

//ES6 GENERATOR FUNCTION, ability to "pause" functions
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}
