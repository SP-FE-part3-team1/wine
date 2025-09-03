import Header from "@/components/Header/Header";
import MyProfileCard from "../myprofile/_components/MyProfileCard";
import MyProfileReveiwCard from "./_components/MyProfileReviewCard";

const myprofile = () => {
  return (
    <div>
      <Header />
      <MyProfileCard
        profileURL="/assets/images/profile/profile.png"
        nickname="윤두준"
      />
      <MyProfileReveiwCard />
    </div>
  );
};

export default myprofile;
