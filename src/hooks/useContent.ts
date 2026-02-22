import { useState, useEffect } from 'react';

export function useContent() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                setContent(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching content:', err);
                setLoading(false);
            });
    }, []);

    return { content, loading };
}
