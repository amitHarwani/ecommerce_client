import BannerContainer from "../../../components/business/banner/container/BannerContainer";
import CategoryListContainer from "../../../components/business/categorylist/container/CategoryListContainer";
import CompanyGuranteeListContainer from "../../../components/business/companyguranteelist/container/CompanyGuranteeListContainer";
import ExploreProductListContainer from "../../../components/business/exploreproductlist/container/ExploreProductListContainer";
import FeaturedProductListContainer from "../../../components/business/featuredproductlist/container/FeaturedProductListContainer";

const HomePage = () => {
  return (
    <div className="px-2 py-4 lg:px-10">
      <BannerContainer />
      <div className="mt-20">
        <CategoryListContainer />
      </div>
      <div className="mt-20">
        <FeaturedProductListContainer />
      </div>
      <div className="mt-20">
        <ExploreProductListContainer />
      </div>
      <div className="mt-20">
        <CompanyGuranteeListContainer />
      </div>
    </div>
  );
};

export default HomePage;
