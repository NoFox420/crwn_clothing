import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

function Directory({ categories }) {
  return (
    <div className="directory-container">
      {/* mapping over array, passing over category and id as props*/}
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Directory;
