import "../styles/routes/Home.scss";
import { useRouter } from "next/router";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header/Header";
import FancyButton from "../components/FancyButton/FancyButton";

export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: { user: context.req.session.user },
  };
}

export default function Home({ user }) {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <div className="HomeWrapper">
      <Header currentItem="home" />
      <section className="HeroSection">
        <div className="HeroSection__left">
          <div className="HeroSection__top">
            <h1 className="HeroSection__top--title">
              <p>
                Grow you business,
                <span>we will take care</span> of all your your logistics
              </p>
            </h1>
            <div className="HeroSection__bottom">
              <FancyButton
                isLink={true}
                href="/app/warehouse"
                style={{ width: "180px" }}
              >
                Get Started
              </FancyButton>
            </div>
          </div>
        </div>
        <div className="HeroSection__right">
          <img className="HeroSection__right--heroImage" src="/Img/hero.svg" />
        </div>
      </section>
    </div>
  );
}
