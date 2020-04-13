import React from "react";
import Logo from "./logo";

const Terms = () => {
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
        <h1 className="display-4 text-center mt-5">Terms & Conditions</h1>
        <p>
          By downloading(mobile app) or using the app/
          <a href="https://tabib.netlify.com/">
            <em>Tabib website</em>
          </a>
          , these terms will automatically apply to you – you should make sure
          therefore that you read them carefully before using the app/website.
          You’re not allowed to copy, or modify the app/website, any part of the
          app/website, or our trademarks in any way. You’re not allowed to
          attempt to extract the source code of the app/website, and you also
          shouldn’t try to translate the app/website into other languages, or
          make derivative versions. The app/website itself, and all the trade
          marks, copyright, database rights and other intellectual property
          rights related to it, still belong to{" "}
          <strong>
            <a href="https://tabib.netlify.com/">Tabib Inc.</a>
          </strong>
          .
        </p>
        <p>
          <strong>
            <a href="https://tabib.netlify.com/">Tabib Inc.</a>
          </strong>{" "}
          is committed to ensuring that the app/website is as useful and
          efficient as possible. For that reason, we reserve the right to make
          changes to the app/website or to charge for its services, at any time
          and for any reason. We will never charge you for the app/website or
          its services without making it very clear to you exactly what you’re
          paying for.
        </p>
        <p>
          The Tabib app/website stores and processes personal data that you have
          provided to us, in order to provide our Service. It’s your
          responsibility to keep your phone and access to the app/website
          secure. We therefore recommend that you do not jailbreak or root your
          phone, which is the process of removing software restrictions and
          limitations imposed by the official operating system of your device.
          It could make your phone vulnerable to malware/viruses/malicious
          programs, compromise your phone’s security features and it could mean
          that the Tabib app/website won’t work properly or at all.
        </p>
        The mobile app does use third party services that declare their own
        Terms and Conditions. Link to Terms and Conditions of third party
        service providers used by the app
        <a href="https:\/\/policies.google.com\/terms">Google Play Services</a>
        <p>
          You should be aware that there are certain things that{" "}
          <strong>
            <a href="https://tabib.netlify.com/">Tabib Inc.</a>
          </strong>{" "}
          will not take responsibility for. Certain functions of the app will
          require the app to have an active internet connection. The connection
          can be Wi-Fi, or provided by your mobile network provider, but{" "}
          <strong>
            <a href="https://tabib.netlify.com/">Tabib Inc.</a>
          </strong>{" "}
          cannot take responsibility for the app not working at full
          functionality if you don’t have access to Wi-Fi, and you don’t have
          any of your data allowance left.
        </p>
        <br />
        <p>
          If you’re using the app outside of an area with Wi-Fi, you should
          remember that your terms of the agreement with your mobile network
          provider will still apply. As a result, you may be charged by your
          mobile provider for the cost of data for the duration of the
          connection while accessing the app, or other third party charges. In
          using the app, you’re accepting responsibility for any such charges,
          including roaming data charges if you use the app outside of your home
          territory (i.e. region or country) without turning off data roaming.
          If you are not the bill payer for the device on which you’re using the
          app, please be aware that we assume that you have received permission
          from the bill payer for using the app.
        </p>
        Along the same lines,{" "}
        <strong>
          <a href="https://tabib.netlify.com/">Tabib Inc.</a>
        </strong>{" "}
        cannot always take responsibility for the way you use the app i.e. You
        need to make sure that your device stays charged – if it runs out of
        battery and you can’t turn it on to avail the Service,{" "}
        <strong>
          <a href="https://tabib.netlify.com/">Tabib Inc.</a>
        </strong>{" "}
        cannot accept responsibility.
        <p>
          With respect to{" "}
          <strong>
            <a href="https://tabib.netlify.com/">Tabib Inc.</a>
          </strong>
          ’s responsibility for your use of the app/website, when you’re using
          the app/website, it’s important to bear in mind that although we
          endeavour to ensure that it is updated and correct at all times, we do
          rely on third parties to provide information to us so that we can make
          it available to you.{" "}
          <strong>
            <a href="https://tabib.netlify.com/">Tabib Inc.</a>
          </strong>{" "}
          accepts no liability for any loss, direct or indirect, you experience
          as a result of relying wholly on this functionality of the
          app/website.
          <br />
          At some point, we may wish to update the app. The app is currently
          available on Android & iOS – the requirements for both systems (and
          for any additional systems we decide to extend the availability of the
          app to) may change, and you’ll need to download the updates if you
          want to keep using the app.{" "}
          <strong>
            <a href="https://tabib.netlify.com/">Tabib Inc.</a>
          </strong>{" "}
          does not promise that it will always update the app so that it is
          relevant to you and/or works with the Android & iOS version that you
          have installed on your device. However, you promise to always accept
          updates to the application when offered to you, We may also wish to
          stop providing the app, and may terminate use of it at any time
          without giving notice of termination to you. Unless we tell you
          otherwise, upon any termination, (a) the rights and licenses granted
          to you in these terms will end; (b) you must stop using the
          app/website, and (if needed) delete it from your device.
        </p>
        <p>
          Changes to This Terms and Conditions We may update our Terms and
          Conditions from time to time. Thus, you are advised to review this
          page periodically for any changes. We will notify you of any changes
          by posting the new Terms and Conditions on this page. These changes
          are effective immediately after they are posted on this page. Contact
          Us If you have any questions or suggestions about our Terms and
          Conditions, do not hesitate to contact us at
          tabib.organization@gmail.com.
        </p>
      </div>
    </React.Fragment>
  );
};

export default Terms;
