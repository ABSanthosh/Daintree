import Link from "next/link";
import "./Footer.scss";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <div className="FooterWrapper" id="contact">
      <div className="FooterWrapper__container">
        <div className="FooterWrapper__left">
          <Logo isBlack={false} isSmall={false} />

          <p className="FooterWrapper__left--copyrightUnderLogo">
            © 2022 Ace Jobs. All Rights Reserved
          </p>
        </div>

        <div className="FooterWrapper__right">
          <ul className="FooterWrapper__right--Service">
            <li className="FooterWrapper__right--rowHeading">Pages</li>
            <li>
              <Link href="/#" legacyBehavior>
                <a className="FooterWrapper__right--rowItem">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/" legacyBehavior>
                <a className="FooterWrapper__right--rowItem">Team</a>
              </Link>
            </li>
            <li>
              <Link href="/" legacyBehavior>
                <a className="FooterWrapper__right--rowItem">Jobs</a>
              </Link>
            </li>
            <li>
              <Link href="/" legacyBehavior>
                <a className="FooterWrapper__right--rowItem">Categories</a>
              </Link>
            </li>
          </ul>

          <ul className="FooterWrapper__right--Service">
            <li className="FooterWrapper__right--rowHeading">Social Media</li>
            <li className="FooterWrapper__right--RowIcon">
              {/* <img
                loading="lazy"
                className="FooterWrapper__right--RowIcon"
                src="/Img/instagram.svg"
              /> */}
              <a
                className="FooterWrapper__right--rowItem"
                href="https://instagram.com/acejobs.co.in?igshid=YmMyMTA2M2Y="
                target="_blank"
                referrerPolicy="no-referrer"
              >
                Instagram
              </a>
            </li>
            <li className="FooterWrapper__right--RowIcon">
              {/* <img
                loading="lazy"
                className="FooterWrapper__right--RowIcon"
                src="/Img/linkedin.svg"
              /> */}
              <a className="FooterWrapper__right--rowItem" href="/">
                LinkedIn
              </a>
            </li>
            <li className="FooterWrapper__right--RowIcon">
              {/* <img
                loading="lazy"
                className="FooterWrapper__right--RowIcon"
                src="/Img/facebook.svg"
              /> */}
              <a className="FooterWrapper__right--rowItem" href="/">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="FooterWrapper__left--Copyright">Ace Jobs copyright @2022</p>
    </div>
  );
}
