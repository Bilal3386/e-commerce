import { Fragment } from "react";
import AvailableItem from "./components/Items/AvailableItem";

function App() {
  return (
    <Fragment>
      <section>
        <header>
          <h1>The Generics</h1>
        </header>
      </section>
      <main>
        <AvailableItem />
      </main>
      <section>
        <footer>
          <h1>The Generics</h1>
        </footer>
      </section>
    </Fragment>
  );
}

export default App;
