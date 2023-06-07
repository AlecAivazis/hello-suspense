import React from "react";
import { useQuery } from "react-query";
import ShowInfo from "../components/ShowInfo";

export default function App() {
  const [variables, setVariables] = React.useState({ id: "U2hvdzoy" });

  return (
    <div className="flex flex-col align-center w-full gap-5">
      <div className="flex flex-row justify-center gap-4">
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
      <React.Suspense fallback={"loading..."}>
        <Child variables={variables} />
      </React.Suspense>
    </div>
  );
}

function Child({ variables }) {
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
            show(id: "${variables.id}", delay: 1000) {
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

  return <ShowInfo show={data.data.show} />;
}
