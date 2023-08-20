import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    //put instead of dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  //respond to categoriesStart
  //returns the latest action heard
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

//export from saga, holds sagas related to categories
export function* categoriesSaga() {
  //run everything inside and only complete if everything is done
  yield all([call(onFetchCategories)]);
}
