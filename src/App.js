import React, { useCallback, useState, Profiler, Suspense } from "react";
import List from "./list";
import "./style.css";
//After Optimization
const App = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ]);
  const updateItems = useCallback(() => {
    setItems([
      ...items,
      { id: items.length + 1, name: `Item ${items.length + 1}` },
    ]);
  }, [items]);

  const [showHeavy, setShowHeavy] = useState(false);

  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const toggleHeavyComponent = useCallback(
    () => setShowHeavy((prev) => !prev),
    []
  );

  const onRenderCallback = (id, phase, actualDuration) => {
    console.log(
      `Component: ${id}, Phase: ${phase}, Render time: ${actualDuration}ms`
    );
  };
  const Component = React.lazy(() => import("./component"));

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <div className="app-container">
        <h1 className="title">React Performance Optimization</h1>
        <button className="button" onClick={increment}>
          Increment Count: {count}
        </button>
        <List items={items} />
        <button className="button" onClick={updateItems}>
          Add Item
        </button>

        <button className="button" onClick={toggleHeavyComponent}>
          Toggle Heavy Component
        </button>
        <Suspense fallback={<div>Loading...</div>}>
          {showHeavy && <Component />}
        </Suspense>
      </div>
    </Profiler>
  );
};

/*   BEFORE OPTIMIZATION
const HeavyComponent = () => {
  console.log("🔴 Heavy Component Loaded (Before Optimization)");
  return <div className="heavy-component">Heavy Component Loaded</div>;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ]);
  const updateItems = useCallback(() => {
    setItems([
      ...items,
      { id: items.length + 1, name: `Item ${items.length + 1}` },
    ]);
  }, [items]);
  const [showHeavy, setShowHeavy] = useState(false);

  const onRenderCallback = (id, phase, actualDuration) => {
    console.log(
      `🔴 ${id} - ${phase} - Render time: ${actualDuration}ms (Before Optimization)`
    );
  };

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <div className="app-container">
        <h1 className="title">React Performance Optimization</h1>
        <button className="button" onClick={() => setCount(count + 1)}>
          Increment Count: {count}
        </button>
        <List items={items} />
        <button className="button" onClick={updateItems}>
          Add Item
        </button>
        <button className="button" onClick={() => setShowHeavy(!showHeavy)}>
          Toggle Heavy Component
        </button>
        <Suspense fallback={<div>Loading...</div>}>
          {showHeavy && <HeavyComponent />}
        </Suspense>
      </div>
    </Profiler>
  );
};
*/
export default App;
