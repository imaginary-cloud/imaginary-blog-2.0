import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const data = req.body;

    // // Extract the fields from the data
    // const { type, workflowRunId, workflowId, result, metadata, credits } =
    //   data || {};

    console.log('DATA: ', data);

    res.status(200).json({ message: 'Copy received!' });
  } else {
    // If the request method is not POST, return a 405 'Method Not Allowed' status
    res.status(405).end();
  }
}
