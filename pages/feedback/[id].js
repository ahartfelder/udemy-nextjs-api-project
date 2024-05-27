import { extractFileData, getFilePath } from "../api/feedback";

export default function FeedbackDetailsPage(props) {
  const { feedback, email } = props.feedback;

  return (
    <>
      <h2>{feedback}</h2>
      <p>{email}</p>
    </>
  );
}

export async function getStaticProps({ params }) {
  const filePath = getFilePath();
  const data = extractFileData(filePath);
  const feedback = data.find(({ id }) => id === params.id);

  return {
    props: {
      feedback,
    },
  };
}

export async function getStaticPaths() {
  const filePath = getFilePath();
  const data = extractFileData(filePath);
  const paths = data.map(({ id }) => ({
    params: {
      id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
