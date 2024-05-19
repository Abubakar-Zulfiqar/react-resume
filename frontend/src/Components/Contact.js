import React, { useState } from "react";
import $ from "jquery";
import { Fade, Slide } from "react-reveal";
import emailjs from "@emailjs/browser";

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (!data) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleEmail = (e) => {
    e.preventDefault();
    const emailParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    const serviceID = "service_ceucee9";
    const templateID = "template_v31qz1k";
    const userID = "WvqxTrO3nwMbCbQ_c";
    $("#image-loader").fadeIn();
    emailjs
      .send(serviceID, templateID, emailParams, userID)
      .then((res) => {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        $("#image-loader").fadeOut();
        $("#message-warning").hide();
        $("#contactForm").fadeOut();
        $("#message-success").fadeIn();
      })
      .catch((res) => {
        $("#image-loader").fadeOut();
        $("#message-warning").html("Email sending failed");
        $("#message-warning").fadeIn();
      });
  };

  const name = data.name;
  const street = data.address.street;
  const city = data.address.city;
  const state = data.address.state;
  const zip = data.address.zip;
  const phone = data.phone;
  const message = data.contactmessage;

  return (
    <section id="contact">
      <Fade bottom duration={1000}>
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{message}</p>
          </div>
        </div>
      </Fade>

      <div className="row">
        <Slide left duration={1000}>
          <div className="eight columns">
            <form
              method="post"
              id="contactForm"
              name="contactForm"
              onSubmit={handleEmail}
            >
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    size="35"
                    id="contactName"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    size="35"
                    id="contactEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    cols="50"
                    rows="15"
                    id="contactMessage"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div>
                  <button className="submit" type="submit">
                    Submit
                  </button>
                  <span id="image-loader">
                    <img alt="" src="images/loader.gif" />
                  </span>
                </div>
              </fieldset>
            </form>

            <div id="message-warning"> Error boy</div>
            <div id="message-success">
              <i className="fa fa-check"></i>Your message was sent, thank you!
              <br />
            </div>
          </div>
        </Slide>

        <Slide right duration={1000}>
          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Address and Phone</h4>
              <p className="address">
                {name}
                <br />
                {street} <br />
                {city}, {state} {zip}
                <br />
                <span>{phone}</span>
              </p>
            </div>

            <div className="widget widget_tweets">
              <h4 className="widget-title">Latest Tweets</h4>
              <ul id="twitter">
                <li>
                  <span>
                    Every great developer you know got there by solving problems
                    they were unqualified to solve until they actually did it.
                    {/*<a href="./">https://twitter.com/</a>*/}
                  </span>
                  <b>
                    <a href="./">2 Days Ago</a>
                  </b>
                </li>
                <li>
                  <span>
                    "Programmer: A machine that turns coffee into code."
                    {/*<a href="./">https://twitter.com/</a>*/}
                  </span>
                  <b>
                    <a href="./">3 Days Ago</a>
                  </b>
                </li>
              </ul>
            </div>
          </aside>
        </Slide>
      </div>
    </section>
  );
};

export default Contact;
