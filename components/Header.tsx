import React, { useState, useEffect } from 'react';

const affirmations = [
    "Today is a new opportunity to be kind to myself.",
    "I am capable of handling today's challenges.",
    "My efforts are enough.",
    "I am worthy of rest and peace.",
    "I can make progress, one small step at a time.",
    "It's okay to not be perfect.",
    "I will celebrate my small victories today.",
    "I am resilient and can overcome setbacks.",
    "My unique perspective is a gift."
];

const Header: React.FC = () => {
    const [affirmation, setAffirmation] = useState('');

    useEffect(() => {
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / 86400000);
        setAffirmation(affirmations[dayOfYear % affirmations.length]);
    }, []);

    return (
        <header className="text-center p-6 bg-white shadow-md rounded-xl">
            <h1 className="text-4xl font-bold text-soft-purple-800 tracking-tight">My Reward Chart</h1>
            <p className="text-charcoal/70 mt-2 italic">"{affirmation}"</p>
        </header>
    );
};

export default Header;