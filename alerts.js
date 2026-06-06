function evaluateGridRules(telemetryData) {

    const alertsContainer = document.getElementById('tab-insights'); 
    
    if (!alertsContainer) {
        console.warn("Alerts container ('insightList') nahi mila!");
        return;
    }
    
    alertsContainer.innerHTML = ''; 

    telemetryData.substations.forEach(station => {
        let alertHTML = '';
        if (station.load_mw > 1100) {
            alertHTML = `
                <div class="insight-item critical" style="border-left: 4px solid #ff3366; background: rgba(255, 51, 102, 0.1); padding: 10px; margin-bottom: 10px; border-radius: 4px;">
                    <span style="color: #ff3366; font-weight: bold;">[CRITICAL OVERLOAD]</span> 
                    <strong>${station.name}</strong> is running heavy at <strong>${station.load_mw} MW</strong>.
                    <br><small style="color: #bbb;">AI Action: Initiate automated load-shedding or reroute via Corridor B2.</small>
                </div>`;
        } 
    
        else if (station.status === "Warning") {
            alertHTML = `
                <div class="insight-item warning" style="border-left: 4px solid #ffb020; background: rgba(255, 176, 32, 0.1); padding: 10px; margin-bottom: 10px; border-radius: 4px;">
                    <span style="color: #ffb020; font-weight: bold;">[GRID WARNING]</span> 
                    <strong>${station.name}</strong> telemetry showing fluctuations.
                    <br><small style="color: #bbb;">AI Action: Schedule preventive maintenance checks.</small>
                </div>`;
        }

        if (alertHTML !== '') {
            alertsContainer.innerHTML += alertHTML;
        }
    });

    if (alertsContainer.innerHTML === '') {
        alertsContainer.innerHTML = `
            <div style="color: #10b981; padding: 10px; text-align: center;">
                🟢 All Grid Corridors Nominal. SCADA Cyber Security - Active.
            </div>`;
    }
}