import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import fetch from "node-fetch";

export default function formHandler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ message: "Form data missing." });
  } else {
    const body = {
      template_params: {
        name,
        email,
        phone,
        message,
      },
      user_id: process.env.EMAILJS_USER_ID,
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      accessToken: process.env.EMAILJS_ACCESS_TOKEN,
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((message) => res.status(200).json({ message }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }
}
