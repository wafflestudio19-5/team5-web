export const generateStar = (score: number) => {
  return (
    <div className="star-background">
      <div className="star-filled" style={{ width: `${score * 20}%` }} />
    </div>
  );
};

export default {};
