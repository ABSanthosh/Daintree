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
      <section className="AboutSection">
        <div className="AboutSection__content">
          <div className="AboutSection__content--left">
            <span>Why Daintree?</span>
            <h1>
              Why should you choose our services, here are the advantages we
              offer
            </h1>
            <p>
              We take great pride in offering the best shipping and
              transportation services available anywhere in the world. utilizing
              software for tracking. processing, and communications, along with
              our knowledgeable staff's decades of experience!
            </p>
            <div className="AboutSection__content--cta">
              <FancyButton
                noHover={true}
                style={{
                  backgroundColor: "#DB5159",
                  borderRadius: "2px",
                }}
              >
                Get a quote now!{" "}
              </FancyButton>
            </div>
          </div>
          <div className="AboutSection__content--right">
            <div className="AboutSection__content--rightCard">
              <div
                className="AboutSection__content--rightCardLeft dark"
                data-icon={String.fromCharCode(57761)}
              />
              <div className="AboutSection__content--rightCardRight">
                <h2>Safe Packing</h2>
                <p>Adhering to global standards</p>
              </div>
            </div>
            <div className="AboutSection__content--rightCard">
              <div
                className="AboutSection__content--rightCardLeft dark"
                data-icon={String.fromCharCode(58715)}
              />
              <div className="AboutSection__content--rightCardRight">
                <h2>Ship Everywhere</h2>
                <p>
                  Regulations are frequently congested in global supply chains
                </p>
              </div>
            </div>
            <div className="AboutSection__content--rightCard">
              <div
                className="AboutSection__content--rightCardLeft dark"
                data-icon={String.fromCharCode(57749)}
              />
              <div className="AboutSection__content--rightCardRight">
                <h2>Fastest Shipping</h2>
                <p>
                  International supply chains are subject to stringent
                  regulations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
