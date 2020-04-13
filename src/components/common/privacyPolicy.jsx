import React from "react";
import Logo from "./logo";

const PrivacyPolicy = () => {
  return (
    <React.Fragment>
      <div className="container-fluid bg-dark" style={{ paddingLeft: "60px" }}>
        <Logo />
      </div>
      <div
        className="container-fluid"
        style={{
          fontFamily: '"JS Flat", "Raleway, sans-serif"',
          fontSize: "1.1rem",
          overflow: "auto",
          height: "100vh",
        }}
      >
        <h1 className="display-4 text-center mt-5">Privacy Policy</h1>
        <p>
          <strong>Tabib Inc.</strong> built the Tabib app as an Open Source app.
          This SERVICE is provided by <strong>Tabib Inc.</strong> at no cost and
          is intended for use as is.
        </p>
        <p>
          This page is used to inform visitors regarding our policies with the
          collection, use, and disclosure of Personal Information if anyone
          decided to use our Service.
        </p>
        <p>
          If you choose to use our Service, then you agree to the collection and
          use of information in relation to this policy. The Personal
          Information that we collect is used for providing and improving the
          Service.
          <br />
          We will not use or share your information with anyone except as
          described in this Privacy Policy. The terms used in this Privacy
          Policy have the same meanings as in our Terms and Conditions, which is
          accessible at Tabib unless otherwise defined in this Privacy Policy.
        </p>
        <h3>Information Collection and Use</h3>
        For a better experience, while using our Service, we may require you to
        provide us with certain personally identifiable information, including
        but not limited to strongails, birthdates, phone numbers, images(needed
        when diagnosing illnesses), past disease history. The information that
        we request will be retained by us and used as described in this privacy
        policy. The app does use third party services that may collect
        information used to identify you. Link to privacy policy of third party
        service providers used by the app
        <a href="https://www.google.com/policies/privacy/">
          Google Play Services
        </a>
        <h3>Log Data</h3>
        <p>
          We want to inform you that whenever you use our Service, in a case of
          an error in the app we collect data and information (through third
          party products) on your phone called Log Data. This Log Data may
          include information such as your device Internet Protocol (“IP”)
          address, device name, operating syststrong version, the configuration
          of the app when utilizing our Service, the time and date of your use
          of the Service, and other statistics.
        </p>
        <h3>Cookies</h3>
        <p>
          Cookies are files with a small amount of data that are commonly used
          as anonymous unique identifiers. These are sent to your browser from
          the websites that you visit and are stored on your device's internal
          memory. This Service does not use these “cookies” explicitly. However,
          the app may use third party code and libraries that use “cookies” to
          collect information and improve their services. You have the option to
          either accept or refuse these cookies and know when a cookie is being
          sent to your device. If you choose to refuse our cookies, you may not
          be able to use some portions of this Service.
        </p>
        <h3>Service Providers</h3>
        <p>
          We may employ third-party companies and individuals due to the
          following reasons:
          <ul>
            <li> To facilitate our Service; </li>
            <li> To provide the Service on our</li>
            behalf;
            <li> To perform Service-related service; </li>
            <li> To assist us in analyzing how our Service is used. </li>
          </ul>
          <br />
          We want to inform users of this Service that these third parties have
          access to your Personal Information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for any other purpose.
        </p>
        <h3>Security</h3>
        <p>
          We value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security. **Links to Other Sites** This
          Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by us. Therefore, we strongly advise
          you to review the Privacy Policy of these websites.
          <br />
          We have no control over and assume no responsibility for the content,
          privacy policies, or practices of any third-party sites or services.
        </p>
        <br />
        <p>
          <h3>Children’s Privacy</h3>
          These Services do not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from children
          under 13
        </p>
        <p>
          In the case we discover that a child under 13 has provided us with
          personal information, we immediately delete this from our servers. If
          you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact us so that we
          will be able to do necessary actions.
        </p>
        <br />
        <h3>Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. We will
          notify you of any changes by posting the new Privacy Policy on this
          page. These changes are effective immediately after they are posted on
          this page.
        </p>
        <br />
        <h3>Contact Us</h3>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us at tabib.organization@gmail.com.
      </div>
    </React.Fragment>
  );
};

export default PrivacyPolicy;
