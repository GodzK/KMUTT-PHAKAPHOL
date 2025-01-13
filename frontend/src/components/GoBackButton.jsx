const GoBackButton = ({ setCurrentPage }) => {
    return (
      <button
        className="go-back-button"
        onClick={() => setCurrentPage("menu")}
      >
        <a href="">Go Back</a>
      </button>
    );
  };
  
  export default GoBackButton;
  