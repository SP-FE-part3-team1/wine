import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import styles from "./Header.module.css";

type Props = {
  rightBox?: ReactNode;
};

function Header({ rightBox }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/assets/images/logo/white_log_md.svg"
              alt="헤더로고"
              width={52}
              height={12}
            />
          </Link>
        </div>
        <div className={styles.right}>{rightBox}</div>
      </div>
    </div>
  );
}

export default Header;
