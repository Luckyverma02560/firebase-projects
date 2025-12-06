
"use client";

const Marquee = () => {
    const separator = '\u00A0'.repeat(10);
    const message = `Instant Activation${separator}100% Uptime${separator}Secure Payment`;
    const spacedMessage = `${message}${separator}${message}${separator}`;

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
