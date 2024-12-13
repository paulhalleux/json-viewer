import { JsonViewer } from "./components";

const test = {
  username: "test",
  password: "test",
  age: 20,
  isStudent: true,
  isTeacher: false,
  isDeveloper: null,
  friends: ["Alice", "Bob", "Charlie"],
  address: {
    city: "New York",
    country: "USA",
  },
  houses: [
    {
      address: {
        city: "Los Angeles",
        country: "USA",
      },
      dimensions: {
        width: 10,
        height: 20,
      },
    },
    {
      address: {
        city: "San Francisco",
        country: "USA",
      },
      dimensions: {
        width: 15,
        height: 25,
      },
    },
  ],
};

export function App() {
  return (
    <div>
      <JsonViewer json={JSON.stringify(test, null, 2)} />
    </div>
  );
}
