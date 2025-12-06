
"use client";

const Marquee = () => {
    const message = "Instant Activation, 100% Uptime, Secure Payment";
    const spacedMessage = `${message} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${message} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 `;

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                <span>{spacedMessage}</span>
                <span>{spacedMessage}</span>
            </div>
        </div>
    );
};

export default Marquee;
