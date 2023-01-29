import { useEffect, useState } from "react";
import MenuPane from "../../components/MenuPane/MenuPane";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../styles/routes/App/orders.scss";
import FancyButton from "../../components/FancyButton/FancyButton";
import { customAlphabet } from "nanoid";
import { fetchBusinesses, fetchOrders } from "../../dbService/order.db";
import Select from "react-select";
import Fetcher from "../../utils/Fetcher";
import SkuOrderInput from "../../components/SKU/SkuOrderInput/SkuOrderInput";
import { Cashify } from "../../utils/Cashify";
import Countries from "../../utils/countries.json";

export async function getServerSideProps(context) {
  if (context.req.session.user === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const businesses = await fetchBusinesses();
  const orders = await fetchOrders(context.req.session.user.sub);

  return {
    props: {
      user: context.req.session.user,
      businesses: JSON.parse(JSON.stringify(businesses)),
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

export default function Orders({ user, businesses, orders }) {
  const nanoid = customAlphabet("1234567890abcdef", 7);

  const [isOrderPaneOpen, setIsOrderPaneOpen] = useState(false);

  const [localBusinesses, setLocalBusinesses] = useState(businesses);

  const [fromBusinessWarehouse, setFromBusinessWarehouse] = useState([]);
  const [toBusinessWarehouse, setToBusinessWarehouse] = useState([]);
  const [fromBusinessProducts, setFromBusinessProducts] = useState([]);
  const [fromTempBusinessProducts, setFromTempBusinessProducts] = useState([]);

  const [fetchedQuote, setFetchedQuote] = useState(null);

  const [newOrderDetails, setNewOrderDetails] = useState({
    id: "",
    description: "",
    fromBusiness: "",
    toBusiness: "",
    selectedProducts: [],
    predictedPrice: 0,
  });

  const [ordersList, setOrdersList] = useState(orders);
  console.log(orders);
  useEffect(() => {
    if (isOrderPaneOpen) {
      setNewOrderDetails({
        id: nanoid(),
        description: "",
        fromBusiness: "",
        toBusiness: "",
        selectedProducts: [],
        predictedPrice: 0,
      });
    }
  }, [isOrderPaneOpen]);

  return (
    <div className="OrdersPage">
      <div className="OrdersPage__header">
        <h1>Orders</h1>
        <ul className="OrdersPage__list">
          <li className="OrdersPage__list--item">
            <button>Overview</button>
          </li>
          <li className="OrdersPage__list--item">
            <button onClick={() => setIsOrderPaneOpen(true)}>
              Place Order
            </button>
          </li>
        </ul>
      </div>
      <div className="OrdersPage__body">
        {ordersList.map((order, index) => (
          <div
            key={index}
            className={`OrdersPage__OrderCard OrdersPage__OrderCard--${order.orderStatus}`}
          >
            <h2>Order #{order.id}</h2>
            <div className="OrdersPage__OrderCard--content">
              <p>{order.description}</p>
              <div className="OrdersPage__OrderCard--row">
                <span>{order.fromBusiness}</span>
                <hr />
                <span>{order.toBusiness}</span>
              </div>
              <div className="OrdersPage__OrderCard--row">
                <g>
                  {order.predictedPrice ? Cashify(order.predictedPrice) : "--"}
                </g>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MenuPane
        isOpen={isOrderPaneOpen}
        setIsOpen={setIsOrderPaneOpen}
        style={{
          width: "440px",
        }}
      >
        <div className="OrderPane">
          <h1>Order {newOrderDetails.id}</h1>
          <div className="OrderPane__content">
            <div className="OrderPane__row">
              <label data-mandatory htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={newOrderDetails.description}
                onChange={(e) =>
                  setNewOrderDetails({
                    ...newOrderDetails,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="OrderPane__row">
              <label data-mandatory htmlFor="fromBusiness">
                From Business
              </label>
              <div className="OrderPane__column">
                <Select
                  id="fromBusiness"
                  options={localBusinesses.map((business) => {
                    return {
                      ...business,
                      value: business.sub,
                      label: business.name,
                    };
                  })}
                  onChange={(e) => {
                    setNewOrderDetails({
                      ...newOrderDetails,
                      fromBusiness: e.value,
                    });
                    setFromBusinessWarehouse(
                      localBusinesses.find(
                        (business) => business.sub === e.value
                      ).Warehouse
                    );
                  }}
                />
                <Select
                  id="fromBusinessWarehouse"
                  options={fromBusinessWarehouse.map((warehouse) => {
                    return {
                      ...warehouse,
                      value: warehouse.id,
                      label: warehouse.name,
                    };
                  })}
                  onChange={async (e) => {
                    setNewOrderDetails({
                      ...newOrderDetails,
                      fromBusinessWarehouse: e.value,
                    });
                    await Fetcher("/api/order/fetch-warehouse-items", {
                      method: "POST",
                      body: { warehouseId: e.value },
                    }).then((res) => {
                      if (res.status === 200) {
                        setFromBusinessProducts(res.warehouse);
                        setFromTempBusinessProducts(res.warehouse);
                      }
                    });
                  }}
                />
              </div>
            </div>
            <div className="OrderPane__row">
              <label data-mandatory htmlFor="toBusiness">
                To Business
              </label>
              <div className="OrderPane__column">
                <Select
                  id="toBusiness"
                  options={localBusinesses
                    .filter(
                      (business) =>
                        business.sub !== newOrderDetails.fromBusiness
                    )
                    .map((business) => {
                      return {
                        ...business,
                        value: business.sub,
                        label: business.name,
                      };
                    })}
                  onChange={(e) => {
                    setNewOrderDetails({
                      ...newOrderDetails,
                      toBusiness: e.value,
                    });

                    setToBusinessWarehouse(
                      localBusinesses.find(
                        (business) => business.sub === e.value
                      ).Warehouse
                    );
                  }}
                />
                <Select
                  id="toBusinessWarehouse"
                  options={toBusinessWarehouse.map((warehouse) => {
                    return {
                      ...warehouse,
                      value: warehouse.id,
                      label: warehouse.name,
                    };
                  })}
                  onChange={(e) =>
                    setNewOrderDetails({
                      ...newOrderDetails,
                      toBusinessWarehouse: e.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="OrderPane__row">
              <Select
                id="fromBusinessProducts"
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "100%",
                  }),
                }}
                options={fromTempBusinessProducts.map((product) => {
                  return {
                    ...product,
                    value: product.id,
                    label: product.name,
                  };
                })}
                onChange={(e) => {
                  setNewOrderDetails({
                    ...newOrderDetails,
                    selectedProducts: [
                      ...newOrderDetails.selectedProducts,
                      {
                        ...fromBusinessProducts.find(
                          (product) => product.id === e.value
                        ),
                        maxQuantity: e.quantity,
                        quantity: 0,
                      },
                    ],
                  });
                  setFromTempBusinessProducts(
                    fromTempBusinessProducts.filter(
                      (product) => product.id !== e.value
                    )
                  );
                }}
              />

              {newOrderDetails.selectedProducts.map((product, key) => (
                <SkuOrderInput
                  sku={product}
                  key={key}
                  onRemove={(sku) => {
                    setNewOrderDetails({
                      ...newOrderDetails,
                      selectedProducts: newOrderDetails.selectedProducts.filter(
                        (product) => product.id !== sku
                      ),
                    });
                    setFromTempBusinessProducts([
                      ...fromTempBusinessProducts,
                      fromBusinessProducts.find(
                        (product) => product.id === sku
                      ),
                    ]);
                  }}
                  onChange={(sku) => {
                    setNewOrderDetails({
                      ...newOrderDetails,
                      selectedProducts: newOrderDetails.selectedProducts.map(
                        (product) => {
                          if (product.id === sku.id) {
                            return sku;
                          }
                          return product;
                        }
                      ),
                    });
                  }}
                />
              ))}
            </div>
          </div>
          <div className="OrderPane__bottom">
            {/* {fetchedPrice && ( */}
            <div
              className="OrderPane__row"
              style={{
                alignItems: "flex-end",
              }}
            >
              <div className="OrderPane__column">
                <div className="OrderPane__row">
                  <label htmlFor="total">Total</label>
                  <h2>{fetchedQuote ? Cashify(fetchedQuote.cost) : "--"}</h2>
                </div>

                <div className="OrderPane__row">
                  <label htmlFor="total">Distance</label>
                  <h2>
                    {fetchedQuote
                      ? Math.round(
                          (fetchedQuote.distance / 1000 + Number.EPSILON) * 100
                        ) / 100
                      : "--"}
                    {" km"}
                  </h2>
                </div>
              </div>

              <div className="OrderPane__row">
                <FancyButton
                  style={{
                    width: "100%",
                  }}
                  disabled={
                    newOrderDetails.selectedProducts.length === 0 ||
                    !newOrderDetails.fromBusinessWarehouse ||
                    !newOrderDetails.toBusinessWarehouse
                  }
                  onClick={async () => {
                    const fromCountry = fromBusinessWarehouse.find(
                      (warehouse) =>
                        warehouse.id === newOrderDetails.fromBusinessWarehouse
                    ).country;
                    const toCountry = toBusinessWarehouse.find(
                      (warehouse) =>
                        warehouse.id === newOrderDetails.toBusinessWarehouse
                    ).country;
                    const quoteData = {
                      origin: [
                        Countries[fromCountry].lat,
                        Countries[fromCountry].lng,
                      ],
                      destination: [
                        Countries[toCountry].lat,
                        Countries[toCountry].lng,
                      ],
                      noOfUnits: newOrderDetails.selectedProducts.reduce(
                        (acc, curr) => {
                          return acc + curr.quantity;
                        },
                        0
                      ),
                      volume: newOrderDetails.selectedProducts.length * 10,
                    };

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
            {/* )} */}
            <FancyButton
              style={{
                width: "100%",
              }}
              onClick={async () => {
                await Fetcher("/api/order/place-order", {
                  method: "POST",
                  body: {
                    data: {
                      ...newOrderDetails,
                      userId: user.sub,
                      predictedPrice: fetchedQuote.cost,
                    },
                    id: user.sub,
                  },
                }).then((res) => {
                  if (res.status === 200) {
                    setNewOrderDetails({
                      description: "",
                      fromBusiness: "",
                      fromBusinessWarehouse: "",
                      toBusiness: "",
                      toBusinessWarehouse: "",
                      selectedProducts: [],
                      predictedPrice: 0,
                    });
                    setFromBusinessWarehouse([]);
                    setToBusinessWarehouse([]);
                    setFromBusinessProducts([]);
                    setFromTempBusinessProducts([]);

                    setOrdersList([...res.orders]);
                    setIsOrderPaneOpen(false);
                    setFetchedQuote(null);
                  }
                });
              }}
              disabled={
                newOrderDetails.selectedProducts.length === 0 ||
                fetchedQuote === null
              }
            >
              Place Order
            </FancyButton>
          </div>
        </div>
      </MenuPane>
    </div>
  );
}

Orders.getLayout = function getLayout(page) {
  return (
    <div className="Layout">
      <Sidebar activePage={3} />
      {page}
    </div>
  );
};
