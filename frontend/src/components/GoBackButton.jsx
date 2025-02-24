const GoBackButton = ({ setCurrentPage }) => {
    return (
      <button
        className="go-back-button z-20"
        onClick={() => setCurrentPage("menu")}
      >
        <a href="">Go Back</a>
      </button>
    );
  };
  
  export default GoBackButton;
  