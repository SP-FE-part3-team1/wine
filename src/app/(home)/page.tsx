// const Home = () => {
//   return <div>Home Page</div>;
// };

// export default Home;

import Header from "@/components/Header/Header";
import Profile from "@/components/Profile/Profile";

const Home = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", gap: "16px" }}>
        <Profile
          src="/assets/images/profile/profile.png"
          size="lg"
          // onClick={() => console.log("Small clicked")}
        />
      </div>
    </div>
  );
};

export default Home;
