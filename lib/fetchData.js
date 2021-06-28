export default async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  return { data: data };
}

// import { useQuery, gql } from "@apollo/client";

// const Characters_data = (page) => gql`
// query {
//   characters(page:${page}) {
//     info{prev,next}
//     results {id,name,status,species,type,gender,origin{name},location{name},image}
//   }
// }
// `;

// function GetData(props) {
//   const page = props.page;
//   const { loading, error, data } = useQuery(Characters_data(page));
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;
//   return <p data={data}>data</p>;
// }
