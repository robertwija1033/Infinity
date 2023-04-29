import "./Spinner.css";

const Spinner = () => {
  return (
    <div class="container-spinner">
      <img src={`${process.env.PUBLIC_URL}/infinity.png`} />
    </div>
  );
};

export default Spinner;
