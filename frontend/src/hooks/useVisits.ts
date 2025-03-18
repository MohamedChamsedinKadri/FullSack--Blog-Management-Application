import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { visitsAtom } from '../context/VisitContext';

export const useVisits = () => {
    const [visits, setVisits] = useAtom(visitsAtom);

    const clearVisits = () => {
        setVisits([]);
    };

    return { visits, setVisits, clearVisits };
};

export const useTrackVisit = (postId: string) => {
    const setVisits = useSetAtom(visitsAtom);

    useEffect(() => {
        if (postId) {
            setVisits(prevVisits => {
                if (prevVisits.includes(postId)) {
                    return prevVisits;
                }
                return [...prevVisits, postId];
            });
        }
    }, [postId, setVisits]);
};

