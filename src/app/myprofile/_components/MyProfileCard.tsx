import Profile from "@/components/Profile/Profile";
import styles from "./MyProfileCard.module.css";
import Button from "@/components/Button/Button";
import font from "@/app/fonts.module.css";
import CustomInput from "@/components/Input/CustomInput";

type Props = {
  profileURL: string;
  nickname: string;
};

function MyProfileCard({ profileURL, nickname }: Props) {
  return (
    <section className={styles.myprofileCard}>
      <div className={styles.myprofile}>
        <Profile src={profileURL} size="sm" />
        <h1 className={`${styles.nickname} ${font["text-xl-semibold"]}`}>
          {nickname}
        </h1>
      </div>
      <div className={styles.inputRow}>
        <div className={styles.changeNickname}>
          <h4 className={`${styles.nickName} ${font["text-md-medium"]}`}>
            닉네임
          </h4>
          <div className={styles.field}>
            <CustomInput
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              // handleChange={handleChange}
              error={false} // 에러 여부
            />
          </div>
        </div>
        <div className={styles.changeBtn}>
          <Button
            variant="primary"
            radius={12}
            className={font["text-md-semibold"]}
            style={{ width: "8.9rem", height: "4.2rem" }}
          >
            변경하기
          </Button>
        </div>
      </div>
    </section>
  );
}
export default MyProfileCard;
