import * as React from "react";

interface NewUserRegistrationEmailTemplate {
  name: string;
  email: string;
  customerId: string;
}

export const NewUserRegistrationEmailTemplate: React.FC<
  Readonly<NewUserRegistrationEmailTemplate>
> = ({ name, email, customerId }) => (
  <div>
    <div>
      Hello {name}, Welcome to The Crown, this is to inform you that you are
      successfully registered as a new client in
      <a
        href={
          process.env.NODE_ENV === "production"
            ? "https://www.thecrownsociety.in/"
            : "http://localhost:3000/"
        }
        target="_blank"
      >
        The Crown Society
      </a>{" "}
      with the customer id as {customerId}
      Below are the login credentials, you will needing to access our website
      Email: {email}
      Password: Your name (First letter as capital) @ Your DOB (DDMM) Example:
      If your name is 'John' and DOB is '31/10/2002' then your password will be
      'John@3110'
      <ul>
        {/* 1. Add Investments procedure */}
        <li>
          We recommend you to please update all the funds added to your
          brokerage account in our website. Please follow the below instructions
          to add fund history in our website.
          <ol>
            <li>Login to the website using above credentials</li>
            <li>
              Press 'Profile' or 'Go to Profile' button, which will redirect you
              to your personal dashboard
            </li>
            <li>
              Scroll down to see investments table, where you can you see your
              investment/fund history associated with <b>The Crown</b> linked
              brokerage account, just above the investments table, you can see
              '+ Add Investment' button, press the 'add Investment' button to
              add a new investment/fund history.
            </li>
            <li>
              Note: Whenever you are making a transaction like adding funds into{" "}
              <b>The Crown</b> linked brokerage account, make sure to add the
              same transaction data into our website using the above process
            </li>
          </ol>
        </li>

        {/* 2. Raising Queries */}
        <li>
          In case, you are having any issues/queries you can use our "Help"
          feature which will send an query email to our support team which will
          be answered/resolved within 7 working days.
          <ol>
            <li>Login to the website using above credentials</li>
            <li>
              Press 'Help' button, which will redirect you to "contact Help"
            </li>
          </ol>
        </li>
      </ul>
    </div>
    <div>Message is: </div>
    <h3 className="mt-2">{customerId}</h3>
  </div>
);
