const quotes = [
  { text: "The greatest wealth is health.", author: "Virgil" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "Happiness is the highest form of health.", author: "Dalai Lama" },
  { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
  { text: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit.", author: "Ralph Marston" },
];

const DailyQuote = () => {
  const today = new Date().getDay();
  const quote = quotes[today % quotes.length];

  return (
    <div className="rounded-2xl aura-gradient p-6 border border-border/50">
      <p className="font-display text-lg italic leading-relaxed text-foreground/90">
        "{quote.text}"
      </p>
      <p className="mt-3 text-sm text-muted-foreground">— {quote.author}</p>
    </div>
  );
};

export default DailyQuote;
