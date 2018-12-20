import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

require("dotenv").config();

export class Paypal extends Component {
  render() {
    const onSuccess = payment => {
        this.props.onSuccess(payment)
    };
    /* 
    { //console.log(JSON.stringify(payment)); on success response
        "paid":true,"cancelled":false,"payerID":"S9EBJS9KLEWF6","paymentID":"PAY-5SG29573N9985824PLQL7OTY","paymentToken":"EC-9NW10262DV585954E","returnUrl":"https://www.sandbox.paypal.com/?paymentId=PAY-5SG29573N9985824PLQL7OTY&token=EC-9NW10262DV585954E&PayerID=S9EBJS9KLEWF6","address":{"recipient_name":"test buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"email":"khangalt1-buyer@yahoo.com"
    }
    */

    const onCancel = data => {
      console.log(JSON.stringify(data));
    };
    const onError = err => {
      console.log(JSON.stringify(err));
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox:
        process.env.PAYPAL_CLIENT ||
        "AaFI6PbFrlwuBI1qdLQvdE3gBpiV_6lmi5cMPLmNrknC52Q9de9x-Hj1kEygXN2XtzaLOo1rTl9GhBuS",

      production: ""
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "black",
            shape: "rect",
            label: "checkout"
          }}
        />
      </div>
    );
  }
}

export default Paypal;
