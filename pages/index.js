import "../styles/routes/Home.scss";
import { useRouter } from "next/router";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header/Header";
import FancyButton from "../components/FancyButton/FancyButton";
import Select from "react-select";
import FancyInput from "../components/FancyInput/FancyInput";
import { useState } from "react";

import Countries from "../utils/countries.json";
import Fetcher from "../utils/Fetcher";
import { Cashify } from "../utils/Cashify";

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

  const [quoteData, setQuoteData] = useState({
    origin: "",
    destination: "",
    noOfUnits: 0,
    volume: 0,
  });

  const [fetchedQuote, setFetchedQuote] = useState(null);

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
      <section className="QuoteSection">
        <div className="QuoteSection__content">
          <div className="QuoteSection__content--left">
            <div className="QuoteBox">
              <div className="QuoteBox__row">
                <label data-mandatory htmlFor="fromBusiness">
                  From Business
                </label>
                <Select
                  id="fromBusiness"
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                    }),
                  }}
                  options={Object.keys(Countries).map((country) => {
                    return {
                      value: country,
                      label: country.replaceAll("_", " "),
                    };
                  })}
                  onChange={(e) => {
                    setQuoteData({
                      ...quoteData,
                      origin: [Countries[e.value].lat, Countries[e.value].lng],
                    });
                  }}
                />
              </div>
              <div className="QuoteBox__row">
                <label data-mandatory htmlFor="toBusiness">
                  To Business
                </label>
                <Select
                  id="toBusiness"
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                    }),
                  }}
                  options={Object.keys(Countries).map((country) => {
                    return {
                      value: country,
                      label: country.replaceAll("_", " "),
                    };
                  })}
                  onChange={(e) => {
                    setQuoteData({
                      ...quoteData,
                      destination: [
                        Countries[e.value].lat,
                        Countries[e.value].lng,
                      ],
                    });
                  }}
                />
              </div>
              <div className="QuoteBox__row">
                <label data-mandatory htmlFor="toBusiness">
                  No. Of Units
                </label>
                <FancyInput
                  onChange={(e) => {
                    setQuoteData({
                      ...quoteData,
                      noOfUnits: e,
                    });
                  }}
                  placeholder="Quantity"
                  type="number"
                />
              </div>
              <div className="QuoteBox__row">
                <label data-mandatory htmlFor="toBusiness">
                  Volume per unit
                </label>
                <FancyInput
                  onChange={(e) => {
                    setQuoteData({
                      ...quoteData,
                      volume: e,
                    });
                  }}
                  placeholder="Volume"
                  type="number"
                />
              </div>
              {fetchedQuote && (
                <div className="QuoteBox__column">
                  <div className="QuoteBox__row">
                    <label>Distance</label>
                    <h2>
                      {Math.round(
                        (fetchedQuote.distance / 1000 + Number.EPSILON) * 100
                      ) / 100}km
                    </h2>
                  </div>
                  <div className="QuoteBox__row">
                    <label>Cost</label>
                    <h2>{Cashify(fetchedQuote.cost)}</h2>
                  </div>
                </div>
              )}
              <div className="QuoteBox__bottom">
                <FancyButton
                  style={{
                    width: "100%",
                  }}
                  onClick={async () => {
                    console.log(quoteData);
                    await Fetcher(
                      `http://34.131.53.208/predict?quantity=${quoteData.noOfUnits}&volume=${quoteData.volume}&lat1=${quoteData.origin[0]}&lng1=${quoteData.origin[1]}&lat2=${quoteData.destination[0]}&lng2=${quoteData.destination[1]}`,
                      {
                        method: "GET",
                      }
                    ).then((res) => {
                      setFetchedQuote({
                        cost: res.freight_cost,
                        distance: res.distance,
                      });
                    });
                  }}
                >
                  Get a quote now!
                </FancyButton>
              </div>
            </div>
          </div>
          <div className="QuoteSection__content--right">
            <span>How it works</span>
            <h1>
              Simple and easy to <br />
              get a quote!
            </h1>
            <div className="QuoteSection__content--rightCard">
              <div className="QuoteSection__content--rightCardLeft dark">
                01
              </div>
              <div className="QuoteSection__content--rightCardRight">
                <h2>Select a country to ship from</h2>
                <p>
                  You can set up your warehouse in this country and ship from
                  there
                </p>
              </div>
            </div>
            <div className="QuoteSection__content--rightCard">
              <div className="QuoteSection__content--rightCardLeft dark">
                02
              </div>
              <div className="QuoteSection__content--rightCardRight">
                <h2>Select a country to ship to</h2>
                <p>
                  You can ship to your own warehouse or to your business
                  partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
