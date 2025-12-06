"use client";

const Marquee = () => {
    const separator = '\u00A0'.repeat(10);
    const message = `Instant Activation${separator}100% Uptime${separator}Secure Payment`;

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                <span>{message}{separator}</span>
                <span>{message}{separator}</span>
            </div>
        </div>
    );
};

export default Marquee;
