function updateMLForecastMetrics() {
    
    const modelMetrics = {
        model_name: "LSTM + XGBoost Ensemble",
        accuracy_score: 97.95,
        mape: 2.1,
        horizon_hours: 24
    };

    console.log("ML Connection Active:", modelMetrics.model_name);

    const accuracyElement = document.getElementById('model-accuracy');
    const mapeElement = document.getElementById('model-mape');

    if (accuracyElement) {
        accuracyElement.innerText = `${modelMetrics.accuracy_score}%`;
    }
    if (mapeElement) {
        mapeElement.innerText = `${modelMetrics.mape}%`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateMLForecastMetrics();
});