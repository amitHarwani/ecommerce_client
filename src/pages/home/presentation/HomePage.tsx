import BannerContainer from "../../../components/business/banner/container/BannerContainer";
import CategoryListContainer from "../../../components/business/categorylist/container/CategoryListContainer";

const HomePage = () => {
  return (
    <div className="px-2 py-4 lg:px-10">
      <BannerContainer />
      <div className="mt-16">
        <CategoryListContainer />
      </div>
    </div>
  );
};

export default HomePage;
