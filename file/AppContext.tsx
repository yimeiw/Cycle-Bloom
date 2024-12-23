import React, { createContext, useState, useContext } from 'react';

interface PredictionContextType {
    predictedMessageCycle: string | null;
    recommendationCycle: string | null;
    predictedMessageSymptoms: string | null;
    recommendationSymptoms: string | null;
    setPredictionData: (data: {
        predictedMessageCycle: string | null;
        recommendationCycle: string | null;
        predictedMessageSymptoms: string | null;
        recommendationSymptoms: string | null;
    }) => void;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

interface PredictionProviderProps {
    children: React.ReactNode;
}

export const PredictionProvider: React.FC<PredictionProviderProps> = ({ children }) => {
    const [predictedMessageCycle, setPredictedMessageCycle] = useState<string | null>(null);
    const [recommendationCycle, setRecommendationCycle] = useState<string | null>(null);
    const [predictedMessageSymptoms, setPredictedMessageSymptoms] = useState<string | null>(null);
    const [recommendationSymptoms, setRecommendationSymptoms] = useState<string | null>(null);

    const setPredictionData = (data: {
        predictedMessageCycle: string | null;
        recommendationCycle: string | null;
        predictedMessageSymptoms: string | null;
        recommendationSymptoms: string | null;
    }) => {
        setPredictedMessageCycle(data.predictedMessageCycle);
        setRecommendationCycle(data.recommendationCycle);
        setPredictedMessageSymptoms(data.predictedMessageSymptoms);
        setRecommendationSymptoms(data.recommendationSymptoms);
    };

    return (
        <PredictionContext.Provider value={{ predictedMessageCycle, recommendationCycle, predictedMessageSymptoms, recommendationSymptoms, setPredictionData }}>
            {children}
        </PredictionContext.Provider>
    );
};

export const usePrediction = (): PredictionContextType => {
    const context = useContext(PredictionContext);
    if (!context) {
        throw new Error('usePrediction must be used within a PredictionProvider');
    }
    return context;
};
