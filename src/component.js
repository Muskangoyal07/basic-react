import "./style.css";

const Component = () => {
  console.log("Rendering Heavy Component(After Optimization)");
  return (
    <div className="heavy-component">
      <h2>Heavy Component Loaded</h2>
      <p>This component is loaded dynamically using React.lazy and Suspense.</p>
    </div>
  );
};

export default Component;
