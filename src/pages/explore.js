import ExploreUI from "@/components/ExploreUI";

export default function Explore({ list }) {
  return <ExploreUI list={list} />;
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:5001/todo-list");

  if (response.ok) {
    const list = await response.json();
    return {
      props: {
        list,
      },
    };
  }
  return {
    props: {},
  };
};
