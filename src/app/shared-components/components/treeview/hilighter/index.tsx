import React from 'react';

interface HighlighterProps {
  text: string;
  search: string;
}

const Highlighter: React.FC<HighlighterProps> = ({ text, search }) => {
  if (!search || search.trim() === '') {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${search})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index}>{part}</mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export default React.memo(Highlighter);
