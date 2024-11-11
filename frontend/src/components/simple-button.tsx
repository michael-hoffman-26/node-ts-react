import React, { useState } from 'react';

// Define props for HealthStatus component
interface HealthStatusProps {
    status: string;
}

// Component to display the response
const HealthStatus: React.FC<HealthStatusProps> = ({ status }) => {
    return (
        <div>
            <h3>Health Status</h3>
            <p>{status}</p>
        </div>
    );
};

// Main component
const HealthCheckButton: React.FC = () => {
    const [status, setStatus] = useState<string | null>(null); // <-- Updated type

    // Function to handle button click and send the request
    const checkHealth = async () => {
        try {
            const response = await fetch('/api/health/check');
            const data = await response.json();
            setStatus(data.message || JSON.stringify(data));
        } catch (error) {
            setStatus('Error fetching health status'); // No error now, as 'status' can be a string
        }
    };

    return (
        <div>
            <button onClick={checkHealth}>Check Health</button>
            {status && <HealthStatus status={status} />}
        </div>
    );
};

export default HealthCheckButton;
