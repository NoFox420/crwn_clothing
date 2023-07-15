import { createSelector } from "reselect";

//selecting from redux store
const selectCategoryReducer = (state) => state.categories;

//selecting array
export const selectCategories = createSelector(
  //input selector from redux
  [selectCategoryReducer],
  //output selector
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
