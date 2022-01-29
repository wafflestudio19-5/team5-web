export const generateStar = (score: number) => {
  if (score > 0) {
    return (
      <div className="star-background">
        <div
          className="star-filled"
          style={{ width: `${score * 20}%`, backgroundSize: `${500 / score}%` }}
        />
      </div>
    );
  } else {
    return <div className="star-background" />;
  }
};

export default {};
