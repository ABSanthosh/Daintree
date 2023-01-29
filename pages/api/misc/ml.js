// 34.131.53.208/predict

import Fetcher from "../../../utils/Fetcher";

export default async (req, res) => {
  const result = await Fetcher(
    `http://34.131.53.208/predict?${req.body.queryString}`,
    {
      method: "GET",
    }
  );
//   console.log(req.body.queryString);
  res.status(200).json({ status: 200, result });
};
