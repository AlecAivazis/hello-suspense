import React from "react";
import { useQuery } from "react-query";
import ShowInfo from "../components/ShowInfo";

export default function App() {
  const [variables, setVariables] = React.useState({ id: "U2hvdzoy" });
  const [loading, startTransition] = React.useTransition();

  return (
    <div className="flex flex-col items-center w-full gap-5">
      <div className="flex flex-row justify-center  gap-4">
        <button
          className="w-64 bg-sky-600"
          onClick={() => setVariables({ id: "U2hvdzoy" })}
        >
          load Better Call Saul
        </button>
        <button
          className="w-64 bg-sky-600"
          onClick={() => setVariables({ id: "U2hvdzox" })}
        >
          load Ozark
        </button>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <button
          className="w-64 bg-sky-600"
          onClick={() =>
            startTransition(() => setVariables({ id: "U2hvdzoy" }))
          }
        >
          transition Better Call Saul
        </button>
        <button
          className="w-64 bg-sky-600"
          onClick={() =>
            startTransition(() => setVariables({ id: "U2hvdzox" }))
          }
        >
          transition Ozark
        </button>
      </div>
      <div>pending transition: {JSON.stringify(loading)}</div>
      <React.Suspense fallback={"loading..."}>
        <Child variables={variables} />
      </React.Suspense>
    </div>
  );
}

function Child({ variables }) {
  const [buttonState, setButtonState] = React.useState(0);

  const { isLoading, error, data } = useQuery({
    queryKey: "showInfo" + variables.id,
    cacheTime: 0,
    queryFn: () =>
      fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
            show(id: "${variables.id}", delay: 3000) {
                name
                description
                billboard {
                    source
                }
            }
          }`,
        }),
      }).then((res) => res.json()),
    suspense: true,
  });

  return (
    <>
      <button onClick={() => setButtonState((s) => s + 1)} className="w-44">
        Click Me! {buttonState}
      </button>
      <ShowInfo show={data.data.show} />
    </>
  );
}
