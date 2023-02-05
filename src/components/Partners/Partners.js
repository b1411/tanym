import Parse from "parse/dist/parse.min.js";
import {React, useState, useEffect} from "react";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import twopeoples from "./download.svg";


function Partners() {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const query = new Parse.Query("Partners");
        query.find().then((results) => {
            setPartners(results);
        });
    }, []);

    function PartnerCard(props) {
        return (
            <div className="partner-card">
                <div className="partner-card-tittle">
                    <div className="partner-card-logo">
                        <img src={props.logo}></img>
                    </div>
                    <h4>{props.tittle}</h4>
                </div>
                <div className="partner-card-description">{props.description}</div>
                <div className="partner-discount">-{props.discount}%</div>
            </div>
        );
    }

    return (
        <>
            <Navbar/>
            <div className={"container"}>
                <div className="partners-container">
                    {partners.map((partner, index) => (
                        <PartnerCard
                            key={index}
                            logo={partner.get("logo")?.url() ?? twopeoples}
                            tittle={partner.get("partnerName")}
                            description={partner.get("shortDescription")}
                            discount={partner.get("discount")}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Partners;
