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
        <main className="HeroSection__main">
          <div className="HeroSection__main--top">
            <div className="HeroSection__main--header">
              <h1>Get ready for a wider</h1>
              <h1>expansion of your business</h1>
            </div>
            <p>Reach more market sectors for powerful business development.</p>
            <div className="HeroSection__main--cta">
              <FancyButton
                noHover={true}
                style={{
                  backgroundColor: "#DB5159",
                  borderRadius: "2px",
                }}
              >
                Start Now
              </FancyButton>
              <FancyButton
                // noHover={true}
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "2px",
                  color: "white",
                  borderColor: "white",
                }}
                invertButton={true}
              >
                Learn More
              </FancyButton>
            </div>
          </div>
          <div className="HeroSection__main--bottom">
            <div className="HeroSection__card">
              <img src="/Img/Icons/openBox.png" />
              <h3>Manage Warehouse</h3>
            </div>
            <div className="HeroSection__card">
              <img src="/Img/Icons/money.png" />
              <h3>Predict Freight Costs</h3>
            </div>
            <div className="HeroSection__card">
              <img src="/Img/Icons/quality.png" />
              <h3>Place Efficient Orders</h3>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
